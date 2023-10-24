import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CardSideProfile = (props:{suggestion?:boolean,followYou?:boolean,name:string,subname?:string}) => {
    if(props.suggestion){
        return (
            <div className='flex flex-row h-[50px] justify-center'>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
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
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
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
    return (
        <div className='flex flex-row  w-full justify-between content-center items-center'>
            <div className='flex flex-row gap-4 content-center items-center'>
                <Avatar className='w-[44px] h-[44px]'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
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
                <span className='text-[#0ea5e9]'>
                    Basculer
                </span>
            </div>
      </div>
    )
}


export default CardSideProfile
