import React from 'react'
import Feed from '../feed'
import SideProfile from '../sideProfile'

const Home = (props:{userId:string}) => {
  return (
    <div className='flex flex-row justify-between w-full'>
      <Feed userId={props.userId}/>
      <SideProfile />
    </div>
  )
}

export default Home
