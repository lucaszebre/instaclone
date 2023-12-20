import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


type Payload = {
    postId: string;
    content:string
  }


export async function POST(req:Request){
    try {
        const body: Payload = await req.json();
  
        // This doesn't work
        const { postId,content} = body;
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            throw new Error("You need to be auth");        }

        const newComment = await prisma.comment.create({
          data:{
            postId,
            userId:currentUserId,
            content:content
          }
        });

        return new Response('Sucessfully post a comment', { status: 200 })

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }


}
