'use client'

import React, { useState } from 'react'
import {  Button } from './ui/button'
import CardSideProfile from './cardSideProfile'
import NewMessage from './newMessage'
import dynamic from 'next/dynamic'

const Inbox = (props:{
    username:string,
}) => {
  const [inbox,setInbox] =useState(false)
  return (
    <div className='flex flex-row w-full'>
        <div className={`flex flex-col justify-start h-screen w-full ${inbox?'max-w-full':'max-w-[400px]'}  border-r-2 border-gray-200`}>
            <div className='flex p-4  flex-col h-[110px] justify-center w-full border-b-2 border-gray-200'>
              <div className='flex flex-row justify-between'>
             {inbox?<svg aria-label="Back" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>:null} 
                <span>{props.username}</span>
                <NewMessage>
                  <svg aria-label="New message" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </NewMessage>

                        
              </div>
            </div>
            <div className='flex flex-col gap-2 overflow-y-scroll h-full pb-[48px] overflow-x-hidden'>
            <CardSideProfile  inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            <CardSideProfile inbox={true} name='main' subname='main' url={''} username={''} />
            

            </div>
            
        </div>
             
    </div>
    
  )
}


export default Inbox
