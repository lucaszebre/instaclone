/* eslint-disable react/jsx-no-undef */
import React from 'react'
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

const Setting = (props:{
  urlavatar:string,
  username:string,
  fullname:string
}) => {
  return (
    <div className='flex w-full h-full max-w-[650px] gap-3 p-4 flex-col justify-between'>
      <span>
        Edit Profile
      </span>
      <div className='flex flex-row items-center p-4 justify-between w-full light: dark:bg-[#363636] h-[88px] rounded-md'>
        {/* Edit avatar */}
        <div className='flex flex-row justify-start gap-3'>
          <Avatar className='max-w-[200px] max-h-[200px]'>
            <AvatarImage className='w-[200px] h-[200px]' src={props.urlavatar} />
            <AvatarFallback className='h-[200px] w-[200px'>{props.username}</AvatarFallback>
          </Avatar>
          <div className='flex flex-row justify-between '>
            <h1>{props.username}</h1>
            <p>{props.fullname}</p>
          </div>
        </div>
        <Button className='bg-[#0095F6] text-white'>Change photo</Button>
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
