import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
export async function GET(req: Request) {
    try {
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
        const User = await prisma.user.findFirst({
            where:{id:data.data.session?.user.id}
        });
        return new Response(
            JSON.stringify({
                User
            }))
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })
        }
    }

  
}