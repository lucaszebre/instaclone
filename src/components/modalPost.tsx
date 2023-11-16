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
  interface ModalPostProps {
    uploadDate: string;
    like: number;
    image: string;
    imgdescription: string;
    name: string;
    City?: string;
    randomPeopleWhoLike?: string;
    children: ReactNode;
  }

  export default function ModalPost(props: ModalPostProps) {
  return (
        <Dialog>
            <DialogTrigger>{props.children}</DialogTrigger>
            <DialogContent className='max-w-[1100px] w-full h-[80%] flex flex-row justify-between gap-11' >
            <div className='w-[40%] relative h-full' >
                        <Image src={props.image} alt={props.imgdescription} fill={true} objectFit='contain' />
            </div>
            <div className='max-w-[60%] w-full h-full flex flex-col '>
                        <div className='flex flex-row h-[50px] justify-between'>
                            <div className='flex flex-row gap-4'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col justify-between h-full'>
                                    <a className='font-mediun' href="">
                                    {props.name}
                                    </a>
                                    <span className='text-[#a8a29e]'>
                                        {props.City}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col h-[100%] justify-center text-center items-center'>
                                <svg aria-label="More options" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </div>
                        </div>
                    <Separator />
                    <div  className='flex flex-row h-screen w-full overflow-y-scroll'>

                        </div>
                    
                    <Separator />
                    <div className='w-full flex flex-col  h-full'>
                        <div className='flex flex-row w-full content-center justify-between'>
                            <div className='flex flex-row content-center gap-4'>
                                <svg aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                <svg aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>
                            <svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        </div>
                        
                        <div className='flex flex-row w-full justify-start'>
                            <span>
                                Liked by {props.randomPeopleWhoLike} and {props.like } others
                            </span>
                        </div>
                        
                        <div className='flex flex-row w-full gap-4 justify-between content-center'>
                            <textarea className='border-0 w-full bg-transparent  border-none max-h-[18px] h-full' placeholder='Add a comment' />
                            <span>Post</span>
                        </div>

                    </div>
                    
            </div>
</DialogContent>
</Dialog>

        
  )
}
