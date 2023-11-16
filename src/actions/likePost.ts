import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';

export async function LikePost(postId: string) {
    try {
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
            return 'User has already liked this post';
        }

        // Create a new like for the post
        const newLike = await prisma.like.create({
            data: {
                postId: postId,
                userId: currentUserId,
            },
        });

        return 'Liked the post successfully.';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
