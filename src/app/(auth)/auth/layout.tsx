'use client'

import '../../globals.css'
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import React from 'react'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
    {children}
  </main>
      <Toaster />
    </body>
    </ThemeProvider>
  </html>
  )
}