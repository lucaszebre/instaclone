export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


export async function POST(req: Request) {
    try {
        const url = new URL(req.url)
        const postId = url.searchParams.get('p');
        if (!postId) {
            throw new Error("Need the id ");
        }
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        // Get the current user's ID
        const currentUserId = session.session?.user.id;
        // Check if the user has already liked the post
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: currentUserId,
            },
        });

        if (existingLike) {
            // User has already liked the post, so you can decide whether to handle this case or return an error
            return new Response('Was already liked at first', { status: 200 });
        }

        // Create a new like for the post
        const newLike = await prisma.like.create({
            data: {
                postId: postId,
                userId: currentUserId,
            },
        });

        return new Response('like sucessfully', { status: 200 });

    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
  
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url)
        const postId = url.searchParams.get('p');
        if (!postId) {
            throw new Error("Need the id ");
        }
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        // Get the current user's ID
        const currentUserId = session.session?.user.id;

        // Check if the user has liked the post
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: currentUserId,
            },
        });

        if (!existingLike) {
            // User has not liked the post, so you can decide whether to handle this case or return an error
            return new Response('Was not liked at first', { status: 200 });

        }

          // Delete the like to unlike the post using both postId and userId
        await prisma.like.deleteMany({
            where: {
                postId: postId,
                userId: currentUserId,
            },
        });
        
        return new Response('Unlike sucessfully', { status: 200 });

    } catch (error) {
        return new Response('Server error', { status: 500 });
    }

  
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const postId = url.searchParams.get('p');

        if (!postId) return new Response('Invalid query', { status: 400 });

        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
      
        let userId=data.data.session?.user.id

        if(userId===undefined){
            return new Response('Unauthorized', { status: 401 })
        }

        const like = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        const isLiked = like !== null;

        return new Response(JSON.stringify(isLiked), { status: 200 });

    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}


