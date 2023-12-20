import { Database } from "@/lib/database.type";
import prisma from "@/lib/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  
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

    
    return new Response(JSON.stringify({ currentUser, sideProfiles }))


    } catch (error) {
        if (error instanceof Error) {
            return new Response('Server error', { status: 500 });
        }
    }
    
}