'use server'
import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';

export async function GetCurrentAndSideProfiles() {
    try {
        const cookieStore = cookies();
        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

        // Get the current user's session
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUserId = sessionData.session?.user.id;

        if (!currentUserId) {
            throw new Error("User is not authenticated");
        }

        // Get the current user's details
        const currentUser = await prisma.user.findUnique({
            where: { id: currentUserId },
        });

        // Get 5 random users excluding the current user
        const sideProfiles = await prisma.user.findMany({
            where: {
                id: { not: currentUserId },
            },
            take: 5,
            orderBy: { id: 'asc' },
            select: {
                username: true,
                fullName: true,
                profilePictureUrl: true,
            },
        });

        // Optionally shuffle the array to randomize the users
        for (let i = sideProfiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sideProfiles[i], sideProfiles[j]] = [sideProfiles[j], sideProfiles[i]];
        }

        return { currentUser, sideProfiles };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}