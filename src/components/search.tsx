'use client'
/* eslint-disable react/no-unescaped-entities */
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ReactNode, useCallback, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";
import debounce from 'lodash.debounce'
import { useOnClickOutside } from '@/hooks/useClickOutside'
import { CardProfileLoader } from "./loader/cardProfile";
import CardSideProfile from "./cardSideProfile";


interface Props {
    children: ReactNode;
  }
  
  const Search: React.FC<Props> = ({ children }) => {
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
    <Sheet>
        <SheetTrigger className="flex w-full">
            {children}
        </SheetTrigger>
        <SheetContent ref={commandRef}>
            <SheetHeader>
                <SheetTitle>Recherche</SheetTitle>
                <Input value={searchTerm} onChange={handleInputChange} /> {/* Bind input value and onChange */}
            </SheetHeader>
            <Separator />
            {isFetching && <div className="flex flex-col gap-4 mt-2">
              <CardProfileLoader />
              <CardProfileLoader />
              <CardProfileLoader />
            </div>}
        {isError && <p>Error fetching users</p>}
        
        {data && data.length > 0  ? (
        <ul className="flex flex-col gap-5 mt-5 w-full h-full">
          {data.map((user,index) => (
            <CardSideProfile  key={index} url={user.profilePictureUrl||''} username={user.username} name={user.fullName||''}  />
          ))}
        </ul>
      ) : <p className={`${isFetching? 'hidden':'flex'} 'mt-6' `}>No users found</p>}
        </SheetContent>
    </Sheet>
  );
};

export default Search;