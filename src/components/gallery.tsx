'use client'


import React from 'react';
import PhotoCard from './photoCard'; // Assuming PhotoCard is in the same directory
import {Post,  Posted } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { GetCurrentUser } from '@/actions/getCurrentUser';



    const Gallery = (props:{photos?: Posted[]} ) => {
        const user = useQuery({
            queryFn: async () => {
              const  data  = await GetCurrentUser();
            return data;
            },
            queryKey: ['user'],
            enabled:true
          })
    
        return (
        
        <div className="grid ml-3 relative md:ml-0 grid-cols-3  gap-x-[15px] gap-y-[15px]   w-screen md:w-full max-w-[975px]  mb-12 h-full " >
        {props.photos &&props.photos.map((photo, index) => (
            
            <PhotoCard id={photo.id} userId={user.data?user.data.id:""} avatar={photo.user.profilePictureUrl || ''} username={photo.user.username} key={index} image={photo.imageUrl} like={photo.likes ? photo.likes.length.toString() : "0"} comment={photo.comments ? photo.comments :[]} imgdescription={'dd'} likes={photo.likes?photo.likes:[]} />
        ))}
        </div>
    );
    }

export default Gallery;
