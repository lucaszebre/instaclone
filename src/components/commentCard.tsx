import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { timeSince } from '@/lib/time'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const CommentCard = (props:{
    avatarUrl:string,
    username:string,
    content:string,
    id:string,
    index:number,
    date:Date,
    userId:string,
    comIsUserId:string,
    postId:string
}) => {
    const queryClient = useQueryClient()

    const DeleteComment = useMutation({
        mutationFn: async () => {
        await axios.delete(`/api/comment?id=${props.id}&postid=${props.postId}`);
        },
        onError: () => {
          toast.error('Error to delete the comment');
        },
       
        onSuccess:()=>{
             queryClient.invalidateQueries({ queryKey: [`user`] })
     }

    }
    )
    
  return (
    <div className='flex relative w-full items-start  flex-row justify-start gap-3 p-2'  key={props.index}>
                                <Avatar className={`  w-[24px] h-[24px]`} >
                                    <AvatarImage src={props.avatarUrl||''} />
                                    <AvatarFallback>{props.username}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row gap-1'>
                                        <p>
                                            {props.username}
                                        </p>
                                        <p>
                                            {timeSince(props.date)}
                                        </p>
                                    </div>
                                    <div>
                                    <p >{props.content}</p>

                                    </div>
                                    {
                                        props.userId===props.comIsUserId?
                                        <div className='absolute right-2'>
                                        <DropdownMenu >
                                        <DropdownMenuTrigger><svg aria-label="More options" className="none hover:flex x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={()=>{DeleteComment.mutate()}}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>:<></>
                                    }
                                    
                                    

                                </div>
                                
                                
                                
                            </div>
  )
}

export default CommentCard
