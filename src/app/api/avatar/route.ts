export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.type';
import { z } from 'zod';
import { utapi } from '@/lib/utapi';
import { auth } from '@/auth';

 const Payload = z.object({
    url: z.string(),
    Avatarkey: z.string(),

});

export const POST = auth(async (req) => {

    let datad = await req.json();

    const validatedData = Payload.parse(datad);

    const {url,Avatarkey}=validatedData;

  if (req.auth?.user.email) {
    
            // Update the user's avatar
            await prisma.user.update({
                where: {
                    email: req.auth.user.email, // Assuming 'id' is the field for user ID in your database
                },
                data: {
                    profilePictureUrl: url,
                    avatarkey:Avatarkey
                },
            });
    
            return new Response('Avatar successfully uploaded', { status: 200 })
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any 


export const DELETE = auth(async (req) => {

  
    const url = new URL(req.url)
        
    const fileKey  = url.searchParams.get('fileKey') 

    if(!fileKey){
        return new Response("File key is not defined", { status: 400 });

    }

  if (req.auth?.user.email) {
    
             // Delete the file using UTApi
             await utapi.deleteFiles(fileKey);
    
             // Update the user's avatar to null or an empty string
             await prisma.user.update({
                 where: {
                     email: req.auth.user.email, // Assuming 'id' is the field for user ID in your database
                 },
                 data: {
                     
                     profilePictureUrl: null, // Or an empty string if preferred
                 },
             });
     
             return new Response('Avatar successfully deleted', { status: 200 })
 
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any 





