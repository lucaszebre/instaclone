/* eslint-disable react/jsx-no-undef */
"use client"



import React from 'react';

import {  useRouter } from 'next/navigation';
import SideProfile from '@/components/sideProfile';
import Feed from '@/components/feed';
import supabaSingleton from '@/lib/supabaSingleton';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Session } from "@supabase/gotrue-js/src/lib/types"

function Page() {
  const router = useRouter();
  const supabase = supabaSingleton();



  const { isLoading, data: session } =useQuery({
    queryFn: async () => {
      
        const { data: { session } } = await supabase.auth.getSession();
        return session as Session;
    },
    queryKey: [`session`]
    })

  if (isLoading) {
      return <p>Loading...</p>;
  }

  if(session==undefined){
    return (
      <div>
        Error feed
      </div>
    )
  }

  // if (sessionData) {
  //     router.push('/');
  //     return null; // No need to render anything if redirecting
  // }

  return (
    <>
     
     <div suppressHydrationWarning={true} className='flex flex-row justify-between w-full'>
      <Feed  userId={session.user.id}/>
      <SideProfile />
    </div>
     
      
    </>
  );
}


export default dynamic (() => Promise.resolve(Page), {ssr: false})
