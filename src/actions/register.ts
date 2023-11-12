'use server'
import prisma from '@/lib/db';
import { SchemaRegister } from '@/types';
import { z } from 'zod';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';

export async function register(name: string, email: string, password: string) {
    try {
        // Validate input
        const validatedData = SchemaRegister.parse({ name, email, password });

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
            throw new Error(error.message);
        }
        // Hash password and create user
        await prisma.user.create({
            data: { email: validatedData.email,  username: validatedData.name,id:data.user?.id }
        });

        return 'Registration successful';
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}



