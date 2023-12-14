'use client'

import Image from 'next/image';
import React from 'react';
import ModalPost from './modalPost';
import { Like } from '@/types';


const PhotoCard = (props: { id:string, userId:string,image: string; likes:Like[], like: string; comment: string; imgdescription: string ,avatar:string,username:string}) => {
  return (
    <>
    <ModalPost  id={props.id} userId={props.userId} uploadDate={''} avatar={props.avatar} like={props.likes} username={props.username} likes={parseInt(props.like)} image={props.image} imgdescription={props.imgdescription} name={'ddd'} date={''} comment={''}   >
    <div className="cursor-pointer relative w-full h-full">
    <Image src={props.image} alt={props.imgdescription} fill={true} objectFit='contain' placeholder='blur' blurDataURL={'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">'} />

      <div className="absolute inset-0 h-full flex flex-row justify-center gap-2 items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl content-center gap-2">
          ❤️ {props.like}
        </span>
        <span className="text-white text-xl gap-2">
          💬 {props.comment}
        </span>
      </div>
    </div>
    </ModalPost>
    </>
    
  );
}

export default PhotoCard;

