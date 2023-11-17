import prisma from "@/lib/db"


export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) return new Response('Invalid query', { status: 400 })
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: q, // Search by username
                            mode: 'insensitive', // Case-insensitive search
                        },
                    }, {
                        fullName: {
                            contains: q, // Search by username
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                     
                ],
            },
            take: 5,
        });
        
        
          return new Response(JSON.stringify(users)) 
    } catch (error) {
          
      
          return new Response('Could not search', { status: 500 })
    }
  
}