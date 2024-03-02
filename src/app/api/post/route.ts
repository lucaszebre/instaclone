export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { Database } from "@/lib/database.type";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { utapi } from "@/lib/utapi";
import { toPusherKey } from "@/lib/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Payload = {
    url: string;
    filekey:string;
    filter:string
    bio:string
  }


export async function POST(req:Request){
    try {
        const body: Payload = await req.json();
  
        // This doesn't work
        const { url,filekey,filter,bio } = body;
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        if(!data.data.session?.user.id){
            return new Response('Unthaurized', { status: 400 })

        }

        const newPost = await prisma.post.create({
            data: {
                imageUrl: url,
                filekey,
                user: { connect: { id: data.data.session?.user.id} },
                filter,
                bio
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


type Payload2 = {
    id: string;
    filekey:string
  }

export async function DELETE(req:Request){
    try {
        const body: Payload2 = await req.json();
  
        // This doesn't work
        const { id,filekey } = body;
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        if(!data.data.session?.user.id){
            return new Response('Unthaurized', { status: 400 })

        }

        // Delete the post 
        await prisma.post.delete({where:{
            id
        },
    include:{
        likes:true,
        comments:true,
        
    }})

       // Delete the file using UTApi
       await utapi.deleteFiles(filekey);
      

        


        return new Response('Sucessfully delete a post', { status: 200 })
    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
}