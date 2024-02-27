'use client'

import Image from 'next/image';
import React from 'react';
import ModalPost from './modalPost';
import { Like,Comment } from '@/types';

const PhotoCard = (props: { id:string,comment:Comment[],filekey:string, userId:string,image: string; likes:Like[], like: string; imgdescription: string ,avatar:string,username:string}) => {
  return (
    <>
    <ModalPost filekey={props.filekey} id={props.id} userId={props.userId} uploadDate={''} avatar={props.avatar} like={props.likes} username={props.username} likes={parseInt(props.like)} image={props.image} imgdescription={props.imgdescription} name={'ddd'} date={''} comment={props.comment}   >
    <div className="cursor-pointer relative w-full   h-full h-[300px]  ">
    <Image priority={true} src={props.image} alt={props.imgdescription} fill={true} objectFit='cover' placeholder='blur' blurDataURL={'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">'} />

      <div className="absolute inset-0 h-full flex flex-row justify-center gap-2 items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl content-center gap-2">
          ❤️ {props.like}
        </span>
        <span className="text-white text-xl gap-2">
          💬 {props.comment.length.toString()}
        </span>
      </div>
    </div>
    </ModalPost>
    </>
    
  );
}

export default PhotoCard;

