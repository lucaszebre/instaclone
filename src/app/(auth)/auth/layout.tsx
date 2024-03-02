'use client'
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import '../../globals.css'
import { Toaster } from '@/components/ui/toaster';
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
    <html lang="en">
    <head />
    <QueryClientProvider client={queryClient}>
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
    <body>
      <main>
    {children}
  </main>
      <Toaster />
    </body>
    </ThemeProvider>
    </QueryClientProvider>
  </html>
  )
}