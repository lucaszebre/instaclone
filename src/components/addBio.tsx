
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import style from "styled-jsx/style";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import axios from "axios";
import toast from "react-hot-toast";



const AddBio = (props:{src:string}) => {

  const [imageStyle, setImageStyle] = useState({});

  
  const [bio,setBio]=useState("");


  const queryClient = useQueryClient()
  
  const { startUpload, permittedFileInfo, } = useUploadThing(
    "imageUploader",
    {
      
      onClientUploadComplete: async (res) => {
        // Do something with the response
        if(res){
        
          await axios.post('/api/post/',{
            url:res[0].url,filekey:res[0].key,bio
          })
          toast.success("Just post a post '_'")
      queryClient.refetchQueries({ queryKey: [`user`] })

      }}
      ,
      onUploadError: () => {
        
      toast.error("Error to upload the image")

      },
      onUploadBegin: () => {
        // toast.loading("Image is starting to upload")
        
      },
    },
  );

  useEffect(() => {
    const style = localStorage.getItem('filter');
    if (style) {
      setImageStyle(JSON.parse(style));
    }
  }, [])


  useEffect(()=>{
    if(step>3){
      startUpload(file);
    }
  })
  
  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div className="w-[50%] h-full relative">
        <Image fill={true}
   style={{ objectFit: 'cover', ...imageStyle }} className="w-full h-full" src={props.src} alt="" />
            </div>
        <div className="w-[50%]">

               
        <div>

        </div>
        <Textarea></Textarea>
            
            
        </div>
    </div>
  ) 
};

export default AddBio;
