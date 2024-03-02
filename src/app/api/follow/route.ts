export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


export async function POST(req: Request) {
    try {
        
        const cookieStore = cookies()
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        const data = await supabase.auth.getSession()
        let userId=data.data.session?.user.id
        if(!userId){
            return new Response('Unauthorized', { status: 401 })
        }

        const url = new URL(req.url)
        
        const usertosub = url.searchParams.get('p')

        if (!usertosub) return new Response('Invalid query', { status: 400 })
    
        const alreadyfollower = await prisma.followerList.findFirst({
            where:{
                userId:usertosub,
                followerId:userId 
            }
        })

        if(alreadyfollower){
            return new Response('user already following', { status: 400 })
        }
        // Transaction to ensure both operations (follow and following) are successful
        const transaction = await prisma.$transaction([
            prisma.followerList.create({
                data: {
                    userId: usertosub,   // The user being followed
                    followerId: userId,  // The current user (follower)
                }
            }),
            prisma.followingList.create({
                data: {
                    userId: userId,      // The current user
                    followingId: usertosub, // The user they are following
                }
            })
        ]);




        
        return new Response('Follow work', { status: 200 })

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}


export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)
        
        const userId  = url.searchParams.get('p') || ""

        if(userId){
            return new Response('Need a id', { status: 401 })
        }
        const user = await prisma.user.findFirst(({
            where:{
                id:userId
            },
            select:{
                following:true,
                followers:true
            }
        }))

        return new Response(JSON.stringify(user))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}



export async function DELETE(req: Request) {
    try {
        
        const cookieStore = cookies()
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        const data = await supabase.auth.getSession()
        let userId=data.data.session?.user.id
        if(!userId){
            return new Response('Unauthorized', { status: 401 })
        }

        const url = new URL(req.url)
        
        const usertosub = url.searchParams.get('p')

        if (!usertosub) return new Response('Invalid query', { status: 400 })
    
        // Transaction to ensure both operations (follow and following) are successful
        const transaction = await prisma.$transaction([
            prisma.followerList.deleteMany({
                where: {
                    userId: usertosub,   // The user being followed
                    followerId: userId,  // The current user (follower)
                }
            }),
            prisma.followingList.deleteMany({
                where: {
                    userId: userId,      // The current user
                    followingId: usertosub, // The user they are following
                }
            })
        ]);

        return new Response('unFollow worked', { status: 200 })

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}