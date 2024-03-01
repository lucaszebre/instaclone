import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { useRouter } from 'next/navigation';
import { copyCurrentURL } from '@/lib/copyLink';
import AboutThisAccount from './aboutThisAccount';
import QRCodeDialog from './qrcode';
import toast from 'react-hot-toast';

interface Props {
    children: ReactNode;
    current:boolean
    uploadDate:string
    avatar:string
    username:string
    name:string
    }
const ProfileOption: React.FC<Props> = ({    children,current,username,uploadDate,avatar,name
}) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    if(current){
        return (
            <div>
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent className='w-[80%] md:w-full'>
                   
                    
                    <Button onClick={()=>{
                        // copyCurrentURL()
                        toast.success("Link copied");
                        
                        }} variant="ghost">
                        Share
                    </Button>
                    <AboutThisAccount  date={uploadDate} name={name}  avatar={avatar} username={username}>
                        <Button className='w-full'  variant="ghost">
                            About this account
                        </Button>
                    </AboutThisAccount>
                    
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
                <DialogContent className='w-[80%] md:w-full'>
                    <QRCodeDialog url='ddd'>
                        <Button className='w-full' variant="ghost">
                            Code qr
                        </Button>
                    </QRCodeDialog>
                   
                    
                    <Button onClick={async ()=>{
                            router.push('/auth')
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
