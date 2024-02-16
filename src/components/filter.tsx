// import AnotherComponent from './AnotherComponent'; // Import AnotherComponent if needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Image from "next/image";



const Filter = (props:{src:string}) => {
  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div className="w-[50%] h-full relative">
        <Image fill={true}
    style={{ objectFit: 'cover' }} className="w-full h-full" src={props.src} alt="" />
            </div>
        <div className="w-[50%]">

               
        <Tabs defaultValue="register" className="max-w-full w-full">
  <TabsList>
    <TabsTrigger value="filter">Filter</TabsTrigger>
    <TabsTrigger value="setting">Setting</TabsTrigger>
  </TabsList>
  <TabsContent className="w-full" value='filter'>
    <div className="flex w-full flex-col justify-start" >
    <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col justify-start items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
    </div>
    <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col justify-start items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
    </div>
    <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col justify-start items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
        <div className="flex flex-col justify-center items-center">
            <img width={50} height={50} src="" alt="" />
            <span>Aden</span>
        </div>
    </div>
</div>
</TabsContent>
  <TabsContent className="w-full" value='setting'>
    <div className="flex w-full flex-col justify-start gap-4" >
        <div className="flex w-full flex-col gap-3">
            <p>Luminosity</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-3">
            <p>Contrast</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-3">
            <p>Fade</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-3">
            <p>Saturation</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-3">
            <p>Temp</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-3">
            <p>Vignette</p>
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>
    </div>
</TabsContent>
</Tabs>
            
            
        </div>
    </div>
  ) 
};

export default Filter;
