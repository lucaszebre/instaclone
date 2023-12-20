'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';

export async function editProfile( bio?:string,gender?:string) {
    try {
        // Retrieve the cookies
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

        // Get the session
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
            throw new Error("User is not authenticated");
        }

        await prisma.user.update({
            where: {
                id: session.session.user.id, // Assuming 'id' is the field for user ID in your database
            },
            data: {
                bio:bio,
                gender:gender
            },
        });

        return 'Avatar successfully update';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
