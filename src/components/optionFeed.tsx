import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { useRouter } from 'next/navigation';
import { copyCurrentURL } from '@/lib/copyLink';
import { useToast } from './ui/use-toast';
import AlertBlock from './alertBlock';

interface Props {
    children: ReactNode;
    follow?:boolean
    }
const FeedOption: React.FC<Props> = ({    children,follow
}) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const {toast} = useToast()

    if(follow){
        return (
          <Dialog>
          <DialogTrigger> 
              {children}

          </DialogTrigger>
          <DialogContent>
              <Button variant="ghost">
                  Unfollow
              </Button>
              <Button variant="ghost">
                  Add to favorites
              </Button>
              <Button variant="ghost">
                  Go to post
              </Button>
               <Button variant="ghost">
                  Copy the link
              </Button>
              <Button  variant="ghost">
                 About this acount
              </Button>
          </DialogContent>
      </Dialog>
        )
    }
    return (
        
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    <Button variant="ghost">
                        Add to favorites
                    </Button>
                    <Button variant="ghost">
                        Go to post
                    </Button>
                     <Button variant="ghost">
                        Copy the link
                    </Button>
                    <Button  variant="ghost">
                       About this acount
                    </Button>
                </DialogContent>
            </Dialog>
    )
}

export default FeedOption
