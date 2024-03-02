"use server"
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getUserProfile() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
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
