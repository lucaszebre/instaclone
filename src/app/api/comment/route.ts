import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from '@/types';


type Payload = {
    postId: string;
    content:string
    user:User
  }


export async function POST(req:Request){
    try {
        const body: Payload = await req.json();
  
        // This doesn't work
        const { postId,content,user} = body;
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            throw new Error("You need to be auth");        }

            await pusherServer.trigger(toPusherKey(`post:${postId}`), 'incoming-comment-post', {
              postId,
              userId:currentUserId,
              content:content,
              repliedToCommentId:null,
              user,
              

            })

      


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
