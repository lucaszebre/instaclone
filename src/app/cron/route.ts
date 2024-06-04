export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true 
export const runtime = 'nodejs'

import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
import { SchemaRegister } from '@/lib/validator/register';


export async function POST(req: Request,res: Response) {
    
    try {
        const result = await prisma.user.updateMany({
          where: {
           
            isEmailVerified: false,
          },
          data: {
            isEmailVerified: true, 
          },
        });
         const result2 = await prisma.user.updateMany({
          where: {
           
            isEmailVerified: true,
          },
          data: {
            isEmailVerified: false, 
          },
        });
        
        return new Response("Sucessfully update the bot", { status: 200})

      } catch (error) {

        return new Response("Failed to update the bot", { status: 400 })

      }

  
}
