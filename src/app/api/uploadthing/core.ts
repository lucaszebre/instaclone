export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
 


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await auth()

      console.log(session,"inside the auth")
  
      if (!session?.user?.email) throw new Error('Authentication failed');
       
 
      // If you throw, the user will not be able to upload
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { email: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
      
     
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // return { uploadedBy: metadata.userId,url:file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;