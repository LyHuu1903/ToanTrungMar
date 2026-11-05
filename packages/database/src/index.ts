import path from 'node:path';
import { PrismaClient } from '@prisma/client';

if (
  process.env.NODE_ENV !== 'production' &&
  (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'file:./dev.db')
) {
  const defaultSqlitePath = path
    .resolve(process.cwd(), '..', '..', 'packages', 'database', 'prisma', 'dev.db')
    .replace(/\\/g, '/');
  process.env.DATABASE_URL = `file:${defaultSqlitePath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export * from '@prisma/client';
