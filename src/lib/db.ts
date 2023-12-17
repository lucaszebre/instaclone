import { PrismaClient } from '@prisma/client'
import {Redis} from '@upstash/redis'
const prisma = new PrismaClient()

export const db = new Redis({
    url: 'https://eu2-subtle-ram-32443.upstash.io',
    token: 'AX67ACQgOWFlMjc2MDYtZjE1NC00MmY2LThhNDEtMWNhNGQwM2VjZDFlOGE1NzMyMWJiMjQwNDQwNDg5ZTMyYjlhODIxYzZkNGQ=',
  })

export default prisma