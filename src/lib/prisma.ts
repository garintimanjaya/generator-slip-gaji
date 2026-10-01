import * as PrismaClientModule from '@prisma/client';

type PrismaClient = any;
const PrismaClient = (PrismaClientModule as any).PrismaClient;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;