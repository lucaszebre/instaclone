'use client'
import React from 'react';
import PhotoCard from './photoCard'; 
import { GalleryType } from '@/lib/validator/gallery';
import dynamic from 'next/dynamic';


const Gallery = (props:{photos?: GalleryType[]} ) => {   
        return (
        
        <div className="grid ml-3 relative md:ml-0 grid-cols-3  gap-x-[15px] gap-y-[15px]   w-full md:w-screen md:w-full max-w-[975px]  mb-22 h-full " >
        {props.photos  &&props.photos.map((photo, index) => (
            
              photo && <PhotoCard filekey={photo.filekey?photo.filekey:""} id={photo.id} userId={photo.userId} avatar={photo.user.profilePictureUrl || ''} username={photo.user.username} key={index} image={photo.imageUrl} like={photo.likes ? photo.likes.length.toString() : "0"} comment={photo.comments ? photo.comments :[]} imgdescription={'dd'} likes={photo.likes?photo.likes:[]} />

            
        ))}
        </div>
    );
    }



export default Gallery

