'use server'

import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { cookies } from 'next/headers';

// This function fetches posts for the feed
async function getFeed(cursor = null, limit = 5, includeNonFollowed = false) {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

    const { data: sessionData } = await supabase.auth.getSession();

    const currentUserId = sessionData.session?.user.id;
    
    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }

    let posts;

    if (!includeNonFollowed) {
        // Fetch posts from followed users
        posts = await prisma.post.findMany({
            where: {
                user: {
                    followers: {
                        some: { followerId: currentUserId }
                    }
                }
            },
            take: limit,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { postedAt: 'desc' },
        });
    } else {
        // Fetch posts from non-followed users
        posts = await prisma.post.findMany({
            where: {
                NOT: {
                    user: {
                        followers: {
                            some: { followerId: currentUserId }
                        }
                    }
                }
            },
            take: limit,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { postedAt: 'desc' },
        });
    }

    return posts;
}

export default getFeed;
