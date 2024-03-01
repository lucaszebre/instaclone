import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Usered } from "@/types";
import InputEmoji from 'react-input-emoji'



const AddBio = (props:{src:string,preview:string,setBio:Dispatch<SetStateAction<string>>,bio:string,step:number}) => {

  const [imageStyle, setImageStyle] = useState({});
  
  useEffect(() => {
    const style = localStorage.getItem('filter');
    if (style) {
      setImageStyle(JSON.parse(style));
    }
  }, [])


  const {
    isFetching,
    data,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/user');
      const {User}= data.data ;

      return User as Usered
    },
    queryKey: ['user'],
    enabled:true
  })

  useEffect(()=>{
    return(
      ()=>{
        setImageStyle({})
      }
    )
  },[])
 
      
      
  
      


  
  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div className="w-[50%] h-full relative">
        <Image fill={true}
   style={{ objectFit: 'cover', ...imageStyle }} className="w-full h-full" src={props.src} alt="" />
            </div>
        <div className="w-[50%]">

               
        <div>

        </div>
     
        <div className='flex flex-row mb-4 justify-start gap-2'>
                                    <Avatar className='max-w-[200px] max-h-[200px]'>
                                        <AvatarImage className='w-[200px] h-[200px]' src={data?.profilePictureUrl?data.profilePictureUrl:""} />
                                        <AvatarFallback className='h-[200px] w-[200px'>{data?.fullName}</AvatarFallback>
                                    </Avatar>
                                    <span>{data?.username}</span>
                                </div>
        <Textarea value={props.bio} cols={20} rows={14}  onChange={(e)=>{props.setBio(e.target.value)}}></Textarea>
        {/* <InputEmoji
                            inputClass=''
                            value={props.bio}
                            onChange={props.setBio}
                            placeholder="Type a message"
                        /> */}
            
        </div>
    </div>
  ) 
};

export default AddBio;
