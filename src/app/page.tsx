
import React from 'react';
import Auth from '@/components/auth';
import Main from '@/components/main';
import { useSession } from 'next-auth/react';

 function Home() {
 

 
  const { data, status } = useSession();

  return (
    <>
        {status === 'authenticated' && data !== null? (
          // Wrap your Board component with ErrorBoundary
            <Main />
        ) : (
          // Wrap your Login component with ErrorBoundary
            <Auth />
        )}
    </>
  );
}

export default Home;