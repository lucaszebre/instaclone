'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';

export async function unsavePost(id:string) {
    try {
        // Retrieve the cookies
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

        // Get the session
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        const post = await prisma.post.findFirst({
            where:{
                id:id
            }
        })

        if(!post){
            throw new Error("The post do not exist");
        }

        const Savepost = await prisma.user.findFirst({
            where:{
                id:session.session.user.id
            },
            select:{
                savePost:true
            }
        })

        // filter out the id the post from save post 
        const SavepostFiltered=Savepost?.savePost.filter((f)=>f!==id)


        // set the new array 
        await prisma.user.update({
            where: {
                id: session.session.user.id, // Assuming 'id' is the field for user ID in your database
            },
            data: {
                savePost:{
                    set:SavepostFiltered
                }
            },
        });

        return 'The post has been unsave sucessfully';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}