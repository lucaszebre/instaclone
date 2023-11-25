import prisma from "@/lib/db"


export async function GET(req: Request) {
    try {
        
        const url = new URL(req.url)
        
        const userId  = url.searchParams.get('p') || ""

        if(userId){
            return new Response('Need a id', { status: 401 })
        }
        const listFollowing = await prisma.user.findFirst(({
            where:{
                id:userId
            },
            select:{
                following:true            }
        }))


    

        return new Response(JSON.stringify(listFollowing))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}