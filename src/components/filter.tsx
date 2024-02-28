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
    const [imageStyle, setImageStyle] = useState({
     
      filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
    });


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
   
    useEffect(() => {
      setImageStyle({
        ...imageStyle,
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
      });
    }, [luminosity, contrast, fade, saturation, temp, vignette]);

   
      const Aden = {
        filter: `sepia(.2) brightness(1.15) saturate(1.4)`,
      };
      
      const Clarendon = {
        filter: `sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)`,
      };
      
      const Crema = {
        filter: `sepia(.5) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-2deg)`,
      };
      
      const Gingham = {
        filter: `contrast(1.1) brightness(1.1)`,
      };
      
      const Juno = {
        filter: `sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)`,
      };
      
      const Lark = {
        filter: `sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)`,
      };
      
      const Ludwig = {
        filter: `sepia(.25) contrast(1.05) brightness(1.05) saturate(2)`,
      };
      
      const Moon = {
        filter: `brightness(1.4) contrast(.95) saturate(0) sepia(.35)`,
      };
      
      const Perpetua = {
        filter: `contrast(1.1) brightness(1.25) saturate(1.1)`,
      };
      
      const Reyes = {
        filter: `sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)`,
      };
      
      const Slumber = {
        filter: `sepia(.35) contrast(1.25) saturate(1.25)`,
      };

      const applyFilter = (filterStyle:any) => {
        setImageStyle({ objectFit: "cover", ...filterStyle });
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

          style={{  ...imageStyle }}
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
        <div 
        onClick={
          ()=>{
          applyFilter(Aden)
        }
        } 
        className="flex cursor-pointer cursor-pointer flex-col justify-start items-center">
            <img style={{ objectFit: 'cover', ...Aden }}  width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div   onClick={
          ()=>{
          applyFilter(Clarendon)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img style={{ objectFit: 'cover', ...Clarendon }}  width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Clarendon</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Crema)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img style={{ objectFit: 'cover', ...Crema }}  width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Crema</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div onClick={
          ()=>{
          applyFilter(Gingham)
        }
        }  className="flex cursor-pointer flex-col justify-start items-center">
            <img style={{ objectFit: 'cover', ...Gingham }}  width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Gingham</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Juno)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img style={{ objectFit: 'cover', ...Juno }} width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Juno</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Lark)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img style={{ objectFit: 'cover', ...Lark }} width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Lark</span>
        </div>
    </div>
    <div onClick={
          ()=>{
          applyFilter(Ludwig)
        }
        }  className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img style={{ objectFit: 'cover', ...Ludwig }} width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Ludwig</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Moon)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} style={{ objectFit: 'cover', ...Moon }} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Moon</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Original</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div onClick={
          ()=>{
          applyFilter(Perpetua)
        }
        }  className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} style={{ objectFit: 'cover', ...Perpetua }} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Perpetua</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Reyes)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} style={{ objectFit: 'cover', ...Reyes }} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Reyes</span>
        </div>
        <div onClick={
          ()=>{
          applyFilter(Slumber)
        }
        }  className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} style={{ objectFit: 'cover', ...Slumber }} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
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
