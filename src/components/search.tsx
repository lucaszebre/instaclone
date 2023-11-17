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
import { searchUsers } from "@/actions/searchUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";
import debounce from 'lodash.debounce'
import { useOnClickOutside } from '@/hooks/useClickOutside'

interface Props {
    children: ReactNode;
  }
  
  const Search: React.FC<Props> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const commandRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(commandRef, () => {
      setSearchTerm('')
    })
  console.log(searchTerm,'search')
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
  
  console.log(data)

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
            {isFetching && <p>Loading...</p>}
        {isError && <p>Error fetching users</p>}

        {data && (
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        )}
        </SheetContent>
    </Sheet>
  );
};

export default Search;