import { hashPassword } from '@/lib/auth';
import prisma from '@/lib/db';
import { SchemaRegister } from '@/types'
import { z } from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body;

      const { name, email, password } = SchemaRegister.parse(body);

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, username: name }
      });

      return res.status(200).json({ message: 'OK' });

    } catch (error) {
    //   if (error instanceof z.ZodError) {
    //     return res.status(400).json({ message: error.message });
    //   }
    console.log(error)

      return res.status(500).json({ message: 'Could not register at this time. Please try later' });
    }
  } 
}

export default handler;
