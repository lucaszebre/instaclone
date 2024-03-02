"use client"
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import React, { ReactNode, useState } from 'react'
import SharePost from './sharePost'
import { DialogHeader, DialogFooter } from './ui/dialog'
import Image from 'next/image'
import FeedOption from './optionFeed'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'

const fetchPostLikeStatus = async (postId:string) => {
    const { data } = await axios.get(`/api/like?p=${postId}`);
    return data;
};

interface Props {
    children: ReactNode;
    id:string;
    likes:number;
    avatarurl:string;
    username:string;
    image:string;
    date:string;
    }
    
const DialogPost: React.FC<Props> = ({children,id,likes,avatarurl,username,image,date})=> {
    const [save,setSave]=useState(false)
    const {
        isFetching,
        data,
        refetch,
        isFetched,
      } = useQuery({
        queryFn: async () => {
          const  data  = await fetchPostLikeStatus(id);
        return data;
        },
        queryKey: ['postLikeStatus'],
      })
    // const [like, setLike] = useState(data.isLiked);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(likes);
    const Like = useMutation({
        mutationFn: async (id:string) => {
        await axios.post(`/api/like?p=${id}`)
        },
        onError: () => {
        setLike(false)
        setLikeCount(prev=>prev-1)

        
        },
        onMutate: () => {
            setLike(true)
            setLikeCount(prev=>prev+1)
        }
    })
    const Unlike = useMutation({
        mutationFn: async (id:string) => {
        await axios.delete(`/api/like?p=${id}`)
        },
        onError: () => {
        setLike(true)
        setLikeCount(prev=>prev+1)

        
        },
        onMutate: () => {
            setLike(false)
            setLikeCount(prev=>prev-1)
        }
    })
  return (
      <Dialog >
        <DialogTrigger>
            {children}
        </DialogTrigger> 
        <DialogContent className='w-[70%] max-w-[1200px] h-full max-h-[90%]'>
                                    <div className='flex flex-row justify-between w-full'>
                                        <div className='w-[60%] h-full relative'>
                                            <Image className='rounded-sm'  src={image} fill objectFit='cover' alt={''}/>
                                        </div>
                                        <div className='flex flex-col w-[40%] '>
                                        <DialogHeader>
                                        <header className='flex flex-row justify-between content-center h-[32px]'>
            <div className='flex flex-row justify-start content-center gap-2'>
                <Avatar>
                    <AvatarImage src={avatarurl} />
                    <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <span>
                    {username} . {date}
                </span>
            </div>
           <FeedOption id={id}>
           <svg aria-label="More options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
           </FeedOption>
         
        </header>
        </DialogHeader>
                                    <ScrollArea className=' h-[200px] gap-[2rem] overflow-y-scroll p-4'>
                                        

                                    </ScrollArea>
                                    <DialogFooter>
                                    <div className='flex h-[40px] flex-row w-full content-center justify-between'>
                    <div className='flex flex-row items-center content-center gap-4'>
                    {like? <svg onClick={()=>Unlike.mutate(id)} aria-label="Unlike" className="cursor-pointer x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>:<svg onClick={()=>Unlike.mutate(id)} aria-label="Like" className="cursor-pointer x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                        }

                        <svg aria-label="Comment" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>

    
                            <SharePost>
                            <svg aria-label="Share Post" className="curor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                            </SharePost>
                            

                    </div>
                    {save  ?<svg onClick={()=>setSave(false)} aria-label="Remove" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>  :<svg onClick={()=>setSave(true)} aria-label="Save" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>}
                    </div>
                </DialogFooter>
            </div>
        </div>
    </DialogContent>
</Dialog>
  )
}


export default dynamic (() => Promise.resolve(DialogPost), {ssr: false})

