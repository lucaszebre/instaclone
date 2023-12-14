import prisma from '@/lib/db';
import { UserSchema } from '@/types';

export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)
        const q = url.searchParams.get('q')

        if (!q) return new Response('Invalid query', { status: 400 })

        const User =await prisma.user.findFirst({
            where: { username:q },
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

        const UserParsed = UserSchema.parse(User);
        
        return new Response(
            JSON.stringify({
                UserParsed
            }))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

  
}