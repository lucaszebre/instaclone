import { fetchRedis } from '@/lib/utils'
import { Database } from '@/lib/database.type'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { Usered } from '@/lib/validator/currentUser'
import { Message, messageValidator } from '@/lib/validator/message'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json()
    const cookieStore = cookies()

    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
    
    const data = await supabase.auth.getSession()

    const currentUserId = data.data.session?.user.id;
    if (!currentUserId) return new Response('Unauthorized', { status: 401 })

    const [userId1, userId2] = chatId.split('--')

    if (currentUserId !== userId1 && currentUserId !== userId2) {
      console.error("hanhan");
      return new Response('Unauthorized', { status: 401 })
    }

    const friendId = currentUserId === userId1 ? userId2 : userId1

 

    const rawSender = (await fetchRedis(
      'get',
      `user:${currentUserId}`
    )) as string

    console.error("step1");


    const sender = JSON.parse(rawSender) as Usered

    const timestamp = Date.now()

    const messageData: Message = {
      id: nanoid(),
      senderId: currentUserId,
      text,
      timestamp,
    }

    const message = messageValidator.parse(messageData)

    // notify all connected chat room clients
    await pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', message)
    console.error("step2");

    await pusherServer.trigger(toPusherKey(`user:${friendId}:chats`), 'new_message', {
      ...message,
      senderImg: sender.profilePictureUrl,
      senderName: sender.username
    })
    console.error("step3");

    // all valid, send the message
    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    })
    console.error("step4");

    return new Response('OK')
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response('Internal Server Error', { status: 500 })
  }
}