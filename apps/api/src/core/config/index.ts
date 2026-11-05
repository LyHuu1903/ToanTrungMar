import path from 'node:path';

export const APP_CONFIG = {
  sessionCookieName: 'tt_v2_session',
  csrfHeaderName: 'x-csrf-token',
  sessionTtlMs: 1000 * 60 * 60 * 12, // 12 hours
  maxLogoSizeBytes: 2 * 1024 * 1024, // 2 MB
  maxHeroSizeBytes: 5 * 1024 * 1024, // 5 MB
  defaultLogoUrl: '/brand/logo-toan-trung.png',
  defaultHeroUrl: '/brand/showroom-toan-trung.webp',
  getStorageRoot(): string {
    const raw = process.env.STORAGE_ROOT || './storage';
    if (path.isAbsolute(raw)) return raw;
    // Resolve relative to monorepo root
    const cwd = process.cwd();
    const repoRoot = cwd.endsWith(path.join('apps', 'web')) || cwd.endsWith(path.join('apps', 'api'))
      ? path.resolve(cwd, '../..')
      : cwd;
    return path.resolve(repoRoot, raw);
  },
};

