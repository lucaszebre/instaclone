export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from '@/auth';
import prisma from '@/lib/db';



export async function POST(req: Request) {
    try {
        const url = new URL(req.url)
        const id= url.searchParams.get('id');

        if (!id) return new Response('Invalid query', { status: 400 });
        // Retrieve the cookies
        const session = await auth()
          
        if (!session?.user.id) {
            return new Response("User is not authenticated", { status:406})

        }

        const post = await prisma.post.findFirst({
            where:{
                id:id
            }
        })

        if(!post){
            return new Response("The post do not exist", { status:401})

        }

        // Check if the post is already saved by the user
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                savePost: true
            },
        });

        if (user?.savePost.some((p)=>p==id)) {
            return new Response('The post is already saved', { status:200 })
        }

        // Update the user's avatar to null or an empty string
        await prisma.user.update({
            where: {
                id: session.user.id, // Assuming 'id' is the field for user ID in your database
            },
        
            data: {
                
                savePost:{
                    
                    push:id
                }
            },
        });

        return new Response('Post save', { status:200 })

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
    

  
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url)
        const id= url.searchParams.get('id');

        if (!id) return new Response('Invalid query', { status: 400 });
        // Retrieve the cookies
        // Retrieve the cookies
        const session = await auth()
  
        if (!session?.user?.email) throw new Error('Authentication failed');

        // Get the session
        if (!session?.user.id) {
            return new Response("User is not authenticated", { status: 401 });

        }

        const post = await prisma.post.findFirst({
            where:{
                id:id
            }
        })

        if(!post){
            return new Response("The post do not exist", { status: 401 });

        }

        const Savepost = await prisma.user.findFirst({
            where:{
                id:session.user.id
            },
            select:{
                savePost:true
            }
        })

        // filter out the id the post from save post 
        const SavepostFiltered=Savepost?.savePost.filter((f)=>f!==id)


        // set the new array 
        await prisma.user.update({
            where: {
                id: session.user.id, // Assuming 'id' is the field for user ID in your database
            },
            data: {
                savePost:{
                    set:SavepostFiltered
                }
            },
        });
        return new Response('sucessfully unsave the post', { status: 200 });


    } catch (error) {
        if (error instanceof Error) {
            return new Response('Server error', { status: 500 });
        }
    }
}

export async function GET(req: Request) {
  
    try {
        const url = new URL(req.url)
        const postId = url.searchParams.get('p');

        if (!postId) return new Response('Invalid query', { status: 400 });
        const session = await auth()
  
      
        let userId=session?.user.id

        if(userId===undefined){
            return new Response('Unauthorized', { status: 401 })
        }

        const savepost = await prisma.user.findFirst({
            where:{
                id:postId
            },
            select:{
                savePost:true
            }
        })

        if(!savepost){
            return new Response(JSON.stringify([]), { status: 200 });
        }

        const listFollowing = await Promise.all(savepost.savePost.map(async (post) => {
            const posted = prisma.post.findFirst({
                where:{
                    id:post
                },
                include:{
                    comments:true,
                    likes:true,
                    user:true,
                },
            })

            return posted
        }));
        

        return new Response(JSON.stringify(listFollowing), { status: 200 });


    } catch (error) {
        if (error instanceof Error) {
            return new Response('Server error', { status: 500 });
        }
    }
    
}
