import React from 'react'
import CardSideProfile from './cardSideProfile'

const SideProfile = () => {
  return (
    <div className='max-w-[320px] p-4 w-full flex flex-col'>
        <div>
            <CardSideProfile name='main' subname='main' />
        </div>
      <div className='text-center'>
        <span className='text-gray-500	 font-medium'>Suggestion pour vous</span> 
      </div>
      <div>
        <CardSideProfile name='main' subname='main' />
        <CardSideProfile name='main' subname='main' />
        <CardSideProfile name='main' subname='main' />
        <CardSideProfile name='main' subname='main' />
        <CardSideProfile name='main' subname='main' />
      </div>
    
    </div>
  )
}

export default SideProfile
