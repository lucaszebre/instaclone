import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const upstashRedisRestUrl = "https://eu2-subtle-ram-32443.upstash.io"
const authToken = "AX67ACQgOWFlMjc2MDYtZjE1NC00MmY2LThhNDEtMWNhNGQwM2VjZDFlOGE1NzMyMWJiMjQwNDQwNDg5ZTMyYjlhODIxYzZkNGQ="

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}


export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}