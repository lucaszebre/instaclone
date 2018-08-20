import React, { useState } from 'react'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator';

const Chat = (props:{
  avatarUrl:string,
  username:string,
}) => {
  console.log("ababa")
  console.log("ababa")
  const [info,setInfo]=useState(false);
  return (
    <div className='flex relative  flex-col w-[100%] h-[100%]'>
      <div className='flex flex-row absolute top-0 border-r-2 border-gray-200 justify-between align-center w-[100%] h-[80px] p-3'>
          <div className='flex flex-row gap-2 items-center'>
              <Avatar className='w-[44px] h-[44px]'>
                  <AvatarImage src={props.avatarUrl} />
                  <AvatarFallback>{props.username}</AvatarFallback>
              </Avatar>
              <span>{props.username}</span>
          </div>
          <div>
          {info ? <svg onClick={()=>{setInfo(false)}} aria-label="Conversation information" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm-.182 5.955a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Zm1.614 11.318h-2.865a1 1 0 0 1 0-2H11V12.05h-.432a1 1 0 0 1 0-2H12a1 1 0 0 1 1 1v4.727h.433a1 1 0 1 1 0 2Z"></path></svg> : <svg onClick={()=>{setInfo(true)}} aria-label="Conversation information" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg> }
          </div>
      </div>
      <div className='flex absolute bottom-0 flex-row justify-between align-center w-[100%] h-[80px] p-3'>
          <Input className='w-[100%]' placeholder='Message..'  />
      </div>
    </div>
  )
}

export default Chat
