'use client'


import React from 'react';
import PhotoCard from './photoCard'; // Assuming PhotoCard is in the same directory
import { Post } from '@/types';



    const Gallery = (props:{photos: Post[]} ) => {
        console.log(props.photos)
    return (
        
        <div className="grid ml-3 relative md:ml-0 grid-cols-3 gap-1 w-screen md:w-full max-w-[975px]  mb-12 h-full " >
        {props.photos.map((photo, index) => (
            <PhotoCard key={index} image={photo.imageUrl} like={photo.likes.length.toString()} comment={photo.comments.length.toString()} imgdescription={'dd'} />
        ))}
        </div>
    );
    }

export default Gallery;
