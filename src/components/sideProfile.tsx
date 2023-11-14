'use client'
import React from 'react'
import CardSideProfile from './cardSideProfile'

const SideProfile = () => {
  return (
    <div className='lg:flex hidden max-w-[320px] p-6 w-full gap-2  h-screen justify-center flex-col'>
        <div>
            <CardSideProfile name='main' subname='main' />
        </div>
      <div className='text-start'>
        <span className='text-gray-500	 font-medium'>Suggestion pour vous</span> 
      </div>
      <div className='flex mt-3 flex-col gap-4'>
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
