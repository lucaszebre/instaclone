export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from '@/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

 const Payload = z.object({
    bio: z.string(),
    gender: z.string(),

});



export const POST = auth(async (req) => {
    let datad = await req.json();

    const validatedData = Payload.parse(datad);

    const {bio,gender}=validatedData;
  if (req.auth?.user.email) {
    await prisma.user.update({
        where: {
            email: req.auth.user.email, // Assuming 'id' is the field for user ID in your database
        },
        data: {
            bio:bio,
            gender:gender
        },
    });
    return new Response('Profile successfully uploaded', { status: 200 })
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any 


// export async function POST(req: Request) {
    
   
      

//     // export async function editProfile( bio?:string,gender?:string) {
//         try {
//             const session = await auth()
  
//             if (!session?.user?.email) throw new Error('Authentication failed');
            
    
//             if (!session?.user.id) {
//                 return new Response("User is not authenticated", { status: 406 })
    
//             }
       
//         } catch (error) {
//             if (error instanceof Error) {
//                 return new Response(error.message, { status: 400 })
//             }
//         }
//     // }
// }
