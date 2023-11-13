import React from 'react'
import Feed from '../feed'
import SideProfile from '../sideProfile'

const home = () => {
  return (
    <div className='flex flex-row justify-between w-full'>
      <Feed/>
      <SideProfile />
    </div>
  )
}

export default home
