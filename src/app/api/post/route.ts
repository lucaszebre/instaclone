import { Database } from "@/lib/database.type";
import prisma from "@/lib/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Payload = {
    url: string;
  }


export async function POST(req:Request){
    try {
        const body: Payload = await req.json();
  
        // This doesn't work
        const { url } = body;
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
        const newPost = await prisma.post.create({
            data: {
                imageUrl: url,
                user: { connect: { id: data.data.session?.user.id} },
            },
        });

        return 'Registration successful';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}