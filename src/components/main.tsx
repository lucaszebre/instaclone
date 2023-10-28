import React from 'react'
import { Sidebar } from './sidebar'
import SideProfile from './sideProfile'
import Profile from './profile'

const Main = () => {
  return (
    <div className='flex flex-row justify-center md:justify-between w-full'>
    <Sidebar />
    <div className='flex flex-row md:p-10 xl:ml-[250px] md:ml-[96px] h-full w-full pt-[2rem] justify-center'>
    <Profile username='lucas' subname='batour' bio='ddddd' publications='6' followers='340' following='340' />

    </div>
    </div>
      
    
  )
}

export default Main
