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
    current:boolean
    username?:string
    }
const ProfileOption: React.FC<Props> = ({    children,current,username
}) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const {toast} = useToast()

    if(current){
        return (
            <div>
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    <AlertBlock username={username||""} >
                        <Button className='w-full' variant="ghost">
                            Block
                        </Button>
                    </AlertBlock>
                    
                    <Button onClick={()=>{
                        copyCurrentURL()
                        toast({
                            title: "Link copied!",
                            // Other properties for the toast can be added here
                        });
                        }} variant="ghost">
                        Share
                    </Button>
                    <Button  variant="ghost">
                        About this account
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
        )
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    <Button variant="ghost">
                        Code qr
                    </Button>
                    <Button variant="ghost">
                        Parametre et confidantialité
                    </Button>
                    <Button onClick={async ()=>{
                            await supabase.auth.signOut()
                            router.refresh()

                    } } variant="ghost">
                        Déconnexion
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProfileOption
