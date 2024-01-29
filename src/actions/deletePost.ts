'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { utapi } from '@/lib/utapi';

export async function DeletePost( fileKey: string,id:string) {
    try {
        // Retrieve the cookies
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

        // Get the session
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        // Delete the file using UTApi
        await utapi.deleteFiles(fileKey);

        // Update the user's avatar to null or an empty string
        await prisma.post.delete({where:{
            id
        },
    include:{
        likes:true,
        comments:true,
        
    }})

        return 'Post successfully deleted';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}