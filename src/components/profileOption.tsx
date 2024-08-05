"use client"
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation';
import { copyCurrentURL } from '@/lib/copyLink';
import AboutThisAccount from './aboutThisAccount';
import QRCodeDialog from './qrcode';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

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
