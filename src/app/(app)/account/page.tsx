export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true

import Edit from '@/components/edit'
import React from 'react'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import supabaSingleton from '@/lib/supabaSingleton';
import { useQuery } from '@tanstack/react-query';
const Page = async () => {
  const supabase = supabaSingleton();



  const { isLoading, data: session } =useQuery({
    queryFn: async () => {
      
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },
    
    queryKey: [`session`]
    
    })

  const userId=session?.user.id;
  
  // if user not auth can't acces and get redirect 

// we get the last profile status
  const profile = await prisma.user.findUnique({
    where: { id: userId},
    include: {
      posts:{include:{
        user:true,
        likes:true,
        comments:true,
        taggedUsers:true,
        tags:true
      }},
      followers:true,
      following:true,

      },
    },
  )

  if (!profile) return notFound()
  return (
    <div className='flex flex-row justify-center w-full h-full'>
      <Edit username={profile.username} gender={profile.gender||""} urlavatar={profile.profilePictureUrl||""} fullname={profile.fullName||""} bio={profile.bio||""} />
    </div>
  
  )
}

export default Page