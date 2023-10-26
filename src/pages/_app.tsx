import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from "next-auth/react"
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { DataProvider } from '@/store/datacontext'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import type { AppProps } from 'next/app'
import RootLayout from './layout'

export default function App({ Component,pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
      <SessionProvider session={session}>
        <RootLayout>
        <Toaster />
        <Component {...pageProps} />
        </RootLayout>
        </SessionProvider>
      </DataProvider>
      </QueryClientProvider>
        )
}
