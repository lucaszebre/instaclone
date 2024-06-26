'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import dynamic from 'next/dynamic'

const InboxCard = (props:{username:string,last:string,avatar:string}) => {
  return (
    <div className='flex flex-row content-center justify-start gap-6'>
        <Avatar className='w-[56px] h-[56px]'>
            <AvatarImage src={props.avatar||"./icon_profile.png"} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
            <span>{props.username}</span>
            <span>{props.last}</span>
        </div>
    </div>
  )
}



export default InboxCard

