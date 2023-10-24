import React from 'react'
import { Sidebar } from './sidebar'
import SideProfile from './sideProfile'
import Profile from './profile'

const Main = () => {
  return (
    <div className='flex flex-row justify-between w-full'>
    <Sidebar />
    <div className='flex flex-row w-full pt-[2rem] justify-center'>
    <Profile username='lucas' subname='batour' bio='ddddd' publications='6' followers='340' following='340' />

    </div>
    </div>
      
    
  )
}

export default Main
