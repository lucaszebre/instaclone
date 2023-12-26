'use client'


import React, { useRef, useState } from 'react'
import FeedPost from './feedPost'
import MenuMobile from './menuMobile';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { timeSince } from '@/lib/time';
import { FeedPostLoader } from './loader/feedPost';
import { useIntersection } from '@mantine/hooks'
import axios from 'axios';
import { Posted } from '@/types';
import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { Message } from 'postcss';
import { Toaster,toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Feed = (props:{userId:string}) => {

    const [feed,setFeed] = useState(0);

    useEffect(() => {
        pusherClient.subscribe(
          toPusherKey(`feed`)
        )
    
        const feedHandler = (feed:number) => {
          setFeed((prev) => prev+feed)
        }
    
    
    
        pusherClient.bind('incoming-post', feedHandler)
    
        return () => {
          pusherClient.unsubscribe(
            toPusherKey(`feed`)
          )
          pusherClient.unbind('incoming-post', feedHandler)
        }
      }, [props.userId])
    
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
            const posts = (await axios.get(`/api/feed?page=${pageParam}&limit=5}`)).data
            return posts as Posted[];
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
      const router = useRouter()

      useEffect(()=>{
        console.log("haha")
        toast((t) => (
                <span>
                New post is here
                <button onClick={() => router.reload()}>
                    Refresh
                </button>
                </span>
          ));

        
      },[feed])
      
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
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
                            userId={props.userId}
                            id={post.id}
                            image={post.imageUrl}
                            username={post.user? post.user?.username:""}
                            date={timeSince(post.postedAt)}
                            likes={post.likes? post.likes.length: 0}
                            comment={post.comments? post.comments.length.toString() : "0"}
                            avatarurl={post.user?.profilePictureUrl? post.user?.profilePictureUrl : ''}
                            like={post.likes? post.likes :[]}
                        />
                    </div>
                ) : (
                    <FeedPost 
                        userId={props.userId}
                        id={post.id}
                        key={`${i}-${index}`} 
                        image={post.imageUrl}
                        username={post.user? post.user?.username:""}
                        date={timeSince(post.postedAt)}
                        likes={post.likes? post.likes.length: 0}
                        comment={post.comments? post.comments.length.toString() : "0"}
                        avatarurl={post.user?.profilePictureUrl? post.user?.profilePictureUrl : ''}
                        like={post.likes ? post.likes : []}
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
