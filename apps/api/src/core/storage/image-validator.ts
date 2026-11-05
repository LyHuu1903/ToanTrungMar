import crypto from 'node:crypto';

export interface ValidatedImageResult {
  mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
  extension: 'png' | 'jpg' | 'webp';
  width: number;
  height: number;
  sanitizedBuffer: Buffer;
  sha256: string;
}

export class ImageValidationError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const ALLOWED_MIMES = new Set(['image/png', 'image/jpeg', 'image/webp']);

export function validateAndSanitizeImageBuffer(
  buffer: Buffer,
  declaredMime: string,
  maxBytes: number,
): ValidatedImageResult {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new ImageValidationError('EMPTY_FILE', 'Tệp tải lên rỗng hoặc không hợp lệ.');
  }

  if (buffer.length > maxBytes) {
    const maxMb = (maxBytes / (1024 * 1024)).toFixed(1);
    throw new ImageValidationError(
      'FILE_TOO_LARGE',
      `Dung lượng tệp vượt quá giới hạn cho phép (${maxMb} MB).`,
    );
  }

  // Explicitly block SVG, XML, HTML or script content even if disguised
  const headText = buffer.subarray(0, Math.min(buffer.length, 512)).toString('utf8').toLowerCase();
  if (
    declaredMime.toLowerCase().includes('svg') ||
    headText.includes('<svg') ||
    headText.includes('<?xml') ||
    headText.includes('<!doctype html') ||
    headText.includes('<html') ||
    headText.includes('<script')
  ) {
    throw new ImageValidationError(
      'ACTIVE_CONTENT_BLOCKED',
      'Định dạng SVG hoặc nội dung chứa mã thực thi bị chặn vì lý do bảo mật. Chỉ chấp nhận PNG, JPG, WebP.',
    );
  }

  const normalizedMime = declaredMime.toLowerCase() === 'image/jpg' ? 'image/jpeg' : declaredMime.toLowerCase();
  if (!ALLOWED_MIMES.has(normalizedMime)) {
    throw new ImageValidationError(
      'UNSUPPORTED_MIME',
      'Định dạng tệp không được hỗ trợ. Vui lòng chọn ảnh PNG, JPG hoặc WebP.',
    );
  }

  let parsed: {
    mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
    extension: 'png' | 'jpg' | 'webp';
    width: number;
    height: number;
    sanitizedBuffer: Buffer;
  } | null = null;

  if (isPng(buffer)) {
    parsed = parseAndSanitizePng(buffer);
  } else if (isJpeg(buffer)) {
    parsed = parseAndSanitizeJpeg(buffer);
  } else if (isWebp(buffer)) {
    parsed = parseAndSanitizeWebp(buffer);
  }

  if (!parsed) {
    throw new ImageValidationError(
      'CORRUPTED_IMAGE_BYTES',
      'Nội dung tệp không khớp cấu trúc ảnh nhị phân hợp lệ (PNG/JPG/WebP).',
    );
  }

  if (parsed.mimeType !== normalizedMime) {
    throw new ImageValidationError(
      'MIME_MISMATCH',
      `Kiểu tệp khai báo (${normalizedMime}) không khớp với dữ liệu thực tế (${parsed.mimeType}).`,
    );
  }

  if (parsed.width < 16 || parsed.height < 16 || parsed.width > 6000 || parsed.height > 6000) {
    throw new ImageValidationError(
      'INVALID_DIMENSIONS',
      `Kích thước ảnh (${parsed.width}x${parsed.height}px) nằm ngoài giới hạn hợp lệ (16px – 6000px).`,
    );
  }

  const sha256 = crypto.createHash('sha256').update(parsed.sanitizedBuffer).digest('hex');

  return {
    ...parsed,
    sha256,
  };
}

function isPng(buf: Buffer): boolean {
  return (
    buf.length >= 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  );
}

function parseAndSanitizePng(buf: Buffer) {
  const ihdrType = buf.subarray(12, 16).toString('ascii');
  if (ihdrType !== 'IHDR') {
    throw new ImageValidationError('INVALID_PNG', 'Thiếu khối IHDR chuẩn của ảnh PNG.');
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);

  // Walk chunks to verify structure and strip any trailing bytes after IEND
  let offset = 8;
  let iendEnd = -1;
  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString('ascii');
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > buf.length) break;
    offset = chunkEnd;
    if (type === 'IEND') {
      iendEnd = chunkEnd;
      break;
    }
  }

  if (iendEnd === -1) {
    throw new ImageValidationError('INVALID_PNG_END', 'Tệp PNG không có khối kết thúc IEND hợp lệ.');
  }

  return {
    mimeType: 'image/png' as const,
    extension: 'png' as const,
    width,
    height,
    sanitizedBuffer: Buffer.from(buf.subarray(0, iendEnd)),
  };
}

function isJpeg(buf: Buffer): boolean {
  return buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function parseAndSanitizeJpeg(buf: Buffer) {
  let offset = 2;
  let width = 0;
  let height = 0;

  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    if (marker === 0xd9) {
      break;
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      offset += 2;
      continue;
    }
    if (offset + 4 > buf.length) break;
    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2 || offset + 2 + segmentLength > buf.length) break;

    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      if (offset + 9 <= buf.length) {
        height = buf.readUInt16BE(offset + 5);
        width = buf.readUInt16BE(offset + 7);
        break;
      }
    }
    offset += 2 + segmentLength;
  }

  if (!width || !height) {
    throw new ImageValidationError('INVALID_JPEG', 'Không đọc được kích thước khung hình từ ảnh JPEG.');
  }

  return {
    mimeType: 'image/jpeg' as const,
    extension: 'jpg' as const,
    width,
    height,
    sanitizedBuffer: Buffer.from(buf),
  };
}

function isWebp(buf: Buffer): boolean {
  return (
    buf.length >= 30 &&
    buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buf.subarray(8, 12).toString('ascii') === 'WEBP'
  );
}

function parseAndSanitizeWebp(buf: Buffer) {
  const riffSize = buf.readUInt32LE(4);
  const expectedTotal = Math.min(buf.length, riffSize + 8);
  const chunkHeader = buf.subarray(12, 16).toString('ascii');
  let width = 0;
  let height = 0;

  if (chunkHeader === 'VP8X' && buf.length >= 30) {
    width = 1 + buf.readUIntLE(24, 3);
    height = 1 + buf.readUIntLE(27, 3);
  } else if (chunkHeader === 'VP8 ' && buf.length >= 30) {
    width = buf.readUInt16LE(26) & 0x3fff;
    height = buf.readUInt16LE(28) & 0x3fff;
  } else if (chunkHeader === 'VP8L' && buf.length >= 25) {
    const b0 = buf[21];
    const b1 = buf[22];
    const b2 = buf[23];
    const b3 = buf[24];
    width = 1 + (((b1 & 0x3f) << 8) | b0);
    height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
  }

  if (!width || !height) {
    throw new ImageValidationError('INVALID_WEBP', 'Không đọc được thông số kích thước từ ảnh WebP.');
  }

  return {
    mimeType: 'image/webp' as const,
    extension: 'webp' as const,
    width,
    height,
    sanitizedBuffer: Buffer.from(buf.subarray(0, expectedTotal)),
  };
}

