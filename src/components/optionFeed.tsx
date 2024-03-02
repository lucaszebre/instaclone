"use client"
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode, useState } from 'react'
import { copyCurrentURL } from '@/lib/copyLink';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Usered } from '@/types';
import axios from 'axios';
import toast, {  Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

interface Props {
    children: ReactNode;
    follow?:boolean
    id:string,
    post?:boolean,
    userId?:string
    filekey?:string

    }
const FeedOption: React.FC<Props> = ({  id,userId,  children,follow,post,filekey
}) => {
    const currentUser =useQuery({
        queryFn: async () => {
          const  data  = await axios.get('/api/user');
          const {User}= data.data ;
    
          return User as Usered
        },
        queryKey: ['user'],
        enabled:true
      })
      const queryClient = useQueryClient()

      const Save = useMutation({
        mutationFn: async (id:string) => {
        await axios.post(`/api/save?id=${id}`)
        },
        onMutate: () => {
        },
        onSuccess:()=>{
            toast("post save")
            queryClient.resetQueries({ queryKey: [`post${id}`] })
            queryClient.resetQueries({ queryKey: [`user`] })
        }
    }) 
    
    const Delete = useMutation({
        mutationFn: async () => {
            await axios.delete('/api/post', { data: { id, filekey } });
        },
        onMutate: () => {
            
        },
        onSuccess:()=>{
            toast.success("Just delete the post")
            queryClient.refetchQueries({ queryKey: [`user`] })
        },
        onError:()=>{
            toast.error("error to delete the post")
        }
    })
    const [open, setOpen] = useState(false);

    if(follow){
        return (
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger> 
              {children}

          </DialogTrigger>
          <DialogContent>
              <Button variant="ghost">
                  Unfollow
              </Button>
              <Button onClick={()=>{
                setOpen(false);

                Save.mutate(id);

              }} variant="ghost">
                  Add to favorites
              </Button>
              <Link href={`p/${id}`} >
              <Button onClick={()=>{
                
                setOpen(false);

              }} asChild variant="ghost">
               
                    Go to post
                
              </Button>
              </Link>
               <Button onClick={()=>{
                copyCurrentURL(`p/${id}`);
                toast.success("link copied");
                setOpen(false);

              }}  variant="ghost">
                  Copy the link
              </Button>
             
          </DialogContent>
      </Dialog>
        )
    }
    return (
        
            <Dialog>
                <Toaster
  position="top-center"
  reverseOrder={false}
/>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    <Button onClick={()=>{
                Save.mutate(id);
                setOpen(false);

              }} variant="ghost">
                        Add to favorites
                    </Button>
                    
                    {post?null: <Button asChild variant="ghost">
                            <Link href={`p/${id}`} >
                                Go to post
                            </Link>
                        </Button> }    
                     {userId==currentUser.data?.id?
                     <Button onClick={ ()=>{
                        if(filekey){
                            Delete.mutate()
                        }else{
                            console.log("not defined")
                        }
                     }} variant="ghost">
                        Delete the post
                    </Button>:null}
                     <Button onClick={()=>{
               copyCurrentURL(`p/${id}`)
               toast.success("link copied")
                setOpen(false);

              }} variant="ghost">
                        Copy the link
                    </Button>
                 
                </DialogContent>
            </Dialog>
    )
}


export default dynamic (() => Promise.resolve(FeedOption), {ssr: false})

