import { PrismaClient } from '@prisma/client'

declare global {
  var __globalPrisma: PrismaClient | undefined
}

export const prisma = globalThis.__globalPrisma ?? new PrismaClient({
  log: ['query'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.__globalPrisma = prisma
} 