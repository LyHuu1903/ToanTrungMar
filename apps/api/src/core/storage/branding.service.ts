import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { prisma } from '@toantrung/database';
import {
  ImageCropConfigSchema,
  type AssetSlot,
  type BrandingAssetSlotDto,
  type CoverPosition,
  type DashboardBannerDto,
  type ImageCropConfig,
  type PublicBrandingDto,
  type UpdateBrandingMetaDto,
} from '@toantrung/contracts';
import { APP_CONFIG } from '../config';
import { recordAuditLog } from '../audit';
import { validateAndSanitizeImageBuffer } from './image-validator';

const DEFAULT_CROP: ImageCropConfig = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  frameScale: 1,
};

const DEFAULT_SETTINGS: Record<string, string> = {
  organizationName: 'Toàn Trung',
  workspaceName: 'Toàn Trung',
  loginHeadline: 'Đăng nhập',
  loginSubheadline: 'Chào mừng bạn quay trở lại hệ thống nội bộ Toàn Trung',
  footerText: '© 2026 Toàn Trung · Hệ thống quản lý nội bộ dành cho nhân sự công ty',
  logoAltText: 'Logo Công ty Toàn Trung',
  heroAltText: 'Không gian trưng bày giải pháp màn hình LED Toàn Trung',
  heroCoverPosition: 'center',
  heroCropJson: JSON.stringify(DEFAULT_CROP),
  bannerHeadline: 'Quản lý tập trung. Phối hợp hiệu quả.',
  bannerDescription:
    'Kết nối xuyên suốt hoạt động Kinh doanh, Marketing, Quảng cáo và Thiết kế trên một nền tảng thống nhất theo đúng ma trận phân quyền 8 vai trò BA.',
  bannerShowButton: 'true',
  bannerButtonLabel: 'Khám phá 5 phân hệ',
  bannerButtonHref: '/leads',
  bannerShowImage: 'true',
  bannerImageAlt: 'Phòng trưng bày giải pháp màn hình LED Toàn Trung',
};

function getBrandingDir(): string {
  const dir = path.join(APP_CONFIG.getStorageRoot(), 'branding');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getAvatarDir(): string {
  const dir = path.join(APP_CONFIG.getStorageRoot(), 'avatars');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function parseCropConfig(rawJson: string | null | undefined): ImageCropConfig {
  if (!rawJson) return { ...DEFAULT_CROP };
  try {
    const parsed = ImageCropConfigSchema.safeParse(JSON.parse(rawJson));
    if (parsed.success) return parsed.data;
  } catch {
    // Fallback
  }
  return { ...DEFAULT_CROP };
}

export async function getPublicBrandingConfig(): Promise<PublicBrandingDto> {
  const rows = await prisma.systemSetting.findMany();
  const map: Record<string, string> = { ...DEFAULT_SETTINGS };
  let bannerMetaUpdatedAt: string | null = null;
  for (const r of rows) {
    map[r.key] = r.value;
    if (r.key.startsWith('banner') && r.updatedAt) {
      const iso = r.updatedAt.toISOString();
      if (!bannerMetaUpdatedAt || iso > bannerMetaUpdatedAt) {
        bannerMetaUpdatedAt = iso;
      }
    }
  }

  const activeAssets = await prisma.brandingAsset.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    include: {
      uploadedBy: {
        select: { fullName: true },
      },
    },
  });

  const activeLogo = activeAssets.find((a) => a.slot === 'logo');
  const activeHero = activeAssets.find((a) => a.slot === 'login_hero');
  const activeBanner = activeAssets.find((a) => a.slot === 'dashboard_banner');

  const heroCrop = parseCropConfig(activeHero?.cropJson || map.heroCropJson);

  const logoDto: BrandingAssetSlotDto = activeLogo
    ? {
        slot: 'logo',
        url: `/api/v1/settings/branding/asset/${encodeURIComponent(activeLogo.objectKey)}`,
        isDefault: false,
        altText: activeLogo.altText || map.logoAltText,
        coverPosition: 'center',
        crop: { ...DEFAULT_CROP },
        mimeType: activeLogo.mimeType,
        fileSizeBytes: activeLogo.fileSizeBytes,
        width: activeLogo.width,
        height: activeLogo.height,
        updatedAt: activeLogo.createdAt.toISOString(),
        updatedByName: activeLogo.uploadedBy.fullName,
        recommendedSpec: 'PNG/WebP nền trong suốt · Tỷ lệ ~3.5:1 (khuyến nghị 420×120px, tối đa 2 MB)',
      }
    : {
        slot: 'logo',
        url: APP_CONFIG.defaultLogoUrl,
        isDefault: true,
        altText: map.logoAltText,
        coverPosition: 'center',
        crop: { ...DEFAULT_CROP },
        mimeType: 'image/png',
        fileSizeBytes: null,
        width: null,
        height: null,
        updatedAt: null,
        updatedByName: null,
        recommendedSpec: 'PNG/WebP nền trong suốt · Tỷ lệ ~3.5:1 (khuyến nghị 420×120px, tối đa 2 MB)',
      };

  const heroDto: BrandingAssetSlotDto = activeHero
    ? {
        slot: 'login_hero',
        url: `/api/v1/settings/branding/asset/${encodeURIComponent(activeHero.objectKey)}`,
        isDefault: false,
        altText: activeHero.altText || map.heroAltText,
        coverPosition: (activeHero.coverPosition || map.heroCoverPosition || 'center') as CoverPosition,
        crop: heroCrop,
        mimeType: activeHero.mimeType,
        fileSizeBytes: activeHero.fileSizeBytes,
        width: activeHero.width,
        height: activeHero.height,
        updatedAt: activeHero.createdAt.toISOString(),
        updatedByName: activeHero.uploadedBy.fullName,
        recommendedSpec: 'WebP/JPG/PNG thực tế công ty · Tỷ lệ 16:9 hoặc 16:10 (khuyến nghị 1200×750px, tối đa 5 MB)',
      }
    : {
        slot: 'login_hero',
        url: APP_CONFIG.defaultHeroUrl,
        isDefault: true,
        altText: map.heroAltText,
        coverPosition: (map.heroCoverPosition || 'center') as CoverPosition,
        crop: heroCrop,
        mimeType: 'image/webp',
        fileSizeBytes: null,
        width: null,
        height: null,
        updatedAt: null,
        updatedByName: null,
        recommendedSpec: 'WebP/JPG/PNG thực tế công ty · Tỷ lệ 16:9 hoặc 16:10 (khuyến nghị 1200×750px, tối đa 5 MB)',
      };

  const showBannerImage = map.bannerShowImage !== 'false';
  const bannerImageUrl = !showBannerImage
    ? null
    : activeBanner
      ? `/api/v1/settings/branding/asset/${encodeURIComponent(activeBanner.objectKey)}`
      : APP_CONFIG.defaultHeroUrl;

  const dashboardBanner: DashboardBannerDto = {
    headline: map.bannerHeadline ?? '',
    description: map.bannerDescription ?? '',
    showButton: map.bannerShowButton !== 'false',
    buttonLabel: map.bannerButtonLabel || 'Khám phá 5 phân hệ',
    buttonHref: map.bannerButtonHref || '/leads',
    showImage: showBannerImage,
    imageUrl: bannerImageUrl,
    imageAlt: activeBanner?.altText || map.bannerImageAlt || DEFAULT_SETTINGS.bannerImageAlt,
    isDefaultImage: !activeBanner,
    updatedAt: activeBanner ? activeBanner.createdAt.toISOString() : bannerMetaUpdatedAt,
    updatedByName: activeBanner ? activeBanner.uploadedBy.fullName : null,
  };

  return {
    organizationName: map.organizationName,
    workspaceName: map.workspaceName,
    loginHeadline: map.loginHeadline,
    loginSubheadline: map.loginSubheadline,
    footerText: map.footerText,
    logo: logoDto,
    loginHero: heroDto,
    dashboardBanner,
  };
}

export async function updateBrandingMetadata(
  actorUserId: number,
  input: UpdateBrandingMetaDto,
  ipAddress?: string,
): Promise<PublicBrandingDto> {
  const kvPairs: Array<[string, string]> = [];

  const stringFields: Array<keyof UpdateBrandingMetaDto> = [
    'organizationName',
    'workspaceName',
    'loginHeadline',
    'loginSubheadline',
    'footerText',
    'logoAltText',
    'heroAltText',
    'heroCoverPosition',
    'bannerHeadline',
    'bannerDescription',
    'bannerButtonLabel',
    'bannerButtonHref',
    'bannerImageAlt',
  ];

  for (const field of stringFields) {
    const val = input[field];
    if (typeof val === 'string') {
      kvPairs.push([field, val]);
    }
  }

  if (typeof input.bannerShowButton === 'boolean') {
    kvPairs.push(['bannerShowButton', String(input.bannerShowButton)]);
  }

  if (typeof input.bannerShowImage === 'boolean') {
    kvPairs.push(['bannerShowImage', String(input.bannerShowImage)]);
  }

  const serializedCrop = input.heroCrop ? JSON.stringify(input.heroCrop) : undefined;
  if (serializedCrop) {
    kvPairs.push(['heroCropJson', serializedCrop]);
  }

  await prisma.$transaction(async (tx) => {
    for (const [key, value] of kvPairs) {
      await tx.systemSetting.upsert({
        where: { key },
        update: { value, updatedById: actorUserId },
        create: { key, value, updatedById: actorUserId },
      });
    }

    if (input.logoAltText) {
      await tx.brandingAsset.updateMany({
        where: { slot: 'logo', isActive: true },
        data: { altText: input.logoAltText },
      });
    }

    if (input.heroAltText || input.heroCoverPosition || serializedCrop) {
      await tx.brandingAsset.updateMany({
        where: { slot: 'login_hero', isActive: true },
        data: {
          ...(input.heroAltText ? { altText: input.heroAltText } : {}),
          ...(input.heroCoverPosition ? { coverPosition: input.heroCoverPosition } : {}),
          ...(serializedCrop ? { cropJson: serializedCrop } : {}),
        },
      });
    }

    if (input.bannerImageAlt) {
      await tx.brandingAsset.updateMany({
        where: { slot: 'dashboard_banner', isActive: true },
        data: { altText: input.bannerImageAlt },
      });
    }
  });

  await recordAuditLog({
    actorUserId,
    action: 'BRANDING_METADATA_UPDATED',
    targetType: 'system_settings',
    targetId: 'branding',
    details: input as Record<string, unknown>,
    ipAddress,
  });

  return getPublicBrandingConfig();
}

export async function uploadBrandingAsset(input: {
  actorUserId: number;
  slot: AssetSlot;
  fileBuffer: Buffer;
  declaredMimeType: string;
  altText?: string;
  coverPosition?: CoverPosition;
  crop?: ImageCropConfig;
  ipAddress?: string;
}): Promise<PublicBrandingDto> {
  const maxBytes =
    input.slot === 'logo' ? APP_CONFIG.maxLogoSizeBytes : APP_CONFIG.maxHeroSizeBytes;

  const validated = validateAndSanitizeImageBuffer(
    input.fileBuffer,
    input.declaredMimeType,
    maxBytes,
  );

  const randomId = crypto.randomUUID();
  const objectKey = `${input.slot}-${randomId}-${validated.sha256.slice(0, 12)}.${validated.extension}`;
  const fullPath = path.join(getBrandingDir(), objectKey);

  fs.writeFileSync(fullPath, validated.sanitizedBuffer, { flag: 'wx' });

  const defaultAlt =
    input.slot === 'logo'
      ? DEFAULT_SETTINGS.logoAltText
      : input.slot === 'dashboard_banner'
        ? DEFAULT_SETTINGS.bannerImageAlt
        : DEFAULT_SETTINGS.heroAltText;

  const cropJson = input.crop ? JSON.stringify(input.crop) : null;

  await prisma.$transaction(async (tx) => {
    await tx.brandingAsset.updateMany({
      where: { slot: input.slot, isActive: true },
      data: { isActive: false },
    });

    await tx.brandingAsset.create({
      data: {
        slot: input.slot,
        objectKey,
        mimeType: validated.mimeType,
        fileSizeBytes: validated.sanitizedBuffer.length,
        width: validated.width,
        height: validated.height,
        sha256: validated.sha256,
        altText: input.altText?.trim() || defaultAlt,
        coverPosition: input.coverPosition || 'center',
        cropJson,
        isActive: true,
        uploadedById: input.actorUserId,
      },
    });

    if (input.slot === 'login_hero' && cropJson) {
      await tx.systemSetting.upsert({
        where: { key: 'heroCropJson' },
        update: { value: cropJson, updatedById: input.actorUserId },
        create: { key: 'heroCropJson', value: cropJson, updatedById: input.actorUserId },
      });
    }

    if (input.slot === 'dashboard_banner') {
      await tx.systemSetting.upsert({
        where: { key: 'bannerShowImage' },
        update: { value: 'true', updatedById: input.actorUserId },
        create: { key: 'bannerShowImage', value: 'true', updatedById: input.actorUserId },
      });
    }
  });

  await recordAuditLog({
    actorUserId: input.actorUserId,
    action: 'BRANDING_ASSET_UPLOADED',
    targetType: 'branding_asset',
    targetId: objectKey,
    details: {
      slot: input.slot,
      mimeType: validated.mimeType,
      bytes: validated.sanitizedBuffer.length,
      width: validated.width,
      height: validated.height,
      crop: input.crop,
    },
    ipAddress: input.ipAddress,
  });

  return getPublicBrandingConfig();
}

export async function resetBrandingAssetToDefault(
  actorUserId: number,
  slot: AssetSlot,
  ipAddress?: string,
): Promise<PublicBrandingDto> {
  await prisma.$transaction(async (tx) => {
    await tx.brandingAsset.updateMany({
      where: { slot, isActive: true },
      data: { isActive: false },
    });

    if (slot === 'login_hero') {
      await tx.systemSetting.upsert({
        where: { key: 'heroCropJson' },
        update: { value: JSON.stringify(DEFAULT_CROP), updatedById: actorUserId },
        create: { key: 'heroCropJson', value: JSON.stringify(DEFAULT_CROP), updatedById: actorUserId },
      });
    }
  });

  await recordAuditLog({
    actorUserId,
    action: 'BRANDING_ASSET_RESET_DEFAULT',
    targetType: 'branding_asset',
    targetId: slot,
    ipAddress,
  });

  return getPublicBrandingConfig();
}

export async function readBrandingAssetBinary(objectKey: string): Promise<{
  buffer: Buffer;
  mimeType: string;
} | null> {
  if (/^avatar-\d+-[a-f0-9-]+-[a-f0-9]{12}\.(png|jpg|webp)$/.test(objectKey)) {
    const fullPath = path.join(getAvatarDir(), objectKey);
    if (!fs.existsSync(fullPath)) return null;
    const ext = path.extname(objectKey).toLowerCase();
    const mimeType =
      ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    return {
      buffer: fs.readFileSync(fullPath),
      mimeType,
    };
  }

  if (
    !/^(logo|login_hero|dashboard_banner)-[a-f0-9-]+-[a-f0-9]{12}\.(png|jpg|webp)$/.test(
      objectKey,
    )
  ) {
    return null;
  }

  const record = await prisma.brandingAsset.findUnique({
    where: { objectKey },
  });
  if (!record) return null;

  const fullPath = path.join(getBrandingDir(), objectKey);
  if (!fs.existsSync(fullPath)) return null;

  return {
    buffer: fs.readFileSync(fullPath),
    mimeType: record.mimeType,
  };
}
