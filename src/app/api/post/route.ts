import { auth } from "@/auth";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { utapi } from "@/lib/utapi";
import { toPusherKey } from "@/lib/utils";

type Payload = {
    url: string;
    filekey:string;
    filter:string
    bio:string
  }





type Payload2 = {
    id: string;
    filekey:string
  }




export const POST = auth(async (req) => {
    const body: Payload = await req.json();
  
    // This doesn't work
    const { url,filekey,filter,bio } = body;
    try {

        if (req.auth?.user.email) {
    
            const newPost = await prisma.post.create({
                data: {
                    imageUrl: url,
                    filekey,
                    user: { connect: { email: req.auth?.user.email} },
                    filter,
                    bio
                },
            });
    
            await pusherServer.trigger(toPusherKey(`feed`), 'incoming-post', {
                feed:1
            })
    
            
    
    
            return new Response('Sucessfully post a post', { status: 200 })

    

 }

 return Response.json({ message: "Not authenticated" }, { status: 401 })
        
    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
    
 
}) as any 

export const DELETE = auth(async (req) => {

    const body: Payload2 = await req.json();
  
    // This doesn't work
    const { id,filekey } = body;
    try {

        if (req.auth?.user.email) {
    
      
            await prisma.post.delete({where:{
                id
            },
        include:{
            likes:true,
            comments:true,
            
        }})
    
           // Delete the file using UTApi
           await utapi.deleteFiles(filekey);

           return new Response('Sucessfully delete a post', { status: 200 })

    

 }

 return Response.json({ message: "Not authenticated" }, { status: 401 })
        
    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
    
 
}) as any 

export async function GET(req: Request) {
        try {
  
        const url = new URL(req.url)
        const slug = url.searchParams.get('q')
        if(!slug){
            return new Response('Unthaurized', { status: 400 })

        }

      


   

        // get the post  
        
        const post = await prisma.post.findUnique({
            where: { id: slug },
            include: {
            comments:{
                include:{
                user:true
                }
            },
            likes:true,
            tags:true,
            taggedUsers:true,
            user:true
            }
            },
        )
      

        

        return new Response(JSON.stringify(post),{status: 200 })
    } catch (error) {
        return new Response('Server error', { status: 500 })

    }
}


