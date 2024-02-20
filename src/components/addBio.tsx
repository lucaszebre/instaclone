import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Usered } from "@/types";



const AddBio = (props:{src:string,preview:string,setBio:Dispatch<SetStateAction<string>>,bio:string,step:number}) => {

  const [imageStyle, setImageStyle] = useState({});

  const [files, setFiles] = useState<File[]>([]);

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
        // console.error(error)
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

  async function fetchImageAsBlob(url:string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }

  const beginUpload = useMutation({
    mutationFn: async () => {
      fetchImageAsBlob(props.src)
      .then(async blob => {
        if (blob) {
          // Now you have the blob object, you can upload it to the server
          let data = new File([blob], "haha.png", { type: "image/png" });
          console.log(data)
          await startUpload([data]); // here
        } else {
          console.log('Failed to fetch image as blob.');
        }
      });

    
    },
    onError: () => {

    console.log("errors")
    },
    onSuccess:()=>{

    }
  }) 

 useEffect(()=>{
  return(
    ()=>{
        console.log("here 4")
        beginUpload.mutate()
  
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
        <Textarea value={bio} cols={20} rows={14}  onChange={(e)=>{setBio(e.target.value)}}></Textarea>
            
            
        </div>
    </div>
  ) 
};

export default AddBio;
