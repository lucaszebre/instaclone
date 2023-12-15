'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';

export async function postComment(Postid: string,content:string) {
    try {
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            throw new Error("You need to be auth");        }

        const newComment = await prisma.comment.create({
          data:{
            postId:Postid,
            userId:currentUserId,
            content:content
          }
        });

        return 'A comment has been add sucessfully!';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}