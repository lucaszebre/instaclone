"use client"

/* eslint-disable react/jsx-no-undef */
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast';
import React, {  useState } from 'react'
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import dynamic from 'next/dynamic'

const Edit = (props:{
  urlavatar?:string,
  username?:string,
  fullname?:string
  bio?:string
  gender?:string
}) => {
  const queryClient = useQueryClient();
  const [gender,setGender]=useState(props.gender)
  const [bio,setBio]=useState(props.bio)

  const Edit = useMutation({
    mutationFn: async () => {
 
      try {
        const result=   await axios.post("/api/profile",{
          bio,gender
        })      
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status == 406) {
                toast.error('need to be login to execute this action');
            }
        } else {
            console.log('An unexpected error occurred:', error);
        }
    }
    },
    onError: () => {
      toast.error('Error to edit the profile');

    },
   
    onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: [`user`] })
        toast.success("The profile has been edit sucessfully");

          }
    
    
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
                <AvatarImage src={props.urlavatar||'./icon_profile.png'} />
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

                    toast.success("Upload of the image completed");

                queryClient.resetQueries({ queryKey: ['user',] })
                }
              }}
                
                onUploadError={(error: Error) => {
                  toast.error('Error to upload the image');
                }}

                onUploadBegin={()=>{
              
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
