import React from 'react'
import { Sidebar } from './sidebar'
import SideProfile from './sideProfile'

const Main = () => {
  return (
    <div className='flex flex-row justify-between w-full'>
    <Sidebar />
      <SideProfile />
    </div>
      
    
  )
}

export default Main
