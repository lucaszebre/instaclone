import { PrismaClient } from '@prisma/client'
import { Redis } from '@upstash/redis'

const prisma = new PrismaClient()

// Upstash REST client. Fall back to empty strings so that importing this
// module (which Next does at build time while collecting page data) does not
// throw when REDIS_URL / REDIS_KEY are not set; calls still fail at runtime
// with a clear error until the variables are provided.
export const db = new Redis({
  url: process.env.REDIS_URL ?? '',
  token: process.env.REDIS_KEY ?? '',
})

export default prisma
