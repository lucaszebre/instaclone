import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CardSideProfile = (props:{suggestion?:boolean,followYou?:boolean}) => {
    if(props.suggestion){
        return (
            <div className='flex flex-row '>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <a href="">
                    Profilenamme
                    </a>
                    <span>
                        Suggestion
                    </span>
                </div>
                <div className='flex flex-col h-full justify-between'>
                    <span>
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
                    <a href="">
                    Profilenamme
                    </a>
                    <span>
                        Vous suit
                    </span>
                </div>
                <div className='flex flex-col h-full justify-between'>
                    <span>
                        Suivre
                    </span>
                </div>
          </div>
        )
    }
    return (
        <div className='flex flex-row '>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex flex-col justify-between h-full'>
                <a href="">
                Profilenamme
                </a>
                <span>
                    surname
                </span>
            </div>
            <div className='flex flex-col h-full justify-between'>
                <span>
                    Basculer
                </span>
            </div>
      </div>
    )
}


export default CardSideProfile
