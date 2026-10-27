/* eslint-disable react/jsx-no-undef */
"use server"



import React from 'react';

import SideProfile from '@/components/sideProfile';
import Feed from '@/components/feed';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { auth } from '@/auth';



async function Page() {

  const session = await auth()
  

  return (
    <>
     
     <div suppressHydrationWarning={true} className='flex flex-row justify-between w-full'>
     <Feed  userId={session?.user.id  ? session.user.id : ""}/> 
      <SideProfile />
    </div>
     
      
    </>
  );
}


export default Page
