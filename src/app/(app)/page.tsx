/* eslint-disable react/jsx-no-undef */
'use server'

import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SideProfile from '@/components/sideProfile';
import Feed from '@/components/feed';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }
 
  return (
    <>
     
     <div suppressHydrationWarning={true} className='flex flex-row justify-between w-full'>
      <Feed  userId={session.user.id}/>
      <SideProfile />
    </div>
     
      
    </>
  );
}
