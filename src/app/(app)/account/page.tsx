"use client"

import Edit from '@/components/edit'
import React from 'react'
import prisma from '@/lib/db'
import { notFound, useRouter } from 'next/navigation'
import supabaSingleton from '@/lib/supabaSingleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Usered } from '@/types';
import dynamic from 'next/dynamic'
const Page = async () => {
  const router = useRouter();
  

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

//  we get the last profile status
 

  const {
    isFetching,
    data,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/user');
      const {User}= data.data ;

      return User as Usered
    },
    queryKey: ['user'],
    enabled:true
  })

  if (!data) return notFound()
  return (
    <div className='flex flex-row justify-center w-full h-full'>
      <Edit username={data.username} gender={data.gender||""} urlavatar={data.profilePictureUrl||""} fullname={data.fullName||""} bio={data.bio||""} />
    </div>
  
  )
}



export default dynamic (() => Promise.resolve(Page), {ssr: false})
