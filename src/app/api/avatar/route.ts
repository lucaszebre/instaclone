import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
import { z } from 'zod';

 const Payload = z.object({
    url: z.string(),
    Avatarkey: z.string(),

});
export async function POST(req: Request) {
    
   
        let datad = await req.json();

        const validatedData = Payload.parse(datad);

        const {url,Avatarkey}=validatedData;


    // export async function NewAvatar(url: string,Avatarkey:string) {
        try {
            // Retrieve the cookies
            const cookieStore = cookies();
            const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });
    
            // Get the session
            const { data: session } = await supabase.auth.getSession();
            if (!session.session?.user.id) {
                return new Response("User is not authenticated", { status: 400 })

            }
    
            // Update the user's avatar
            await prisma.user.update({
                where: {
                    id: session.session?.user.id, // Assuming 'id' is the field for user ID in your database
                },
                data: {
                    profilePictureUrl: url,
                    avatarkey:Avatarkey
                },
            });
    
            return new Response('Avatar successfully uploaded', { status: 200 })

        } catch (error) {
            if (error instanceof Error) {
                return new Response(error.message, { status: 400 })

            }        
        }
    // }
  
}

