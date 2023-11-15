'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';

export async function NewPost(url: string) {
    try {
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
        const newPost = await prisma.post.create({
            data: {
                imageUrl: url,
                user: { connect: { id: data.data.session?.user.id} },
            },
        });

        return 'Registration successful';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}