'use client'


import Theme from '@/components/theme';
import '../../globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React from 'react'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()

  return (
    <html  suppressHydrationWarning lang="en">
    <head />
    <QueryClientProvider client={queryClient}>
     <Theme> 
    <body>
      <main>
    {children}
  </main>
    </body>
    </Theme> 
    </QueryClientProvider>
  </html>
  )
}

