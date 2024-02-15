import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
// import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
interface Props {
    children: ReactNode;
    url:string,
    username:string,
    avatarkey:string
  }
const AvatarOption: React.FC<Props> = ({children,url,username,avatarkey}) => {
  const queryClient = useQueryClient();

  return (
    <div>
      <Dialog>
            <DialogTrigger> 
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='flex flex-row w-full text-center'>
                <DialogTitle className='text-center w-full'>Modifier la photo de profil</DialogTitle>
            </DialogHeader>
          
              <UploadButton<OurFileRouter>
                  endpoint="imageUploader"
                  onClientUploadComplete={async (res) => {
                  if(res){
                    await axios.post('/api/avatar',{
                      url:res[0].url,
                      Avatarkey:res[0].key
                    })
                    // await NewAvatar(res[0].url,res[0].key)
                    toast.success("Upload of the image completed");

                  
                queryClient.resetQueries({ queryKey: ['user',] })
                }
              }}
                
                onUploadError={(error: Error) => {
                  toast.error('Error to upload the image');

                 
                }}

                onUploadBegin={()=>{
                //   toast({
                //     title: "Upload of the image just started",
                //     description: '-_-',
                // });
                }
              }
              
              
              />
          
        <Button onClick={async ()=>{
          try {
            await axios.delete(`/api/avatar?fileKey=${avatarkey}`)
            queryClient.resetQueries({ queryKey: ['user',] })
            toast.success("The avatar been deleted sucessfully"); 
          } catch (error) {
            toast.error("Problem to delete the avatar");
          }
          
        }} variant="ghost">
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
