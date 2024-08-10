


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.type';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from '@/types';
import { timeSince } from '@/lib/time';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { randomUUID } from 'crypto';
import { auth } from '@/auth';


type Payload = {
    postId: string;
    content:string
    user:User
  }


  export const POST = auth(async (req) => {

    console.log(req.auth,"session")
  
    let userId=req.auth?.user.id;
    console.log(userId,"userID")
    try {
        if (userId) {
    
          const body: Payload = await req.json();
  
          // This doesn't work
          const { postId,content,user} = body;
          
    
  
  
  
              const CommentSchema = z.object({
                commentedAt: z.date(), // Assuming it's always a string representation of a date
                content: z.string(),
                id: z.string(),
                postId: z.string(),
                repliedToCommentId: z.string().nullable(),
                user: z.object({
                  id: z.string(),
                  email: z.string(),
                  avatarkey: z.string().optional(),
                  bio: z.string().optional(),
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
                userId,
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
              userId,
              content:content
            }
          });
  
  
  
          return new Response('Sucessfully post a comment', { status: 200 })
        
         
          }
        
          return Response.json({ message: "Not authenticated" }, { status: 401 })
        
    } catch (error) {
        console.log(error)
        return new Response('Server error', { status: 500 })

    }

 
}) as any  


export const DELETE = auth(async (req) => {

  
    let userId=req.auth?.user.id;

    try {
        if (userId) {
    
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
        
         
          }
        
          return Response.json({ message: "Not authenticated" }, { status: 401 })
        
    } catch (error) {
        
        return new Response('Server error', { status: 500 })

    }

 
}) as any 





