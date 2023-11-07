'use client'


import React from 'react'
import FeedPost from './feedPost'

const Feed = () => {
    const posts = [
        {
            image: "https://github.com/shadcn.png",
            username: "john_doe",
            date: "2 hours ago",
            likes: 123,
            comment: "This is a great post!"
        },
        {
            image: "https://github.com/shadcn.png",
            username: "jane_doe",
            date: "5 hours ago",
            likes: 456,
            comment: "Loved this!"
        },
        {
            image: "https://github.com/shadcn.png",
            username: "random_user",
            date: "1 day ago",
            likes: 789,
            comment: "Amazing content!"
        }
    ];
  return (
    <div className='max-w-[630px] h-screen relative flex flex-col gap-8 mb-[50px] w-full'>
        <div className='h-[48px]  w-full justify-start flex flex-row'>
            <span>
                For you
            </span>
        </div>
        <div className='flex  flex-col w-full h-screen justify-start items-center content-center gap-10'>
            {posts.map((post, index) => (
                <FeedPost 
                    key={index}
                    image={post.image}
                    username={post.username}
                    date={post.date}
                    likes={post.likes}
                    comment={post.comment}
                />
            ))}
        </div>
    </div>
  )
}

export default Feed
