import React from 'react';
import PhotoCard from './photoCard'; // Assuming PhotoCard is in the same directory

    const Gallery = (props: { photos: { image: string; like: string; comment: string; imgdescription: string }[] }) => {
    return (
        <div className="grid ml-3 md:ml-0 grid-cols-3 gap-1 w-screen md:w-full max-w-[975px]  mb-12 h-full " >
        {props.photos.map((photo, index) => (
            <PhotoCard key={index} image={photo.image} like={photo.like} comment={photo.comment} imgdescription={photo.imgdescription} />
        ))}
        </div>
    );
    }

export default Gallery;
