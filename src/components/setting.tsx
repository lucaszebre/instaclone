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
    <div className='flex flex-col justify-start'>
      <span>
        Edit Profile
      </span>
      <div className='flex flex-row justify-between w-full bg-gray-300 h-[80px] rounded-md'>
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
        <Button>Change button</Button>
      </div>

        {/* Edit Bio */}

      <div className='flex flex-col items-start text-start'>
      <label >Bio</label>
      <Textarea  className='w-full rounded-sm h-[50px]' />
      </div>

            {/* Edit gender */}

      <div className='flex flex-col items-start text-start'>
      <label >Gender</label>
        <Select >
          <SelectTrigger className="w-full h-[80px] bg-gray-50 rounded-sm">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

      </div>
      <div className='flex flex-rox justify-end w-full'>
        <Button>Submit</Button>
      </div>

    </div>
  )
}

export default Setting
