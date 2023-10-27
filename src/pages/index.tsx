
import React,{ useContext, useEffect } from 'react';
import ErrorBoundary from '@/components/errorPage'; // Import your ErrorBoundary component
import Auth from '@/components/auth';
import Main from '@/components/main';
import { useSession } from 'next-auth/react';

 function Home() {
 

 
  const { data, status } = useSession();

  return (
    <>
        {status === 'authenticated' && data !== null? (
          // Wrap your Board component with ErrorBoundary
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
        ) : (
          // Wrap your Login component with ErrorBoundary
          <ErrorBoundary>
            <Auth />
          </ErrorBoundary>
        )}
    </>
  );
}

export default Home;