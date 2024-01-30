'use client'

import '../globals.css'
import { ThemeProvider } from 'next-themes';
import React from 'react'
import { useStore } from '@/store/zus'
import { Sidebar } from '@/components/sidebar';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Next13ProgressBar } from 'next13-progressbar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()
  const {short,side} = useStore()
  
  const pathname = usePathname()


const path = new RegExp(
  '^/direct(?:\/.*|)$'
);

  return (
  <html lang="en">
    <head />
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
              <QueryClientProvider  client={queryClient} >

    <body>
    <Next13ProgressBar height="4px" color="linear-gradient(to right, 
              red, 
              orange, 
              yellow, 
              green, 
              blue, 
              indigo, 
              violet);" options={{ showSpinner: false  }} showOnShallow />

      <main>
        <div className='flex bg-background flex-row h-screen justify-center md:justify-between w-full'>
        <Sidebar />
        <div className={`flex overflow-x-hidden z-0 mb-[50px]
        
        ${   path.test(pathname)  && 'md:ml-[96px]' || 
        '  flex-row  xl:ml-[250px] md:ml-[96px] ml-[0px]'}
        h-screen w-full  justify-start`}>
          {children}
        </div>
        </div>
    </main>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </body>
    </QueryClientProvider>
    </ThemeProvider>
  </html>
  )
}