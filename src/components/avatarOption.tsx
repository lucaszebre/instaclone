import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UploadButton } from '@/lib/uploadthing';
import { NewAvatar } from '@/actions/newAvatar';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { DeleteAvatar } from '@/actions/deleteAvatar';
interface Props {
    children: ReactNode;
    url:string,
    username:string,
    avatarkey:string
  }
const AvatarOption: React.FC<Props> = ({children,url,username,avatarkey}) => {
  return (
    <div>
      <Dialog>
            <DialogTrigger> 
               {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='flex flex-row w-full text-center'>
                <DialogTitle className='text-center'>Modifier la photo de profil</DialogTitle>
            </DialogHeader>
            <UploadButton
                className="border-white"
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              // Do something with the response
              console.log("Files: ", res);
              if(res){
                await NewAvatar(res[0].url,res[0].key)
              toast({
                title: "Upload of the image completed",
                // Other properties for the toast can be added here
            });
            }}
              }
              
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast({
                title: error.message,
                description: 'Error to upload the image',
                variant:'destructive'
                // Other properties for the toast can be added here
            });
            }}
          />
        <Button onClick={async ()=>{await DeleteAvatar(avatarkey || "")}} variant="ghost">
            Supprimer la photo actuelle
        </Button>
        <Button variant="ghost">
            Annuler
        </Button>
    </DialogContent>
</Dialog>
    </div>
  )
}

export default AvatarOption
