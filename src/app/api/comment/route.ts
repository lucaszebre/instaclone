export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from '@/types';
import { timeSince } from '@/lib/time';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { randomUUID } from 'crypto';


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

        if (!currentUserId) {
          return new Response("User is not authenticated", { status: 406 })

      }

            const CommentSchema = z.object({
              commentedAt: z.date(), // Assuming it's always a string representation of a date
              content: z.string(),
              id: z.string(),
              postId: z.string(),
              repliedToCommentId: z.string().nullable(),
              user: z.object({
                id: z.string(),
                email: z.string(),
                avatarkey: z.string(),
                bio: z.string(),
                fullName: z.string().nullable(),
                gender: z.string().nullable(),
                isEmailVerified: z.boolean(),
                isPrivate: z.boolean(),
                joinedAt: z.string(),
                profilePictureUrl: z.string(),
                savePost: z.array(z.string()),
                savePostId: z.string().nullable(),
                userBLockme: z.array(z.string()),
                userBlock: z.array(z.string()),
                username: z.string(),
              }),
              userId: z.string(),
            });

            const idcomment=randomUUID()


            const commentData =  {
              postId,
              userId:currentUserId,
              content,
              repliedToCommentId:null,
              user,
              commentedAt:new Date(),
              id:idcomment,
              

            }

            const comment = CommentSchema.parse(commentData)


            await pusherServer.trigger(toPusherKey(`post:${postId}`), 'incoming-comment-post', comment)


        

      


        const newComment = await prisma.comment.create({
          data:{
            id:idcomment,
            postId,
            userId:currentUserId,
            content:content
          }
        });



        return new Response('Sucessfully post a comment', { status: 200 })

    } catch (error) {
      console.error(error)
        return new Response('Server error', { status: 500 })

    }


}


export async function DELETE(req:Request){
    try {
          
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            throw new Error("You need to be auth");        }

        const url = new URL(req.url)
            const id = url.searchParams.get('id');
            if (!id) {
                throw new Error("Need the id ");
            }
             const postId = url.searchParams.get('postid');
            if (!postId) {
                throw new Error("Need the id ");
            }
      
      


        await prisma.comment.delete({
          where:{
            id:id
          }
        });

        await pusherServer.trigger(toPusherKey(`post:${postId}`), 'deleted-comment-post',id);




        return new Response('Sucessfully Delete the comment', { status: 200 })

    } catch (error) {
      console.error(error)
        return new Response('Server error', { status: 500 })

    }


}
