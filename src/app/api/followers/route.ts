import prisma from "@/lib/db"


export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)
        
        const userId  = url.searchParams.get('p') || ""

        if(userId){
            return new Response('Need a id', { status: 401 })
        }
        const user = await prisma.user.findFirst(({
            where:{
                id:userId
            },
            select:{
                followers:true
            }
        }))


    const listFollowing= user?.followers.map(async (follow)=>{
            const user = await prisma.user.findFirst({
                where:{
                    id:follow.followerId
                }
            })
            return user
        })

        return new Response(JSON.stringify(listFollowing))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}