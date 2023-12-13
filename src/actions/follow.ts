import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';

export async function Follow(id: string) {
    try {
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        // Get the current user's ID
        const currentUserId = session.session?.user.id;

        // Update the current user's followers to add the new follower
        const updatedUser = await prisma.user.update({
            where: { id: currentUserId },
            data: {
                
                followers: {
                    
                    connect: {

                        id: id, // Assuming 'id' is the ID of the user to follow
                    },
                },
            },
        });

        return 'Added a follower to the current user logged in.';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
