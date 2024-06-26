'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Like,Comment } from '@/types'
import {  Usered } from '@/lib/validator/currentUser'
import InputEmoji from 'react-input-emoji'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import CommentCard from './commentCard'
import FeedOption from './optionFeed'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

  interface ModalPostProps {
    id:string
    uploadDate: string;
    likes: number;
    userId:string;
    date:string;
    comment:Comment[];
    like:Like[]
    image: string;
    imgdescription: string;
    name: string;
    City?: string;
    randomPeopleWhoLike?: string;
    children: ReactNode;
    avatar:string;
    username:string;
    filekey?:string
  }

function ModalPost(props: ModalPostProps) {
    const [comment,setComment]=useState(props.comment)
    useEffect(() => {
        pusherClient.subscribe(
          toPusherKey(`post:${props.id}`)
        )
    
        const commentHandler = (comment: Comment) => {
          setComment((prev) => [...prev,comment ])
        }

         // Event handler for deleted comments
        const deletedCommentHandler = ( commentId:string) => {
            setComment((prev) => prev.filter((comment:Comment) => comment.id !== commentId));
        };
        pusherClient.bind('incoming-comment-post', commentHandler)
        pusherClient.bind('deleted-comment-post', deletedCommentHandler);

    
        return () => {
          pusherClient.unsubscribe(
            toPusherKey(`post:${props.id}`)
          )
          pusherClient.unbind('deleted-comment-post', deletedCommentHandler);

          pusherClient.unbind('incoming-comment-post', commentHandler)
        }
      }, [props.id])
    const queryClient = useQueryClient()
    const user = useQuery({
        queryFn: async () => {
          const  data  = await axios.get('/api/user');
          const {User}= data.data ;
    
          return User as Usered
        },
        queryKey: ['user'],
        enabled:true
      })
    
    const [save,setSave]=useState(user.data?.savePost.some((p)=>p==props.id))
    const [likeCount, setLikeCount] = useState(props.likes);
    const [content, setContent] = useState("");
    const Save = useMutation({
        mutationFn: async (id:string) => {

        try {
            const result=   await axios.post(`/api/save?id=${id}`)

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status == 406) {
                    alert('need to be login to execute this action');
                }
            } else {
                console.log('An unexpected error occurred:', error);
            }
        }
        },
        onMutate: () => {
            setSave(true)
        },
        onSuccess:()=>{
            queryClient.resetQueries({ queryKey: [`post${props.id}`] })
            queryClient.resetQueries({ queryKey: [`user`] })
        }
    })
    const UnSave = useMutation({
        mutationFn: async (id:string) => {

            try {
                await axios.delete(`/api/save?id=${id}`)
    
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status == 406) {
                        alert('need to be login to execute this action');
                    }
                } else {
                    console.log('An unexpected error occurred:', error);
                }
            }
        },
        onMutate: () => {
            setSave(false)
        },
        onSuccess:()=>{
            
            queryClient.resetQueries({ queryKey: [`post${props.id}`] })
            queryClient.resetQueries({ queryKey: [`user`] })
        }
    })
    
    const Like = useMutation({
        mutationFn: async (id:string) => {

        try {
        await axios.post(`/api/like?p=${id}`)

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status == 406) {
                    alert('need to be login to execute this action');
                }
            } else {
                console.log('An unexpected error occurred:', error);
            }
        }
        },
        onError: () => {
        setLike(false)
        setLikeCount(prev=>prev-1)
        },
        onMutate: () => {
            setLike(true)
            setLikeCount(prev=>prev+1)
        },
        onSuccess:()=>{
            queryClient.resetQueries({ queryKey: [`post${props.id}`] })
        }
        
        
    })

    const Unlike = useMutation({
        mutationFn: async (id:string) => {
        try {
            await axios.delete(`/api/like?p=${id}`)

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status == 406) {
                        alert('need to be login to execute this action');
                    }
                } else {
                    console.log('An unexpected error occurred:', error);
                }
            }
        },
        onError: () => {
        setLike(true)
        setLikeCount(prev=>prev+1)

        },
        onMutate: () => {
            setLike(false)
            setLikeCount(prev=>prev-1)

        },
        onSuccess:()=>{
            queryClient.resetQueries({ queryKey: [`post${props.id}`] })
        }
    })
    const postedComment = useMutation({
        mutationFn: async (id:string) => {
           
            try {
     await axios.post('/api/comment',
            {
                postId:id,
                content,
                user:user.data
            });
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status == 406) {
                            alert('need to be login to execute this action');
                        }
                    } else {
                        console.log('An unexpected error occurred:', error);
                    }
                }
        },
        // onError: () => {
        // setLike(true)
        // setLikeCount(prev=>prev+1)

        // },
       onError:()=>{
        toast.error( 'Error to add a comment')
            // Other properties for the toast can be added here
        }
       ,
        onSuccess:()=>{
            toast.success( 'Just add a comment')
            // Other properties for the toast can be added here
        
            setContent("");
            queryClient.resetQueries({ queryKey: [`post${props.id}`] })
        }})
    
    const [like, setLike] = useState(props.like.some((i)=>i.userId==props.userId));
  return (
        <Dialog>
            <DialogTrigger>{props.children}</DialogTrigger>
            <DialogContent className='max-w-[1100px] w-full h-[80%] flex flex-row justify-between gap-11' >
            <div className='w-[40%] relative h-full' >
                        <Image src={props.image} alt={props.imgdescription} fill={true} objectFit='contain' />
            </div>
            <div className='max-w-[60%] w-full h-full gap-2 flex flex-col '>
                        <div className='flex flex-row items-center h-[50px] justify-between'>
                            <div className='flex flex-row items-center gap-4'>
                                <Avatar>
                                    <AvatarImage src={props.avatar||"./icon_profile.png"} />
                                    <AvatarFallback>{props.username}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col justify-between h-full'>
                                    <a className='font-mediun' href="">
                                    {props.username}
                                    </a>
                                    <span className='text-[#a8a29e]'>
                                        {props.City}
                                    </span>
                                </div>
                            </div>
                            <FeedOption filekey={props.filekey} userId={props.userId} id={props.id}>                            <div className='flex flex-col h-[100%] justify-center text-center items-center'>
                                <svg aria-label="More options" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </div>
                            </FeedOption>
                        </div>
                    <Separator />
                    <div  className='flex flex-col gap-2 h-screen w-full overflow-y-scroll'>
                    {comment.map((com,index)=>(
                        com.user &&
                            <CommentCard postId={com.postId} userId={user.data?.id||""} comIsUserId={com.userId}  key={index} avatarUrl={com.user.profilePictureUrl||""} username={com.user.username} content={com.content} id={com.id} index={index} date={com.commentedAt}  />
                            
                        
                        ))}

         
                        </div>
                    
                    <Separator />
                <div className='w-full flex flex-col gap-4 h-full'>
                        <div className='flex flex-row w-full content-center justify-between'>
                            <div className='flex flex-row content-center gap-4'>
                            {like? <svg onClick={()=>Unlike.mutate(props.id)} aria-label="Unlike" className="cursor-pointer x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>:<svg onClick={()=>Like.mutate(props.id)} aria-label="Like" className="cursor-pointer x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                        }   
                        <svg aria-label="Comment" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            {save  ?<svg onClick={()=>UnSave.mutate(props.id)} aria-label="Remove" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>  :<svg onClick={()=>Save.mutate(props.id)} aria-label="Save" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>}
                        </div>
                        
                        <div className='flex flex-row w-full justify-start'>
                            <span>
                            <span>{likeCount} likes</span>
                            </span>
                        </div>
                        
                        <InputEmoji
                            inputClass=''
                            value={content}
                            onChange={setContent}
                            onEnter={()=>{ postedComment.mutate(props.id);}}
                            placeholder="Type a message"
                        />

                    </div>
                    
            </div>
</DialogContent>
</Dialog>

        
  )
}


export default ModalPost
