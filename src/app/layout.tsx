import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InstaClone',
  description: 'Create by kihura',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head />
      <body>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}



