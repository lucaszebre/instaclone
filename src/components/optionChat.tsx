"use client"
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'


interface Props {
    children: ReactNode;
    id:string
    }
const ChatOption: React.FC<Props> = ({  id,  children
}) => {
   

    
    return (
        
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    {/* <Button variant="ghost">
                        Block
                    </Button> */}
                    
                        {/* <Button asChild variant="ghost">
                            <Link href={`p/${id}`} >
                                Go to post
                            </Link>
                        </Button>
                     
                     <Button variant="ghost">
                        Copy the link
                    </Button> */}
                    <Button  variant="ghost">
                       Delete the chat
                    </Button>
                </DialogContent>
            </Dialog>
    )
}


export default ChatOption

