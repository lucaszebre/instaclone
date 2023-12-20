'use client'
import Profile from '@/components/profile'
import { GetCurrentUser } from '@/actions/getCurrentUser'
import { useQuery } from '@tanstack/react-query'
import ProfileCurrent from '@/components/profileCurrent'
import React from 'react'
import { GetUser } from '@/actions/getUser'
import Gallery from '@/components/gallery'
import axios from 'axios'
import { CurrentUserValidator } from '@/lib/validator/currentUser'
interface PageProps {
  params: {
    slug: string
  }
}

const Page = ({ params }: PageProps) => {
  const { slug } = params

  const currentUser =useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/currentUser');
    return CurrentUserValidator.parse(data);
    },
    queryKey: ['user'],
    enabled:true
  })
    const user = useQuery({
      queryFn: async () => {
        const  data  = await axios.get(`/api/user?username=${slug}`);
        return CurrentUserValidator.parse(data);
  },
  queryKey: [`${slug}`],
  })

if(slug===currentUser.data?.username){
  return (
    <div className='flex flex-row justify-center w-full'>
      <ProfileCurrent profile={currentUser.data}  />
    </div>
  )
}else if(user.data){
  return (
    <div className='flex flex-row justify-center w-full'>
      <Profile profile={user.data}  />
  </div>)
}
else{
  return (
    <div className='flex flex-row w-full  items-center justify-start mt-6 text-center'>
      <div className='flex w-full flex-col gap-2'>
        <h2>Sorry, this page is not available.</h2>
        <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
      </div>
    </div>
  )
}

 

  
}

export default Page
