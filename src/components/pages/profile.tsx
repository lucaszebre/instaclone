import React from 'react'
import Profile from '../profile'
import Gallery from '../gallery'

const ProfileMain = () => {
  const photos = [
    {
        image: "https://github.com/shadcn.png",
        like: "120 likes",
        comment: "This is a beautiful landscape!",
        imgdescription: "A breathtaking view of the mountains during sunset."
    },
    {
        image: "https://github.com/shadcn.png",
        like: "85 likes",
        comment: "Stunning architecture!",
        imgdescription: "An ancient temple with intricate designs."
    },
    {
        image: "https://github.com/shadcn.png",
        like: "200 likes",
        comment: "Love this!",
        imgdescription: "A group of friends enjoying a beach party."
    },
    {
        image: "https://github.com/shadcn.png",
        like: "150 likes",
        comment: "Such a serene place.",
        imgdescription: "A calm lake surrounded by autumn trees."
    },
    {
        image: "https://github.com/shadcn.png",
        like: "300 likes",
        comment: "Amazing shot!",
        imgdescription: "A city skyline at night, with lights reflecting on the water."
    }
];

  return (
    <div>
        <Profile username='lucas' subname='batour' bio='ddddd' publications='6' followers='340' following='340' /> 
        <Gallery  photos={photos} />
    </div>
  )
}

export default ProfileMain
