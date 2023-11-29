import { Button } from '@/components/ui/button'
import React from 'react'

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
        <div className='max-w-[300px] flex flex-col h-full w-full justify-start'>
        <span >
            How you use instagram
        </span>
        <Button>
            <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle><path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle></svg>
        </Button>
        {children}
        </div>
  )
}

