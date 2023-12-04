'use client'

import React, { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogHeader } from './ui/dialogInbox'
  interface ModalPostProps {
    name: string;
    children: ReactNode;
    avatar:string;
    username:string;
    date:string;
  }

  export default function AboutThisAccount(props: ModalPostProps) {
  return (
        <Dialog>
            <DialogTrigger className='w-full'>{props.children}</DialogTrigger>
            <DialogContent className='max-w-[500px] w-full h-full max-h-[500px] flex flex-col justify-between gap-11' >
            <DialogHeader className='flex flex-row w-full justify-center'>About this account</DialogHeader>

                                <div className='flex flex-col justify-start gap-2'>
                                    <Avatar className='max-w-[200px] max-h-[200px]'>
                                        <AvatarImage className='w-[200px] h-[200px]' src={props.avatar} />
                                        <AvatarFallback className='h-[200px] w-[200px'>{props.username}</AvatarFallback>
                                    </Avatar>
                                    <span>{props.name}</span>
                                </div>
                                <div>

                                    <div>
                                        <p>
                                            Date joined
                                        </p>
                                        <p>
                                            {props.date}
                                        </p>
                                    </div>
                                </div>
                                
</DialogContent>
</Dialog>

        
  )
}
