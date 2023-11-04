"use client"
// Providers.tsx
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { DataProvider } from '@/store/datacontext';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

// Here we do not use React.FC or FC at all to avoid the implicit children typing
const Providers: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <DataProvider>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </DataProvider>
  );
};

export default Providers;





 
