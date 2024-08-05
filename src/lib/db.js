import { PrismaClient } from '@prisma/client'
import {Redis} from '@upstash/redis'
const prisma = new PrismaClient()



export const db = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_KEY,
})

const data = await db.set('foo', 'bar');

export default prisma