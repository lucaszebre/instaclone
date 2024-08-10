export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.type';
import { auth } from '@/auth';

export const POST = auth(async (req) => {

  
    let userId=req.auth?.user.id;

  if (userId) {
    
    const url = new URL(req.url)
        
    const usertoblock = url.searchParams.get('p')

    if (!usertoblock) return new Response('Invalid query', { status: 400 })

   
    const transaction = await prisma.$transaction([
        prisma.user.update({
            where:{
                id:userId
            },
            data: {
                userBlock:[usertoblock]
            }
        }),
        prisma.user.update({
            where:{
                id:usertoblock
            },
            data:{
                userBLockme:[userId]
            }
        })
    ]);
    
    return new Response('Block work', { status: 200 })
 
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any

export const DELETE = auth(async (req) => {

  
    let userId=req.auth?.user.id;

    try {
        if (userId) {
    
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
        
         
          }
        
          return Response.json({ message: "Not authenticated" }, { status: 401 })
        
    } catch (error) {
        
        return new Response('Server error', { status: 500 })

    }

 
}) as any 




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
                userBlock:true,
            }
        }))

        return new Response(JSON.stringify(user))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}



