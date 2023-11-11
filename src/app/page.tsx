'use server'

import React from 'react';
import Auth from '@/components/auth';
import Main from '@/components/main';
import supabase from '@/lib/supabase';
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session)
  return (
    <>
      {session ? (
          <Main />
      ) : (
          <Auth />
      )}
    </>
  );
}


