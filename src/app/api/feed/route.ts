import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { FeedValidator } from '@/lib/validator/feed';


export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

    const { data: sessionData } = await supabase.auth.getSession();
    const currentUserId = sessionData.session?.user.id;
    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }


    const url = new URL(req.url)

  const page = parseInt(url.searchParams.get("page"))
  const limit = parseInt(url.searchParams.get("limit"))



  if (isNaN(page) || isNaN(limit)) {
    return new Response("Invalid page or limit", { status: 400 });
}

    // Calculate the number of posts to skip

    const posts = await prisma.post.findMany({
        include:{
            comments:true,
            likes:true,
            tags:true,
            user:true,
            taggedUsers:true
        },
        take: limit,
        skip: (page-1)  * limit,
        orderBy: { postedAt: 'desc' },
        
    });

    const count = await prisma.post.count();


    return new Response(JSON.stringify({posts,"count":count,offset:page}),{status:200}) 
    } catch (error) {
        return new Response("Server error", { status: 500 })
    }
    
}


