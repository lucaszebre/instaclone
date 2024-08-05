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
export async function POST(req: Request) {
    
   
        let datad = await req.json();

        const validatedData = Payload.parse(datad);

        const {bio,gender}=validatedData;

    // export async function editProfile( bio?:string,gender?:string) {
        try {
            const session = await auth()
  
            if (!session?.user?.email) throw new Error('Authentication failed');
            
    
            if (!session?.user.id) {
                return new Response("User is not authenticated", { status: 406 })
    
            }
            await prisma.user.update({
                where: {
                    id: session.user.id, // Assuming 'id' is the field for user ID in your database
                },
                data: {
                    bio:bio,
                    gender:gender
                },
            });
            return new Response('Profile successfully uploaded', { status: 200 })
        } catch (error) {
            if (error instanceof Error) {
                return new Response(error.message, { status: 400 })
            }
        }
    // }
}
