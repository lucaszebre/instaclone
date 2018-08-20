import React, { ReactNode, useCallback, useRef, useState } from 'react';
    import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialogInbox";
import CardSideProfile from "./cardSideProfile";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import debounce from 'lodash.debounce';
import { useOnClickOutside } from '@/hooks/useClickOutside';
import { CardProfileLoader } from './loader/cardProfile';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Search } from '@/lib/validator/search';

interface NewMessageProps {
    children: ReactNode;
  }
  
  const NewMessage: React.FC<NewMessageProps> = ({ children }) => {
    const queryClient = new QueryClient()
    const router = useRouter()

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
        return data as (Search[]);
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

    const [user,setUser]=useState("");
    const newChat = useMutation({
      mutationFn: async (id:string) => {
      await axios.post(`/api/conversation?id=${id}`)
      },
      onError: () => {
        // reset current vote
      return toast({
          title: 'Something went wrong.',
          variant: 'destructive',
      })
      },
      onSuccess:()=>{
          router.push('/direct/t/idChat')
          queryClient.resetQueries({queryKey:['conversation']})
      }
    }) 
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='flex flex-col h-full max-h-[400px] justify-start w-[500px]'>
        <DialogHeader className='flex pt-2 text-center items-center justify-center'>
          <DialogTitle className='text-center'>New message</DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-between gap-2 p-4'>
          <span>To:</span>
          <Input value={searchTerm} onChange={handleInputChange} />
        </div>
        <div className='flex flex-col h-full overflow-x-hidden overflow-y-scroll p-4'>
        {isFetching && <div className="flex flex-col gap-4 mt-2">
              <CardProfileLoader />
              <CardProfileLoader />
              <CardProfileLoader />
            </div>}
        {isError && <p>Error fetching users</p>}
        
        {data && data.length > 0  ? (
        <ul className="flex flex-col gap-5 mt-5 w-full h-full">
          {data.map((user:Search,index) => (
            <div onClick={()=>{setUser(user.id)}} key={index}>
                <CardSideProfile  name='' share={true} key={index} url={user.profilePictureUrl||''} username={user.username} subname={user.fullName||''}  />
            </div>
          ))}
        </ul>
      ) : <p className={`${isFetching? 'hidden':'flex'} 'mt-6' `}>No users found</p>}
        </div>
        <DialogFooter className='p-4'>
          <Button onClick={()=>{
            newChat.mutate(user)
          }} className='w-full'>Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessage;
