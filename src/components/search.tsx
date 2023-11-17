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
import { ReactNode, useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { searchUsers } from "@/actions/searchUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

interface Props {
    children: ReactNode;
  }
  
  const Search: React.FC<Props> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

 
  const {
    data, isLoading, isError
  } = useQuery({
    queryFn: async () => {
      if (!searchTerm) return []
      const  {data}  = await axios.get(`/api/search?q=${searchTerm}`)     
      return data as (User[]);
    },
    queryKey: ['search'],
  })

  console.log(data)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term when input changes
  };
  return (
    <Sheet>
        <SheetTrigger className="flex w-full">
            {children}
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Recherche</SheetTitle>
                <Input value={searchTerm} onChange={handleInputChange} /> {/* Bind input value and onChange */}
            </SheetHeader>
            <Separator />
            {isLoading && <p>Loading...</p>}
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