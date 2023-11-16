'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';

export async function GetCurrentUser() {
    try {
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
        const User = await prisma.user.findFirst({
            where:{id:data.data.session?.user.id},
            include:{
                followers:true,
                following:true
            }
        });

        return User;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

