'use client'


import React from 'react'
import { Sidebar } from './sidebar'
import Inbox from './Inbox'
import { useStore } from '@/store/zus'
import ProfileMain from './pages/profile'
import Home from '@/components/pages/home'
import MenuMobile from './menuMobile'

const clasds='flex overflow-x-hidden mb-[50px]  flex-row xl:ml-[250px] md:ml-[96px] h-screen w-full  justify-start'
const Main = () => {
  const {short,side} = useStore()
  return (
    <>
      {side==='messages'  && <Inbox username={'lucas'} />}
      {side==='profile'   && <ProfileMain />}
      {side==='home'    && <Home />} 
    </>
  )
}

export default Main
