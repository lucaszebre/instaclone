'use client'


import React from 'react'
import FeedPost from './feedPost'
import MenuMobile from './menuMobile';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import getFeed from '@/actions/getFeed';
import useFeedQuery from '@/hooks/useFeed';
import { timeSince } from '@/lib/time';

const Feed = () => {
    const { ref, inView } = useInView();
    let POSTS_PER_PAGE = 5
    const {
        data,
        status,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['feed'],
        queryFn: async ({ pageParam = 1 }) => {
            const posts = await getFeed(pageParam,5);
            return posts;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < POSTS_PER_PAGE) {
                // No more pages left to load
                return 1;
            }
            // Return the next page number
            return allPages.length + 1;
        },
        initialPageParam: 1 // Initial page parameter
    });


    console.log(data)


useEffect(() => {
    if (inView  ) {
        fetchNextPage();
    }
}, [inView, fetchNextPage]);

  return (
    <>
        <MenuMobile />
        <div className='max-w-[630px] mt-[60px] md:mt-0 h-screen relative flex flex-col gap-8 mb-[50px] w-full'>
        <div className='h-[48px]  w-full justify-start flex flex-row'>
            <span>
                For you
            </span>
        </div>
        <div className='flex  flex-col w-full h-screen justify-start items-center content-center gap-10'>
        {
            data?.pages.map((group, i) => (
                group.map((post, index) => (
                    <FeedPost 
                        key={`${i}-${index}`} // Using a combination of group index and item index for key
                        image={post.imageUrl}
                        username={post.user.username} // Assuming `user` is a nested object in `post`
                        date={timeSince(post.postedAt)}
                        likes={post.likes.length} // Assuming `likes` is an array
                        comment={post.comments.length.toString()} // Assuming `comments` is an array
                        avatarurl={post.user.profilePictureUrl||''}
                    />
        ))
    ))
}

        </div>
    </div>
    </>
    
  )
}

export default Feed
