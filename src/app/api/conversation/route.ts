export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma, { db } from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


export async function GET(req:Request){
    try {
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if (!currentUserId) {
            return new Response("User is not authenticated", { status: 406 })

        }

        
        const url = new URL(req.url)
        
        const id  = url.searchParams.get('id') 


        if(id){
            const Conv = await prisma.conversation.findFirst({
            where:{
               id
            },
            include:{
                recipient:true,
                initiator:true,
                message:true
            }
        })



        return new Response(JSON.stringify(Conv),{status:200}) 
        }

        

        const listConv = await prisma.conversation.findMany({
            where:{
                OR: [
                    {
                        initiatorId:currentUserId
                    },
                    { recipientId:currentUserId },
                    ],
            },
            include:{
                recipient:true,
                initiator:true,
                message:true,
            }
        })



        return new Response(JSON.stringify(listConv),{status:200}) 

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }


}


export async function POST(req:Request){
    try {

        // const del = await prisma.conversation.deleteMany();

        const url = new URL(req.url)
        
        const id  = url.searchParams.get('id') 

        if(!id){
            return new Response("The id is not", { status: 400 })
        }



        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            return new Response("Unthaurized", { status: 400 })       }

            if(id==currentUserId){
                return new Response("Unthaurized", { status: 400 })       

            }
        
        const conv = await prisma.conversation.findFirst({
            where:{
                OR: [
                    {  
                        initiatorId:currentUserId,
                        recipientId:id
                    },
                    { recipientId:currentUserId,
                        initiatorId:id
                    },
                    ],
            }
        })



        if(conv){
            return new Response(`Conversation already create ${id} and ${currentUserId} `,{status:202}) 
        }
        
        

        await prisma.conversation.create({
                data: {
                    initiatorId:id,
                    recipientId: currentUserId,
                    redisKey:""
                },
            })

            
                await   db.sadd(`user:${currentUserId}:friends`, id)
                await   db.sadd(`user:${id}:friends`, currentUserId)
        

        return new Response(`Conversation  create ${id} and ${currentUserId} `,{status:200}) 

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }


}
