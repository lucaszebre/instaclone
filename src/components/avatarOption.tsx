import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { NewAvatar } from '@/actions/newAvatar';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { DeleteAvatar } from '@/actions/deleteAvatar';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useQueryClient } from '@tanstack/react-query';
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
                    await NewAvatar(res[0].url,res[0].key)

                  toast({
                    title: "Upload of the image completed",
                    // Other properties for the toast can be added here
                });
                queryClient.resetQueries({ queryKey: ['user',] })
                }
              }}
                
                onUploadError={(error: Error) => {
                  toast({
                    title: error.message,
                    description: 'Error to upload the image',
                    variant:'destructive'
                    // Other properties for the toast can be added here
                });
                }}

                onUploadBegin={()=>{
                  toast({
                    title: "Upload of the image just started",
                    description: '-_-',
                });
                }
              }
              
              
              />
          
        <Button onClick={async ()=>{
          try {
            await DeleteAvatar(avatarkey || "")
            queryClient.resetQueries({ queryKey: ['user',] })
            toast({
              title: "The avatar been deleted sucessfully",
          });
          } catch (error) {
            toast({
              title: "Problem to delete the avatar",
              description: '-_-',
          });
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
