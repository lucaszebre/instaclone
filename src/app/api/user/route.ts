import { Database } from '@/lib/database.type';
import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
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
            const cookieStore = cookies()

            const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
            const data = await supabase.auth.getSession()

            User =  await prisma.user.findFirst({
                where: { id:data.data.session?.user.id },
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

export async function POST(req: Request) {
    try {
        
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
    
        }else{
            const cookieStore = cookies()

            const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
            const data = await supabase.auth.getSession()

                User =  await prisma.user.findFirst({
                    where: { id:data.data.session?.user.id },
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

