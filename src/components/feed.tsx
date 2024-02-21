"use client"
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { timeSince } from '@/lib/time';
import { FeedPostLoader } from './loader/feedPost';
import { Toaster } from 'react-hot-toast';
import InfiniteScroll from "react-infinite-scroll-component";
import FeedPost from './feedPost';
import MenuMobile from './menuMobile';
import { Posted } from '@/types';

const Feed = ({ userId }: { userId: string }) => {
    const [count, setCount] = useState(0);

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['feed'],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await axios.get(`/api/feed?page=${pageParam}&limit=5`);
            const { data } = response;
            setCount(data.count); // Assuming count is present in the response data
            return data;
        },
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.offset * 5;
            return nextPage < count ? lastPage.offset+1 : false;
        },
        initialPageParam: 0,
    });

    const articles = data?.pages.reduce((acc: any, page: any) => {
        return [...acc, ...page.posts];
    }, []) as Posted[];

    const lastPostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, options);

        if (lastPostRef.current) {
            observer.observe(lastPostRef.current);
        }

        return () => {
            if (lastPostRef.current) {
                observer.unobserve(lastPostRef.current);
            }
        };
    }, [lastPostRef.current, hasNextPage, fetchNextPage]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <MenuMobile />
            <div className='max-w-[630px] mt-[60px] md:mt-0 h-screen relative flex flex-col gap-8 mb-[50px] w-full'>
                <div className='h-[48px]  w-full justify-start flex flex-row'>
                    <span>
                        For you
                    </span>
                </div>
                <div className='flex flex-col w-full h-screen justify-start items-center content-center gap-10'>
                    
                        {articles && articles.map((post: Posted, index) => (
                            <div key={post.id} ref={index === articles.length - 1 ? lastPostRef : null}>
                                <FeedPost
                                    filekey={post.filekey || ""}
                                    userId={userId}
                                    id={post.id}
                                    image={post.imageUrl}
                                    username={post.user?.username || ""}
                                    date={timeSince(post.postedAt)}
                                    likes={post.likes?.length || 0}
                                    comment={post.comments?.length.toString() || "0"}
                                    avatarurl={post.user?.profilePictureUrl || ''}
                                    like={post.likes || []}
                                    bio={post.bio || ""}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Feed;
