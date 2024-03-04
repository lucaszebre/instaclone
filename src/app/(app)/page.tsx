/* eslint-disable react/jsx-no-undef */
"use client"



import React, { useContext } from 'react';

import {  useRouter } from 'next/navigation';
import SideProfile from '@/components/sideProfile';
import Feed from '@/components/feed';
import supabaSingleton from '@/lib/supabaSingleton';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Session } from "@supabase/gotrue-js/src/lib/types"
import { DataContext } from '@/store/datacontext';

function Page() {
  const router = useRouter();
  const supabase = supabaSingleton();

  const {session} = useContext(DataContext)


  // const { isLoading, data: session } =useQuery({
  //   queryFn: async () => {
      
  //       const { data: { session } } = await supabase.auth.getSession();
  //       localStorage.setItem("session",JSON.stringify(session))
  //       return session as Session;
  //   },
  //   queryKey: [`session`]
  //   })

 if(!session ){
    router.push('/auth')
  }





 

  return (
    <>
     
     <div suppressHydrationWarning={true} className='flex flex-row justify-between w-full'>
     {session &&  <Feed  userId={session.user.id}/>}
      <SideProfile />
    </div>
     
      
    </>
  );
}


export default dynamic (() => Promise.resolve(Page), {ssr: false})
