export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from '@/auth';
import { Database } from '@/lib/database.type'
import prisma, { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { Usered } from '@/lib/validator/currentUser'
import { Message, messageValidator } from '@/lib/validator/message'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'



export const POST = auth(async (req) => {

  
  let currentUserId=req.auth?.user.id;

  try {
      if (currentUserId) {
  
        const { text, chatId,convId }: { text: string; chatId: string,convId:string } = await req.json()
      
    
 
    
        const [userId1, userId2] = chatId.split('--')
    
        if (currentUserId !== userId1 && currentUserId !== userId2) {
          console.error("hanhan");
          return new Response('Unauthorized', { status: 401 })
        }
    
        const friendId = currentUserId === userId1 ? userId2 : userId1
    
     
       
        // const rawSender = (await fetchRedis(
        //   'get',
        //   `user:${currentUserId}`
        // )) as string
    
        // console.error("step1");
    
    
        // const sender = JSON.parse(rawSender) as Usered
    
        const timestamp = Date.now()
    
        const messageData: Message = {
          id: nanoid(),
          senderId: currentUserId,
          text,
          timestamp,
        }
    
        const timeString = new Date().toISOString();
    
        const newPost = await prisma.message.create({
          data: {
              id:nanoid(),
              senderId:currentUserId,
              text,
              timestamp:timeString,
              conversationId:convId
          },
      });
    
        const message = messageValidator.parse(messageData)
    
        
        // notify all connected chat room clients
        await pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', message)
        console.error("step2");
    
        // await pusherServer.trigger(toPusherKey(`user:${friendId}:chats`), 'new_message', {
        //   ...message,
        //   senderImg: sender.profilePictureUrl,
        //   senderName: sender.username
        // })
        console.error("step3");
    
        // all valid, send the message
        // await db.zadd(`chat:${chatId}:messages`, {
        //   score: timestamp,
        //   member: JSON.stringify(message),
        // })
        console.error("step4");
    
        return new Response('OK')
        }
      
        return Response.json({ message: "Not authenticated" }, { status: 401 })
      
  } catch (error) {
      
      return new Response('Server error', { status: 500 })

  }


}) as any 



