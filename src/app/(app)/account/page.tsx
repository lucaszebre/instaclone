/* eslint-disable react-hooks/rules-of-hooks */

import Setting from '@/components/setting'
import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'

const page = async () => {

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
        // This code runs on your server before upload
        const {
          data: { session },
        } = await supabase.auth.getSession()
  
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
      <Setting username={profile.username} urlavatar={profile.profilePictureUrl||""} fullname={profile.fullName||""} bio={profile.bio||""} />
    </div>
  
  )
}

export default page