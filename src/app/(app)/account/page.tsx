"use client"

import Edit from '@/components/edit'
import React, { useContext } from 'react'
import {  useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Usered } from '@/types';
import dynamic from 'next/dynamic'
const Page =  () => {


  const {
    isFetching,
    data,
    refetch,
    isFetched,
    isLoading
  } = useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/user');
      const {User}= data.data ;

      return User as Usered
    },
    queryKey: ['user'],
    enabled:true
  })
 
  if(isLoading){
    <p>Loading...</p>
  }else if (!data) {
    return (
      <div className='flex flex-row w-full  items-center justify-start mt-6 text-center'>
        <div className='flex w-full flex-col gap-2'>
          <h2>Sorry, this page is not available.</h2>
          <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
        </div>
      </div>
    )
  } else if (data){
    return (
    <div className='flex flex-row justify-center w-full h-full'>
      <Edit username={data.username} gender={data.gender||""} urlavatar={data.profilePictureUrl||"./icon_profile.png"} fullname={data.fullName||""} bio={data.bio||""} />
    </div>
  
  ) 
  }
 
}



export default dynamic (() => Promise.resolve(Page), {ssr: false})
