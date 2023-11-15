import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/types'

const CurrentAvatar = (props:{user:User}) => {
    return (
        <Avatar className="hover:w-[26px] hover:h-[26px] w-[24px] h-[24px]">
            <AvatarImage src={props.user?.profilePictureUrl || ''} />
            <AvatarFallback>{props.user?.username}</AvatarFallback>
        </Avatar>
    );
};

export default CurrentAvatar;

