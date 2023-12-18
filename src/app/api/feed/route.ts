import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { FeedValidator } from '@/lib/validator/feed';


export async function GET(req: Request) {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

    const { data: sessionData } = await supabase.auth.getSession();
    const currentUserId = sessionData.session?.user.id;
    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }


    const url = new URL(req.url)

  const page = url.searchParams.get("page")
  const limit = url.searchParams.get("limit")


  if (!page) {
    throw new Error("Need to specify a page");
}  

if (!limit) {
    throw new Error("Need to specify a limit");

    
}
const paged = parseInt(page)
const limited = parseInt(limit)
    // Calculate the number of posts to skip

    let whereClause = {};

 
        whereClause = {
            user: {
                followers: { some: { followerId: currentUserId } }
            }
        };
    

    const posts = await prisma.post.findMany({
        where: whereClause,
        include:{
            comments:true,
            likes:true,
            tags:true,
            user:true,
            taggedUsers:true
        },
        take: limited,
        skip: (paged - 1) * limited,
        orderBy: { postedAt: 'desc' },
    });

    return new Response(JSON.stringify(posts)) 
}