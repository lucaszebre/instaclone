import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogInbox";
import CardSideProfile from "./cardSideProfile";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface NewMessageProps {
    children: ReactNode;
  }
  
  const NewMessage: React.FC<NewMessageProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='flex flex-col h-full max-h-[400px] justify-start w-[500px]'>
        <DialogHeader className='flex text-center justify-center'>
          <DialogTitle className='text-center'>New message</DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-between gap-2 p-4'>
          <span>To:</span>
          <Input />
        </div>
        <div className='flex flex-col overflow-x-hidden overflow-y-scroll p-4'>
          {/* Repeat CardSideProfile components or use a loop */}
          {[...Array(10)].map((_, i) => (
            <CardSideProfile key={i} share={true} name='main' subname='main' />
          ))}
        </div>
        <DialogFooter>
          <Button className='w-full'>Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessage;
