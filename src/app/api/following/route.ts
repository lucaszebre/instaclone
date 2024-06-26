import prisma from "@/lib/db"


export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('p');

        // Check if userId is not provided
        if (!userId) {
            return new Response( 'Need an id' , { status: 406 });
        }

        // Retrieve the user and their followers
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                following: true
            }
        });

        if (!user) {
            return new Response( 'User not found' , { status: 404});
        }

        // Fetch details of each follower
        const listFollowing = await Promise.all(user.following.map(async (follow) => {
            return prisma.user.findUnique({
                where: {
                    id: follow.followingId
                }
            });
        }));

        return new Response(JSON.stringify(listFollowing))

    } catch (error) {
        return new Response( 'Server error' , { status: 500});
    }
}