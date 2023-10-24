import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
const Profile = (props:{
    username:string,
    publications:string,
    followers:string,
    following:string,
    bio:string,
    subname:string}) => {
    return (
        <div className='max-w-[975px] w-full'>
            <div className='w-full justify-between flex flex-row h-[190px]'>
                <div className='w-[290px] h-full flex justify-center content-center items-center mr-7'>
                   
                    <Dialog>
                        <DialogTrigger> 
                            <Avatar className='w-[150px] h-[150px]'>
                                                <AvatarImage  className='w-[150px] h-[150px]' src="https://github.com/shadcn.png" />
                                                <AvatarFallback className='w-[150px] h-[150px]'>CN</AvatarFallback>
                                            </Avatar>
                                            </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className='flex flex-row w-full text-center'>
                            <DialogTitle className='text-center'>Modifier la photo de profil</DialogTitle>
                            
                            </DialogHeader>
                            <Button variant="ghost">
                                Importe une photo
                            </Button>
                            <Button variant="ghost">
                                Supprimer la photo actuelle
                            </Button>
                            <Button variant="ghost">
                                Annuler
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className=' h-full flex flex-col justify-center gap-4 content-center w-full'>
                    <div className='flex flex-row justify-start content-center text-center items-center gap-8 w-full'>
                        <h2 className='text-[20px]'>{props.username}</h2>
                        <Button>Modifier le profil</Button>
                        <Dialog>
                        <DialogTrigger> 
                        <svg aria-label="Options" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

                                            </DialogTrigger>
                        <DialogContent>
                            
                            <Button variant="ghost">
                                Code qr
                            </Button>
                            <Button variant="ghost">
                                Parametre et confidantialité
                            </Button>
                            <Button variant="ghost">
                                Déconnexion
                            </Button>
                            <Button variant="ghost">
                                Annuler
                            </Button>
                        </DialogContent>
                    </Dialog>
                    </div>
                    <div className='flex flex-row justify-start content-center text-center items-cente gap-8 w-full'>
                        <span>
                            {props.publications} publications
                        </span>
                        <span>
                            {props.followers} followers
                        </span>
                        <span>
                            {props.following} Suivies
                        </span>
                    </div>
                    <div className='flex flex-col  content-center text-start items-cente justify-start gap-3 w-full'>
                        <div>
                            {props.subname}
                        </div>
                        <div>
                            {props.bio}
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Profile
