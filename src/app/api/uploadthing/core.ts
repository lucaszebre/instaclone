import { createUploadthing, type FileRouter } from "uploadthing/next";
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import prisma from "@/lib/db";

const f = createUploadthing();
 


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
        const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies: () => cookieStore })
      // This code runs on your server before upload
      const {
        data: { session },
      } = await supabase.auth.getSession()
 
      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
      try {
        const newPost = await prisma.post.create({
            data: {
                imageUrl: file.url,
                user: { connect: { id: metadata.userId } },
            },
        });
      } catch (error) {
        throw new Error('fail to link the file to a user')
      }
     
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;