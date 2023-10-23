import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { DataProvider } from '@/store/datacontext'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Toaster />
        <Component {...pageProps} />
      </DataProvider>
      </QueryClientProvider>
        )
}
