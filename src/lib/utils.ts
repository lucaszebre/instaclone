import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}


export function generateUniqueUsername(name:string) {
  // Remove spaces from the name
  const trimmedName = name.replace(/\s+/g, '');
  
  // Generate a random number between 100000 and 999999
  const randomNum = Math.floor(Math.random() * 900000) + 100000;
  
  // Combine the trimmed name and random number
  return `${trimmedName}${randomNum}`;
}