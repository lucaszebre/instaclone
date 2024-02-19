// import AnotherComponent from './AnotherComponent'; // Import AnotherComponent if needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';




const Filter = (props:{src:string,setCroppedImage: Dispatch<SetStateAction<string>>}) => {

    const [luminosity, setLuminosity] = useState([33]);
    const [contrast, setContrast] = useState([33]);
    const [fade, setFade] = useState([33]);
    const [saturation, setSaturation] = useState([33]);
    const [temp, setTemp] = useState([33]);
    const [vignette, setVignette] = useState([33]);
    const imageRef = useRef<HTMLImageElement>(null);



    const imageStyle = {
        filter: `brightness(${luminosity[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) sepia(${fade[0]}%) hue-rotate(${temp[0]}deg)`,
        // boxShadow: `0 0 10px rgba(0, 0, 0, ${vignette[0] / 100})`
      };


      useEffect(() => {
        handleDownloadImage();
        localStorage.setItem('filter', JSON.stringify(imageStyle));
        return () => {
          handleDownloadImage();
        };
      }, [imageStyle]);

    const handleDownloadImage = () => {
        console.log(imageRef.current)
        if(imageRef.current){
            console.log("wala")
            html2canvas(imageRef.current).then( canvas => {
                const dataUrl =  canvas.toDataURL('image/png');
                props.setCroppedImage(dataUrl);
              }).catch(error => {
                console.error('Oops, something went wrong!', error);
              });
        }
     
      };

  

  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div  className="w-[50%] h-full relative">
        <Image id="image"   fill={true}                  ref={imageRef}

          style={{ objectFit: 'cover', ...imageStyle }}
          className="w-full h-full" src={props.src} alt="" />
            </div>
        <div className="w-[50%]">

               
        <Tabs defaultValue="register" className="max-w-full w-full">
  <TabsList>
    <TabsTrigger value="filter">Filter</TabsTrigger>
    <TabsTrigger value="setting">Setting</TabsTrigger>
  </TabsList>
  <TabsContent className="w-full" value='filter'>
    <div className="flex w-full flex-col justify-start" >
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flexcursor-pointer cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
    </div>
    <div className="flex w-full gap-2 flex-row justify-between">
        <div className="flex cursor-pointer flex-col justify-start items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center items-center">
            <img width={150} height={150} src="https://mesinfos.fr/content/articles/383/A181383/initial-shutterstock-1082448128.jpg" alt="" />
            <span>Aden</span>
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
