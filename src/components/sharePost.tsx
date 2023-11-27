"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import React, { ReactNode, useCallback, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import CardSideProfile from './cardSideProfile'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import debounce from 'lodash.debounce'
import axios from 'axios'
import { useOnClickOutside } from '@/hooks/useClickOutside'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/types'

interface Props {
    children: ReactNode;
    }

const SharePost: React.FC<Props> = ({children}) =>  {

    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const commandRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(commandRef, () => {
      setSearchTerm('')
    })
  const {
    data, isLoading, isError,refetch,isFetching
  } = useQuery({
    queryFn: async () => {
      if (!searchTerm) return []
      const  {data}  = await axios.get(`/api/search?q=${searchTerm}`)     
      return data as (User[]);
    },
    queryKey: ['search'],
    enabled:false
  })

  const request = debounce(async () => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term when input changes
    debounceRequest()

  };
  return (

       <Dialog >
                            <DialogTrigger>
                                {children}
                            </DialogTrigger> 
                                <DialogContent ref={commandRef} className='w-full max-w-[540px]'>
                                    <DialogHeader>
                                    <DialogTitle className='text-center'>Share</DialogTitle>
                                    <Separator />
                                    <DialogDescription className='items-center flex h-[38px] justify-between gap-4'>
                                        <span>To:</span>
                                        <Input value={searchTerm} onChange={handleInputChange} placeholder='search' className='w-full' />
                                    </DialogDescription>
                                    <Separator />

                                    </DialogHeader>
                                    <ScrollArea className=' h-[200px] gap-[2rem] overflow-y-scroll p-4'>
                                    {isError && <p>Error fetching users</p>}
        
                                        {data && data.length > 0  ? (
                                        <ul className="flex flex-col gap-5 mt-5 w-full h-full">
                                        {data.map((user,index) => (
                                            <CardSideProfile  key={index} url={user.profilePictureUrl||''} username={user.username} name={user.fullName||''}  />
                                        ))}
                                        </ul>
                                    ) : <p className={`${isFetching? 'hidden':'flex'} 'mt-6' `}>No users found</p>}

                                    </ScrollArea>
                                    <DialogFooter>
                                        <Button className='w-full'>
                                            Send
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            
                            </Dialog>

)
}

export default SharePost
