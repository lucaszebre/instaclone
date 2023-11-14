'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import React from 'react'
import { useStore } from '@/store/zus'
import Home from '@/components/pages/home'
import { Sidebar } from '@/components/sidebar';
import Inbox from '@/components/Inbox';
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'InstaClone',
//   description: 'Create by kihura',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {short,side} = useStore()

  return (
    <html lang="en">
    <head />
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
    <body>
      <main>
  <div className='flex bg-background flex-row h-screen justify-center md:justify-between w-full'>
  <Sidebar />
  <div className={`flex overflow-x-hidden z-0 mb-[50px]
  
  ${short && 'md:ml-[96px]' || 
  '  flex-row  xl:ml-[250px] md:ml-[96px] ml-[0px]'}
   h-screen w-full  justify-start`}>
    {children}
  
  
  </div>
  </div>
  </main>
      <Toaster />
    </body>
    </ThemeProvider>
  </html>
  )
}









