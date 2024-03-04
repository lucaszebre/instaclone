// Providers.tsx
import React from 'react';
import { DataProvider } from '@/store/datacontext';

interface LayoutProps {
  children: React.ReactNode;
}

const Providers: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    
    <DataProvider>
        {children}
    </DataProvider>
  );
};

export default Providers;





 
