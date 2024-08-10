'use client'

import '../../globals.css'
import { ThemeProvider } from 'next-themes';
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Next13ProgressBar } from 'next13-progressbar';
import { Toaster } from 'react-hot-toast';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()
  
 

  return (
  <html lang="en">
                  <QueryClientProvider  client={queryClient} >


    {/* <head /> */}
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

    <body suppressHydrationWarning>
    <Next13ProgressBar height="4px" color="linear-gradient(to right, 
              red, 
              orange, 
              yellow, 
              green, 
              blue, 
              indigo, 
              violet);" options={{ showSpinner: false  }} showOnShallow />

      <main>
        
          {children}
    </main>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </body>
    </ThemeProvider>
    </QueryClientProvider>

  </html>
  )
}
