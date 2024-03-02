"use client"
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true

import React from 'react';
import Auth from '@/components/auth';
import supabaSingleton from '@/lib/supabaSingleton';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
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
