import Image from 'next/image';
import React from 'react';

const PhotoCard = (props: { image: string; like: string; comment: string; imgdescription: string }) => {
  return (
    <div className="w-full h-full relative">
    <Image src={props.image} alt={props.imgdescription} fill={true} objectFit='contain' />

      <div className="absolute inset-0 h-full flex flex-row justify-center gap-2 items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl content-center gap-2">
          ❤️ {props.like}
        </span>
        <span className="text-white text-xl gap-2">
          💬 {props.comment}
        </span>
      </div>
    </div>
  );
}

export default PhotoCard;

