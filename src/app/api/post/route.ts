import { Database } from "@/lib/database.type";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Payload = {
    url: string;
  }


export async function POST(req:Request){
    try {
        const body: Payload = await req.json();
  
        // This doesn't work
        const { url } = body;
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()


        const newPost = await prisma.post.create({
            data: {
                imageUrl: url,
                user: { connect: { id: data.data.session?.user.id} },
            },
        });

        await pusherServer.trigger(toPusherKey(`feed`), 'incoming-post', {
            feed:1
        })

        


        return new Response('Sucessfully post a post', { status: 200 })
    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
}