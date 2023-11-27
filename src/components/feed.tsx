'use client'


import React, { useRef } from 'react'
import FeedPost from './feedPost'
import MenuMobile from './menuMobile';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import getFeed from '@/actions/getFeed';
import { timeSince } from '@/lib/time';
import { FeedPostLoader } from './loader/feedPost';
import { useIntersection } from '@mantine/hooks'

const Feed = () => {
    
    const lastPostRef = useRef<HTMLElement>(null)
    const { ref, entry } = useIntersection({
      root: lastPostRef.current,
      threshold: 1,
    })
        let POSTS_PER_PAGE = 5
    const {
        data,
        status,
        error,
        fetchNextPage,
        isFetching,
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
        initialPageParam: 1, // Initial page parameter
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
          fetchNextPage() // Load more posts when the last post comes into view
        }
      }, [entry, fetchNextPage])

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
    isFetching ? (
        <>
            <FeedPostLoader />
            <FeedPostLoader />
            <FeedPostLoader />
            <FeedPostLoader />
        </>
    ) : (
        data?.pages.map((group, i) => (
            group.map((post, index) => {
                const isLastPost = i === data.pages.length - 1 && index === group.length - 1;
                return isLastPost ? (
                    <div ref={ref} key={`${i}-${index}`}>
                        <FeedPost
                            id={post.id}
                            image={post.imageUrl}
                            username={post.user.username}
                            date={timeSince(post.postedAt)}
                            likes={post.likes.length}
                            comment={post.comments.length.toString()}
                            avatarurl={post.user.profilePictureUrl || ''}
                            like={post.likes}
                        />
                    </div>
                ) : (
                    <FeedPost 
                        id={post.id}
                        key={`${i}-${index}`} 
                        image={post.imageUrl}
                        username={post.user.username}
                        date={timeSince(post.postedAt)}
                        likes={post.likes.length}
                        comment={post.comments.length.toString()}
                        avatarurl={post.user.profilePictureUrl || ''}
                        like={post.likes}
                    />
                );
            })
        ))
    )
}

        </div>
    </div>
    </>
    
  )
}

export default Feed
