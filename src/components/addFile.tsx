/* eslint-disable react/jsx-no-undef */
'use client'
/* eslint-disable react/no-unescaped-entities */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ReactNode, useEffect } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useDropzone } from "@uploadthing/react/hooks";
import { useState, useCallback } from "react";
import StepComponent from "./process";
import { setSeconds } from "date-fns";
import toast from "react-hot-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
    children: ReactNode;
  }




  
  const AddFile: React.FC<Props> =   ({ children }) => {

    const [bio,setBio]=useState("");

    const [files, setFiles] = useState<File[]>([]);
    const [croppedImage, setCroppedImage] = useState<string>("");

    
      
    function Title(){

      if(step==1){
      return "Crop";
    }else if(step==2){
      return "Filter"
    }else{
      return "Publish"
    }
    }
    
   
    
   // we  get the image here , from the input 
      const {getRootProps, getInputProps} = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
      });

    const [step,setStep]=useState(1);
    const [open, setOpen] = useState(false);

    

    function handleChange(){
      if(open!){
          setOpen(false)
          setStep(1)
          setFiles([])
        
      }else{
        setOpen(true)
      }
    }

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
        fetchImageAsBlob(croppedImage)
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
  
    // when the image is cropped we need too create a new image from it and assign

  return (
    <Dialog open={open} onOpenChange={handleChange}>
        <DialogTrigger className="flex w-full">
            {children}
        </DialogTrigger>
        <DialogContent className={`flex ${step==2? 'max-w-[1000px]':''} ${step==3? 'max-w-[900px]':''}  flex-col  ${files.length==0 ? 'h-[40%]' : 'h-[80%]'} w-full justify-start items-center content-center text-center`}>
            {
              files.length>0 ? 
              <>
              <DialogHeader className=" font-normal  flex-row justify-between w-full text-xs from-neutral-50">
              <svg  onClick={()=>{
                if(step==1){
                  setFiles([])
                }
                setStep(prev=>prev-1)
               }} aria-label="Back" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>  
              <DialogTitle>
               
            {Title()}
            </DialogTitle>

              <span className="cursor-pointer" 
              onClick={()=>{
                if(step>3){
                  console.log("here 4")
                  beginUpload.mutate()
                  setOpen(false)
                }
                setStep(prev=>prev+1)
              }}>{step>=3 ? "Publish" :"Next"}</span>
              </DialogHeader>
              <div className="relative h-[90%] w-full">
                <StepComponent step={step}  croppedImage={croppedImage} setCroppedImage={setCroppedImage} bio={bio} setBio={setBio}  setFiles={setFiles}  preview={files[0].preview}  />
              </div>
             
              </>
              :<><DialogHeader>
              <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <Separator />
          <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>

            <div className="cursor-pointer" {...getRootProps()}>
                <input className="cursor-pointer" {...getInputProps()} />
                <div>
                  { (
                    <Button >
                      Upload  
                    </Button>
                  )}
                </div>
                <h1>Drag photos and videos here</h1>
            </div></>
            }
            
        </DialogContent>
    </Dialog>
  );
};

export default AddFile;