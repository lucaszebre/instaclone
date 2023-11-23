'use server'

import React from 'react';
import Auth from '@/components/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (session) {
      redirect("/");
    }
return (
   
    <>
        <Auth />
    </>
    );
}