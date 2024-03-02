export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';
import { SchemaRegister } from '@/lib/validator/register';


export async function POST(req: Request) {
    
    try {
        // Validate input
        let datad = await req.json();

        const validatedData = SchemaRegister.parse(datad);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })

        const { data, error } = await supabase.auth.signUp({
            email: validatedData.email,
            password: validatedData.password
            })

        if (error){
            console.error(error)
            return new Response(error.message, { status: 400 })
        }
        // Hash password and create user
        await prisma.user.create({
            data: { email: validatedData.email,  username: validatedData.name,id:data.user?.id }
        });
        return new Response('Registration sucessfull', { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }
    }

  
}


