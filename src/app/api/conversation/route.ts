import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


export async function GET(req:Request){
    try {
    
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()

        const currentUserId = data.data.session?.user.id;

        if(!currentUserId){
            throw new Error("You need to be auth");        }

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
            }
        })



        return new Response(JSON.stringify(listConv),{status:200}) 

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }


}
