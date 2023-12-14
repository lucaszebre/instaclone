'use server'
import prisma from '@/lib/db';


export async function getSavePost(id:string) {
    try {
        // Retrieve the cookies
       

      
        const savepost = await prisma.user.findFirst({
            where:{
                id
            },
            select:{
                savePost:true
            }
        })

        const listPost =   savepost?.savePost.map(async (post)=> {
            return (
            await prisma.post.findFirst({
                where:{
                    id:post
                },
                include:{
                    comments:true,
                    likes:true,
                    tags:true,
                    user:true,
                    taggedUsers:true
                },
            })
        )
        }
        
        )

        const list = await Promise.resolve(listPost);

        


        
        return list;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}