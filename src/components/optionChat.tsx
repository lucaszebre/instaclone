import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { useRouter } from 'next/navigation';
import { copyCurrentURL } from '@/lib/copyLink';
import Link from 'next/link';

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
