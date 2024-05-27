'use client'
import React from 'react'
import CardSideProfile from './cardSideProfile'
import { useQuery } from '@tanstack/react-query'
import { CardProfileFeedLoader } from './loader/cardFeedProfile'
import axios from 'axios'
import { z } from 'zod'
import dynamic from 'next/dynamic'

const SideProfile = () => {

  const sideProfile = z.object({
    currentUser:z.object(
      {username:z.string(),
      fullName:z.string(),
      profilePictureUrl :z.string()}),
        sideProfiles:z.array(
          z.object({username:z.string(),
            fullName:z.string(),
            profilePictureUrl :z.string()})
        )
  }
    
    )

    type SideType = z.infer<typeof sideProfile>;
  const {
    isFetching,
    data,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const  data  = (await axios.get('/api/side')).data;
    return data as SideType;
    },
    queryKey: ['side'],
  }) 

  return (
    <div className='lg:flex hidden max-w-[320px] p-6 w-full gap-2  h-screen justify-center flex-col'>
        <div>
          {isFetching ?    <CardProfileFeedLoader/> :            <CardSideProfile name={data?.currentUser?.username||''} subname={data?.currentUser?.fullName||''} url={data?.currentUser?.profilePictureUrl||''} username={data?.currentUser?.username||''}  />

}
        </div>
      <div className='text-start'>
        <span className='text-gray-500	 font-medium'>Suggested for you</span> 
      </div>
      <div className='flex mt-3 flex-col gap-4'>
      {
    isFetching ? (
        <>
            <CardProfileFeedLoader />
            <CardProfileFeedLoader />
            <CardProfileFeedLoader />
            <CardProfileFeedLoader />
            <CardProfileFeedLoader />
            
        </>
    ) : (
      data?.sideProfiles?.map((side,index) => (
        <CardSideProfile 
            key={index}
            name={side.username || ''} 
            subname={side.fullName || ''} 
            url={side.profilePictureUrl || './icon_profile.png'} 
            username={side.username || ''}
        />
    ))
        
    )
}

        
      </div>
    
    </div>
  )
}



export default SideProfile
