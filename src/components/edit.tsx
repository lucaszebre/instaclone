"use client"

/* eslint-disable react/jsx-no-undef */
import { Button, buttonVariants } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from './ui/use-toast'
import { NewAvatar } from '@/actions/newAvatar';
import { uploadFiles } from '@/lib/uploadthing'
import React, { ReactNode, useState } from 'react'
import { DeleteAvatar } from '@/actions/deleteAvatar';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfile } from '@/actions/editProfile'
import axios from 'axios'

const Edit = (props:{
  urlavatar?:string,
  username?:string,
  fullname?:string
  bio?:string
  gender?:string
}) => {
  const {toast} = useToast()
  const queryClient = useQueryClient();
  const [gender,setGender]=useState(props.gender)
  const [bio,setBio]=useState(props.bio)

  const Edit = useMutation({
    mutationFn: async () => {
    await editProfile(bio,gender);
    },
    onError: () => {
      toast({
        title: "Problem -_-",
        description: 'Error to edit the profile',
        variant:'destructive'
        // Other properties for the toast can be added here
    });
    },
   
    onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: [`user`] })
        toast({
          title: "The profile has been edit sucessfully",
          description: 'Error to edit the profile',
          // Other properties for the toast can be added here
      });    }
    
    
})

  return (
    <div className='flex w-full h-full max-w-[650px] gap-3 p-4 flex-col justify-between'>
      <span>
        Edit Profile
      </span>
      <div className='flex flex-row items-center p-4 justify-between w-full light: dark:bg-[#363636] h-[88px] rounded-md'>
        {/* Edit avatar */}
        <div className='flex flex-row justify-start gap-3'>
          <Avatar className={`  w-48px] h-[50px]`} >
                <AvatarImage src={props.urlavatar||''} />
                <AvatarFallback>{props.fullname}</AvatarFallback>
          </Avatar>
          <div className='flex flex-row justify-between '>
            <h1>{props.username}</h1>
            <p>{props.fullname}</p>
          </div>
        </div>
        <div>
        <UploadButton<OurFileRouter>
                  endpoint="imageUploader"
                  onClientUploadComplete={async (res) => {
                  if(res){
                    await axios.post('/api/avatar',{
                      url:res[0].url,
                      Avatarkey:res[0].key
                    })
                    // await NewAvatar(res[0].url,res[0].key)

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
        </div>
      </div>

        {/* Edit Bio */}
              <div className='flex flex-col gap-2 items-start text-start'>
        <label >Bio</label>
        <Textarea onChange={(e)=>{setBio(e.target.value)}} value={bio} maxLength={156} className='w-full rounded-sm h-[50px]' />
        </div>

              {/* Edit gender */}

        <div className='flex gap-2 flex-col items-start text-start'>
        <label >Gender</label>
          <Select onValueChange={(e)=>{setGender(e)}} >
            <SelectTrigger value={gender}   className="w-full h-[80px]  rounded-sm">
              <SelectValue placeholder={props.gender}   />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="bi">Bi</SelectItem>
              <SelectItem value="trans">Trans</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div className='flex flex-rox justify-end w-full'>
          <Button onClick={()=>{
            Edit.mutate()
            queryClient.resetQueries({ queryKey: ['user',] })
          }} className='bg-[#0095F6] text-white'>Submit</Button>
        </div>
      

    </div>
  )
}

export default Edit
