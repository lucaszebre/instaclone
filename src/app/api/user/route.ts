import prisma from '@/lib/db';
import { UserSchema } from '@/types';

export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)

        const username = url.searchParams.get("username")

        if (!username) return new Response('Invalid query', { status: 400 })

        const User =await prisma.user.findFirst({
            where: { username },
            include: {
                    posts:{include:{
                    user:true,
                    likes:true,
                    comments:true,
                    taggedUsers:true,
                    tags:true
                    }},
                    followers:true,
                    following:true,
            
                },
                },
        )

       
        
        return new Response(
            JSON.stringify({
                User
            }))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

  
}