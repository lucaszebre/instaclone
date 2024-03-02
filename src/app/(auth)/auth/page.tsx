"use client"


import React from 'react';
import Auth from '@/components/auth';
import supabaSingleton from '@/lib/supabaSingleton';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

 function Home() {
    const router = useRouter();
    const supabase = supabaSingleton();



    const { isLoading, data: sessionData } =useQuery({
      queryFn: async () => {
        
          const { data: { session } } = await supabase.auth.getSession();
          return session;
      },
      
      queryKey: [`session`]
      
      })

    if (isLoading) {
        return <p>Loading...</p>;
    }

    

    if (sessionData) {
      router.push('/');
  }


    return (
        <>
            <Auth />
        </>
    );
}


export default dynamic (() => Promise.resolve(Home), {ssr: false})
