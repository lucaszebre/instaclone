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
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";


interface Props {
    children: ReactNode;
  }
  
  const Search: React.FC<Props> = ({ children }) => {

  return (
    <Sheet>
        <SheetTrigger>
            {children}
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