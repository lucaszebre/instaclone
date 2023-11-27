'use client'

import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogHeader } from './ui/dialogInbox'
  interface ModalPostProps {
    uploadDate: string;
    name: string;
    children: ReactNode;
    avatar:string;
    username:string;
    date:string;
  }

  export default function AboutThisAccount(props: ModalPostProps) {
  return (
        <Dialog>
            <DialogTrigger>{props.children}</DialogTrigger>
            <DialogContent className='max-w-[500px] w-full h-full max-h-[500px] flex flex-col justify-between gap-11' >
            <DialogHeader>About this account</DialogHeader>
                                <div>
                                    <Avatar>
                                        <AvatarImage src={props.avatar} />
                                        <AvatarFallback>{props.username}</AvatarFallback>
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
