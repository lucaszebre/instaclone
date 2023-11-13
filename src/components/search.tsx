/* eslint-disable react/no-unescaped-entities */
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useStore } from "@/store/zus";


interface Props {
    children: ReactNode;
  }
  
  const Search: React.FC<Props> = ({ children }) => {
    const { setSide, side } = useStore()

  return (
    <Sheet>
        <SheetTrigger>
            <Button onClick={()=>setSide('search')} variant="ghost" className="w-full h-full md:h-[50px]  justify-center md:justify-start gap-5">
                {side==='search'? <svg aria-label="Découvrir" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Découvrir</title><path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line></svg> : <svg aria-label="Découvrir" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Découvrir</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>      }
                {side!=='search' ? <p className={`${side=='search'?'font-bold':''} xl:flex  hidden`}>Search</p>:null}
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Recherche</SheetTitle>
                <Input />
            </SheetHeader>
            <Separator />
        </SheetContent>
    </Sheet>
  );
};

export default Search;