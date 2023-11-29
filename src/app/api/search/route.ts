import { Database } from "@/lib/database.type"
import prisma from "@/lib/db"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')
  const cookieStore = cookies()

  const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  
  const data = await supabase.auth.getSession()
  
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

    // // get the  list of the id of user who is block by the person doing the research currently 
    //     const blackList = await prisma.user.findFirst({where:{
    //         id:data.data.session?.user.id
    //     },
    //     select:{
    //         userBlock:true
    //     }})

    // // check if there is some user block

    // if(blackList){
    
    // // then filter out the user block and return then 
    // const filterUser = users.filter((user)=>{
    //     (        user: { id: string; username: string; email: string; fullName: string | null; bio: string | null; avatarkey: string | null; profilePictureUrl: string | null; isPrivate: boolean; joinedAt: Date; isEmailVerified: boolean; userBlock: string[]; userBLockme: string[] } ) => !blackList.userBlock.includes(user.id||"")
    // })
    // return new Response(JSON.stringify(filterUser)) 

    // }

    

    // if no user are block just return the result normally 
    
    
          return new Response(JSON.stringify(users)) 
    } catch (error) {
          
      
          return new Response('Could not search', { status: 500 })
    }
  
}