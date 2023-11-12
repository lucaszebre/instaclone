'use client'

import React from 'react'
import {  Button } from './ui/button'
import CardSideProfile from './cardSideProfile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogInbox"
import { Input } from './ui/input'
import NewMessage from './newMessage'

const Inbox = (props:{
    username:string,
}) => {
  return (
    <div className='flex flex-row w-full'>
        <div className='flex flex-col justify-start h-screen w-full max-w-[400px] border-r-2 border-gray-200'>
            <div className='flex p-4  flex-col h-[110px] justify-center w-full border-b-2 border-gray-200'>
              <div className='flex flex-row justify-between'>
                <span>{props.username}</span>
                <NewMessage>
                  <svg aria-label="New message" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </NewMessage>

                        
              </div>
            </div>
            <div className='flex flex-col gap-2 overflow-y-scroll h-full overflow-x-hidden'>
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            <CardSideProfile inbox={true} name='main' subname='main' />
            

            </div>
            
          </div>
              <div className='flex flex-row justify-center h-full  w-full items-center content-center'>
                  <div className='flex w-full gap-3 flex-col justify-center items-center text-center'>
                  <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
                      <h1>Your messages</h1>
                      <p className='text-xs'>Send privates photos and messages to a friend or a group</p>
                      <NewMessage>
                          <Button>
                          Send message
                          </Button>            
                      </NewMessage>
                      

                  </div>
        </div>
    </div>
    
  )
}

export default Inbox