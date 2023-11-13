'use client'


import React from 'react'
import { Sidebar } from './sidebar'
import Inbox from './Inbox'
import { useStore } from '@/store/zus'
import ProfileMain from './pages/profile'
import Home from '@/components/pages/home'

const clasds='flex overflow-x-hidden mb-[50px]  flex-row xl:ml-[250px] md:ml-[96px] h-screen w-full  justify-start'
const Main = () => {
  const {short,side} = useStore()
  return (
    <div className='flex bg-background flex-row h-screen justify-center md:justify-between w-full'>
    <Sidebar />
    <div className={`flex overflow-x-hidden mb-[50px]
    
    ${short && 'ml-[96px]' || 
    '  flex-row  xl:ml-[250px] md:ml-[96px]'}
     h-screen w-full  justify-start`}>
      
    {side==='messages'  && <Inbox username={'lucas'} />}
    {side==='profile'   && <ProfileMain />}
    {side==='home'    && <Home />} 
    
    </div>
    </div>
      
    
  )
}

export default Main
