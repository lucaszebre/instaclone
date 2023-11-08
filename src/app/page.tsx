'use client'

import React from 'react';
import Auth from '@/components/auth';
import Main from '@/components/main';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
          <Main />
      ) : (
          <Auth />
      )}
    </>
  );
}


