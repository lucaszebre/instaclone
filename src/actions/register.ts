'use server'
import prisma from '@/lib/db';
import supabase from '@/lib/supabase';
import { SchemaRegister } from '@/types';
import { z } from 'zod';

export async function register(name: string, email: string, password: string) {
    try {
        // Validate input
        const validatedData = SchemaRegister.parse({ name, email, password });

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

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
        if (error instanceof z.ZodError) {
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error('Could not register at this time. Please try later');
    }
}



