"use client"

/* eslint-disable react/jsx-no-undef */
import React from 'react'
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

const Setting = (props:{
  urlavatar?:string,
  username?:string,
  fullname?:string
  bio?:string
  gender?:string
}) => {
  const {toast} = useToast()

  return (
    <div className='flex w-full h-full max-w-[650px] gap-3 p-4 flex-col justify-between'>
      <span>
        Edit Profile
      </span>
      <div className='flex flex-row items-center p-4 justify-between w-full light: dark:bg-[#363636] h-[88px] rounded-md'>
        {/* Edit avatar */}
        <div className='flex flex-row justify-start gap-3'>
          <Avatar>
            <AvatarImage className='w-[200px] h-[200px]' src={props.urlavatar} />
            <AvatarFallback className='h-[200px] w-[200px'>{props.username}</AvatarFallback>
          </Avatar>
          <div className='flex flex-row justify-between '>
            <h1>{props.username}</h1>
            <p>{props.fullname}</p>
          </div>
        </div>
        <div>
        <Button onClick={()=>{
        async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], 'imageUploader')

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  }
                },}}>
        Change the photos
        </Button>
          <UploadButton
          
              className='bg-[#0095F6] rounded-sm p-2 text-white'
              endpoint="imageUploader"
              appearance={button:{
              
              }}
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
        </div>
      </div>

        {/* Edit Bio */}

      <div className='flex flex-col gap-2 items-start text-start'>
      <label >Bio</label>
      <Textarea  maxLength={156} className='w-full rounded-sm h-[50px]' />
      </div>

            {/* Edit gender */}

      <div className='flex gap-2 flex-col items-start text-start'>
      <label >Gender</label>
        <Select >
          <SelectTrigger className="w-full h-[80px]  rounded-sm">
            <SelectValue defaultValue={"Female"} placeholder='Female' />
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
        <Button className='bg-[#0095F6] text-white'>Submit</Button>
      </div>

    </div>
  )
}

export default Setting
