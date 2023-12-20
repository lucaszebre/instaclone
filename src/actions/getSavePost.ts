'use server'
import prisma from '@/lib/db';


export async function getSavePost(id:string) {
    try {

        const savepost = await prisma.user.findFirst({
            where:{
                id
            },
            select:{
                savePost:true
            }
        })

        if(!savepost){
            return []
        }

        const listFollowing = await Promise.all(savepost.savePost.map(async (post) => {
            const posted = prisma.post.findFirst({
                where:{
                    id:post
                },
                include:{
                    comments:true,
                    likes:true,
                    user:true,
                },
            })

            return posted
        }));
        

        
        return listFollowing;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}