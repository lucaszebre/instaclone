import React from 'react'
import { Sidebar } from './sidebar'
import SideProfile from './sideProfile'
import Profile from './profile'
import Feed from './feed'
import Inbox from './Inbox'

const clasds='flex overflow-x-hidden mb-[50px]  flex-row xl:ml-[250px] md:ml-[96px] h-screen w-full  justify-start'
const Main = () => {
  return (
    <div className='flex bg-background flex-row h-screen justify-center md:justify-between w-full'>
    <Sidebar />
    <div className='flex overflow-x-hidden mb-[50px]  flex-row  
    xl:ml-[250px] md:ml-[96px]
     h-screen w-full  justify-start'>
    {/* <Profile username='lucas' subname='batour' bio='ddddd' publications='6' followers='340' following='340' /> */}
    {/* <Feed /> */}
    <Inbox username={'lucas'} />
    </div>
    </div>
      
    
  )
}

export default Main
