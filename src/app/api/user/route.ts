export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from '@/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)


        const { username } = z.object({
            username: z.string().nullable().optional(),
        })
        .parse({
            username: url.searchParams.get('username'),
        })


        console.log(username,"username")


        let User;
        if(username){
            User =  await prisma.user.findFirst({
                where: { username },
                include: {
                posts:{include:{
                    user:true,
                    likes:true,
                    comments:{
                        include:{
                          user:true
                        }
                      },
                    taggedUsers:true,
                    tags:true
                }},
                followers:true,
                following:true,
            
                },
                },
            )
    
        }else{
            
            const session = await auth()
  
            if (!session?.user?.email) throw new Error('Authentication failed');
            

            User =  await prisma.user.findFirst({
                where: { email:session?.user.email },
                include: {
                posts:{include:{
                    user:true,
                    likes:true,
                    comments:{
                        include:{
                          user:true
                        }
                      },
                    taggedUsers:true,
                    tags:true
                }},
                followers:true,
                following:true}}
            )
        }

    
    return new Response(JSON.stringify({User}))
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }


}


export const POST = auth(async (req) => {

    const url = new URL(req.url)

    const { username } = z.object({
        username: z.string().nullable().optional(),
    })
    .parse({
        username: url.searchParams.get('username'),
    })



    let User;
    if(username){
            User =  await prisma.user.findFirst({
                where: { username },
                include: {
                posts:{include:{
                    user:true,
                    likes:true,
                    comments:{
                        include:{
                        user:true
                        }
                    },
                    taggedUsers:true,
                    tags:true
                }},
                followers:true,
                following:true,
            
                },
                },
            )

            return new Response(JSON.stringify({User}))

        }else{


            let userId=req.auth?.user.id;

            if (req.auth?.user.id) {
                User =  await prisma.user.findFirst({
                    where: { id:userId },
                    include: {
                    posts:{include:{
                        user:true,
                        likes:true,
                        comments:{
                            include:{
                            user:true
                            }
                        },
                        taggedUsers:true,
                        tags:true
                    }},
                    followers:true,
                    following:true}}
                )
            }

        }


            

   

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any






