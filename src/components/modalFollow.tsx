/* eslint-disable react/jsx-no-undef */
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import React, { ReactNode } from 'react'
import { Input } from './ui/input'
import { DialogHeader } from './ui/dialog'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CardProfileLoader } from './loader/cardProfile';
import CardSideProfile from './cardSideProfile';

interface ModalFollow {
    following: boolean;
    children: ReactNode;
    id:string;
}

const ModalFollow = (props:ModalFollow) => {


    const {
        isFetching,
        data,
        refetch,
        isFetched,
        } = useQuery({
        queryFn: async () => {
        let data;
            if(props.following){
                data = await axios.get(`/api/following?q=${props.id}`);
            }else{
                data = await axios.get(`/api/followers?q=${props.id}`);
            }
            return data;
        },
        queryKey: ['userlist'],
      })

    return (
        <Dialog>
            <DialogTrigger>{props.children}</DialogTrigger>
            <DialogContent className='max-w-[450px] w-full h-[70%] flex flex-col justify-between gap-11' >
            <DialogHeader className='flex flex-row justify-center text-center'>
                {props.following ? 'following':'followers'}
            </DialogHeader>
            <Input placeholder='Search'  />
            <div className='flex flex-col h-full w-full overflow-y-scroll'>
            {isFetching 
            && 
            <div className="flex flex-col gap-4 mt-2">
              <CardProfileLoader />
              <CardProfileLoader />
              <CardProfileLoader />
            </div>
            }
           {data?.data && data?.data.map((user: { profilePictureUrl: any; username: string; fullName: any; },index: React.Key | null | undefined) => (
            <CardSideProfile  key={index} url={user.profilePictureUrl||''} username={user.username} name={user.fullName||''}  />
          ))}
            </div>
            </DialogContent>
            </Dialog>

    )
}

export default ModalFollow
