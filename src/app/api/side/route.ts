export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from "@/auth";
import prisma from "@/lib/db";




export const GET = auth(async (req) => {

    let currentUserId=req.auth?.user.id;

  if (req.auth?.user.id) {
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
  }

  // Get 5 random users excluding the current user
  const sideProfiles = await prisma.user.findMany({
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


return new Response(JSON.stringify({  sideProfiles }))
}) as any