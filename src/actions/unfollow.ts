import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';

export async function Unfollow(id: string) {
    try {
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        // Get the current user's ID
        const currentUserId = session.session?.user.id;

        // Get the current user's ID

        // Update the current user's followers to remove the unfollowed user
        const updatedUser = await prisma.user.update({
            where: { id: currentUserId },
            data: {
                followers: {
                    disconnect: {
                        id: id, // Assuming 'id' is the ID of the user to unfollow
                    },
                },
            },
        });

        return 'Unfollowed the user successfully.';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
