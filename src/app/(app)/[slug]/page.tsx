'use client'


import Profile from '@/components/profile'
import { useQuery } from '@tanstack/react-query'
import ProfileCurrent from '@/components/profileCurrent'
import React from 'react'
import axios from 'axios'
import { Usered } from '@/lib/validator/currentUser'
import dynamic from 'next/dynamic'
import { notFound, useRouter } from 'next/navigation'
import supabaSingleton from '@/lib/supabaSingleton'
import { Session } from '@supabase/supabase-js'
interface PageProps {
  params: {
    slug: string
  }
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();

  const session = localStorage.getItem("session");
  
  const { slug } = params

  const currentUser =useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/user');
      const {User}= data.data ;

      return User as Usered
    },
    queryKey: ['user'],
    enabled:true
  })

    const user = useQuery({
      queryFn: async () => {
        const  data  = (await axios.get(`/api/user?username=${slug}`));
        const {User}= data.data;
  
        return User as Usered
  },
  queryKey: [`${slug}`],
  })


 if(!session){
    router.push('/auth')
   }
  else
if(slug===currentUser.data?.username){
  return (
    <div className='flex flex-row justify-center w-full'>
      <ProfileCurrent profile={currentUser.data}  />
    </div>
  )
}else if(user.data  ){
  return (
    <div className='flex flex-row justify-center w-full'>
      <Profile profile={user.data}  />
  </div>)
}
else if(user.error || currentUser.error){

  return (
    <div className='flex flex-row w-full  items-center justify-start mt-6 text-center'>
      <div className='flex w-full flex-col gap-2'>
        <h2>Sorry, this page is not available.</h2>
        <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
      </div>
    </div>
  )
}

 else if(user.isLoading || currentUser.isLoading){
  return (
    <p>
      Is Loading ...
    </p>
  )
 }else if(
  !user.data 
 ){
  return notFound()
 }
 
  
}



export default dynamic (() => Promise.resolve(Page), {ssr: false})

