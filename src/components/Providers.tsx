"use client"
// Providers.tsx
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { DataProvider } from '@/store/datacontext';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

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





 
