'use server'
import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { cookies } from 'next/headers';

// Constants
const POSTS_PER_PAGE = 5; // Adjust as needed

async function getFeed(page :number, limit:number,includeNonFollowed=true) {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

    const { data: sessionData } = await supabase.auth.getSession();
    const currentUserId = sessionData.session?.user.id;
    
    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }

    // Calculate the number of posts to skip

    let whereClause = {};

    if (!includeNonFollowed) {
        whereClause = {
            user: {
                followers: { some: { followerId: currentUserId } }
            }
        };
    } else {
        whereClause = {
            NOT: {
                user: { followers: { some: { followerId: currentUserId } } }
            }
        };
    }

    const posts = await prisma.post.findMany({
        where: whereClause,
        include:{
            comments:true,
            likes:true,
            tags:true,
            user:true,
            taggedUsers:true
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { postedAt: 'desc' },
    });

    return posts;
}

export default getFeed;
