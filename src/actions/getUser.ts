'use server'
import prisma from '@/lib/db';
import { UserSchema } from '@/types';

export async function GetUser(username:string) {
    try {
        
        const profile = await prisma.user.findFirst({
            where: { username:username },
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
        
            return profile;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
