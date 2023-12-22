'use client'


import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

const CardSideProfile = (props:{url:string,username:string,inbox?:boolean,share?:boolean,commentText?:string,CommentDate?:string,comment?:boolean,liked?:boolean,suggestion?:boolean,followYou?:boolean,name:string,subname?:string}) => {
    if(props.suggestion){
        return (
            <div className='flex flex-row h-[50px] justify-center'>
                <div>
                    <Avatar>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <a className='font-mediun' href="">
                    {props.name}
                    </a>
                    <span className='text-[#a8a29e]'>
                        Suggestion
                    </span>
                </div>
                <div className='flex flex-col h-[100%] justify-center text-center items-center'>
                    <span className='text-[#0ea5e9]'>
                        Suivre
                    </span>
                </div>
          </div>
        )
    }
     if(props.followYou){
        return (
            <div className='flex flex-row '>
                <div>
                    <Avatar>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <a className='font-mediun' href="">
                    {props.name}
                    </a>
                    <span className='text-[#a8a29e]'>
                        Vous suit
                    </span>
                </div>
                <div className='flex flex-col h-full justify-between'>
                    <span className='text-[#0ea5e9]'>
                        Suivre
                    </span>
                </div>
          </div>
        )
    }
    if(props.liked){
        return (
            <div className='flex flex-row '>
                <div>
                    <Avatar className='w-[32px] h-[32px]'>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <a className='font-mediun' href="">
                    {props.name}
                    </a>
                    <div>
                    <span className='text-[#a8a29e]'>
                        {props.CommentDate}
                    </span>
                    <span>
                        reply
                    </span>
                    </div>
                    
                </div>
                <div className='flex flex-col h-full justify-between'>
                <svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="12" role="img" viewBox="0 0 48 48" width="12"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                </div>
          </div>
        )
    }if(props.comment){
        return (
            <div className='flex flex-row '>
                <div>
                    <Avatar className='w-[32px] h-[32px]'>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <a className='font-mediun' href="">
                    {props.name}
                    </a>
                    <span className='text-[#a8a29e]'>
                        {props.CommentDate}
                    </span>
                </div>
                <div className='flex flex-col h-full justify-between'>
                <span>{props.commentText}</span>
                </div>
          </div>
        )
    }if(props.share){
        return (
          
           <div className='flex flex-row  w-full justify-between content-center items-center'>
           <div className='flex flex-row gap-4 content-center items-center'>
               <Avatar className='w-[44px] h-[44px]'>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
               </Avatar>
               <div className='flex flex-col justify-between h-full'>
               <a className='font-mediun' href="">
               {props.username}
               </a>
               <span className='text-[#a8a29e]'>
               {props.subname}
               </span>
           </div>
           </div>
           
           <div className='flex flex-col h-full text-center justify-center'>
           <input type="radio" className='w-[24px] h-[24px]' />

           </div>
     </div>
        )
    }if(props.inbox){
        return (
          
           <div className='flex flex-row px-5 py-2 hover:bg-slate-100 cursor-pointer  w-full justify-between content-center items-center'>
           <div className='flex flex-row gap-4 content-center items-center'>
               <Avatar className='w-[56px] h-[56px]'>
                        <AvatarImage src={props.url} />
                        <AvatarFallback>{props.username}</AvatarFallback>
               </Avatar>
               <div className='flex flex-col justify-between h-full'>
               <a className='font-mediun' href="">
               {props.name}
               </a>
               <span className='text-[#a8a29e]'>
               {props.subname}
               </span>
           </div>
           </div>
           
           <div className='flex flex-col h-full text-center justify-center'>

           </div>
     </div>
        )
    }
    return (
        <div className='flex flex-row  w-full justify-between content-center items-center'>
            <Link href={`/${props.username}`}>
                <div className='flex flex-row gap-4 content-center items-center'>
                    <Avatar className='w-[44px] h-[44px]'>
                            <AvatarImage src={props.url} />
                            <AvatarFallback>{props.username}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-between h-full'>
                    <a className='font-mediun' href="">
                    {props.username}
                    </a>
                    <span className='text-[#a8a29e]'>
                    {props.subname}
                    </span>
                </div>
                </div>
            </Link>
            
            
            <div className='flex flex-col h-full text-center justify-center'>
                {/* <span className='text-[#0ea5e9]'>
                    Basculer
                </span> */}
            </div>
      </div>
    )
}


export default CardSideProfile
