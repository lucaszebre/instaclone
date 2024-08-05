"use server"
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { auth } from '@/auth';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getUserProfile() {
  try {
    const session = await auth()
  
          if (!session?.user?.id) throw new Error('Authentication failed');
    
    const userId = session?.user.id;

    if (!userId) {
      // Handle case where user is not authenticated
      return notFound();
    }

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: { include: { user: true, likes: true, comments: true, taggedUsers: true, tags: true } },
        followers: true,
        following: true,
      },
    });

   

    return profile;
  } catch (error) {
    return null;
  }
}

export default getUserProfile;
