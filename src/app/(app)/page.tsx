/* eslint-disable react/jsx-no-undef */
"use client"



import React from 'react';

import {  useRouter } from 'next/navigation';
import SideProfile from '@/components/sideProfile';
import Feed from '@/components/feed';
import supabaSingleton from '@/lib/supabaSingleton';
import { useQuery } from '@tanstack/react-query';

export default  function Page() {
  const router = useRouter();
  const supabase = supabaSingleton();



  const { isLoading, data: sessionData } =useQuery({
    queryFn: async () => {
      
        const { data: { session } } = await supabase.auth.getSession();
        return session as any;
    },
    queryKey: [`session`]
    })

  if (isLoading) {
      return <p>Loading...</p>;
  }

  // if (sessionData) {
  //     router.push('/');
  //     return null; // No need to render anything if redirecting
  // }

  return (
    <>
     
     <div suppressHydrationWarning={true} className='flex flex-row justify-between w-full'>
      <Feed  userId={sessionData.user.id}/>
      <SideProfile />
    </div>
     
      
    </>
  );
}
