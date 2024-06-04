import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { FeedValidator } from '@/lib/validator/feed';


export async function GET(req: Request) {
    try {

        const url = new URL(req.url)

        const pageParam = url.searchParams.get("page");
        const limitParam = url.searchParams.get("limit");

        // Check if parameters are null or not
        if (!pageParam || !limitParam) {
            return new Response("Page or limit parameter is missing", { status: 400 });
        }

        const page = parseInt(pageParam);
        const limit = parseInt(limitParam);

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
            skip: (page - 1) * limit,
            orderBy: { postedAt: 'desc' },
        });

        const count = await prisma.post.count();
        const remainingPosts = count - (page * limit);

        // Calculate nextCursor
        let nextCursor = null;
        if (remainingPosts > 0) {
            nextCursor = page + 1;
        }

        return new Response(JSON.stringify({ posts, count, offset: page, nextCursor }), { status: 200 });
    } catch (error) {
        return new Response("Server error", { status: 500 });
    }
}