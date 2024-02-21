// import AnotherComponent from './AnotherComponent'; // Import AnotherComponent if needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { modifyImageProperties } from "@/lib/modifyImage";
import { useMutation } from "@tanstack/react-query";
import { json } from "stream/consumers";




const Filter = (props:{src:string,setCroppedImage: Dispatch<SetStateAction<string>>}) => {

    const [luminosity, setLuminosity] = useState([100]);
    const [contrast, setContrast] = useState([100]);
    const [fade, setFade] = useState([0]);
    const [saturation, setSaturation] = useState([100]);
    const [temp, setTemp] = useState([0]);
    const [vignette, setVignette] = useState([0]);



    // when the compoment unmont we reset the state 
    useEffect(()=>{
      return(
        ()=>{
          setContrast([100]);
          setFade([0]);
          setSaturation([100]);
          setTemp([0]);
          setVignette([0]);
        }
      )
    },[])


    const imageStyle = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };  
      const Aden = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };  
      const Clarendon = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };  
      const Crema = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };  
      const Gingham = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };  
      const Juno = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };
      const Lark = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Ludwig = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Moon = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Original = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Perpetua = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Reyes = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      }; const Slumber = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };


      useEffect(() => {
        return () => {
           insertFilter.mutate();
           const style = localStorage.setItem('filter',JSON.stringify(imageStyle));

        };
      }, []);

 


      const insertFilter = useMutation({
        mutationFn: async () => {
          const urlWithFilter =await modifyImageProperties(props.src,imageStyle.filter);
          props.setCroppedImage(urlWithFilter?urlWithFilter:"");
        },
        onError: () => {
        
        },
        onSuccess:()=>{

        }
      }) 

  

  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div  className="w-[50%] h-full relative">
        <Image id="image"   fill={true}                  

          style={{ objectFit: 'cover', ...imageStyle }}
          className="w-full h-full" src={props.src} alt="" />
            </div>
        <div className="w-[50%] overflow-y-scroll mb-4 p-4">

               
        <Tabs defaultValue="filter" className=" w-full">
  <TabsList>
    <TabsTrigger value="filter">Filter</TabsTrigger>
    <TabsTrigger value="setting">Setting</TabsTrigger>
  </TabsList>
  <TabsContent className="w-full   relative" value='filter'>
    <div className="flex w-full flex-col  relative	 justify-start" >
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Clarendon</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Crema</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Gingham</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Juno</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Lark</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Ludwig</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Moon</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Original</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Perpetua</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Reyes</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Slumber</span>
        </div>
    </div>
</div>
</TabsContent>
  <TabsContent className="w-full" value='setting'>
    <div className="flex w-full flex-col justify-start gap-4" >
    <div className="flex w-full flex-col gap-3">
                <p>Luminosity</p>
                <Slider value={luminosity} onValueChange={(e)=>setLuminosity(e)} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-3">
                <p>Contrast</p>
                <Slider value={contrast} onValueChange={(e)=>setContrast(e)} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-3">
                <p>Fade</p>
                <Slider value={fade} onValueChange={e=>setFade(e)} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-3">
                <p>Saturation</p>
                <Slider value={saturation} onValueChange={(e)=>setSaturation(e)} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-3">
                <p>Temp</p>
                <Slider value={temp} onValueChange={(e)=>setTemp(e)} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-3">
                <p>Vignette</p>
                <Slider value={vignette} onValueChange={(e)=>{setVignette(e)}} max={100} step={1} />
              </div>
    </div>
</TabsContent>
</Tabs>
            
            
        </div>
    </div>
  ) 
};

export default Filter;
