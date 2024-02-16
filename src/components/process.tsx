import { FC, useState } from 'react';
import Cropper from 'react-easy-crop';
import Filter from './filter';
import getCroppedImg from '@/lib/crop'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Slider } from './ui/slider';
import addBio from './addBio';
import AddBio from './addBio';



const StepComponent = (props:{ step: number,  preview: string  }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [value, setValue] = useState(0);
    const [aspect, setAspect] = useState(1/1);
    const [croppedImage, setCroppedImage] = useState(null);
 
    const onCropComplete = async (croppedArea:number, croppedAreaPixels:number) => {
        console.log(croppedArea, croppedAreaPixels)

        const croppedImage = await getCroppedImg(
            props.preview,
            croppedAreaPixels,
            0
          )
          setCroppedImage(croppedImage)

      }

    if (props.step === 1) {
    return (
        <>
      <Cropper
        image={props.preview}
        crop={crop}
        zoom={value}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <Popover >
      <PopoverTrigger>
      <div className="p-[8px] absolute bottom-3 left-10">
        <svg aria-label="Select zoom" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Select zoom</title><path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z"></path></svg>
      </div>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <Slider onValueChange={(e)=>{setValue(e)}} defaultValue={[0]} max={30} step={1} />
      </PopoverContent>
    </Popover>
    <Popover >
      <PopoverTrigger>
      <div className="p-[8px] absolute bottom-3 left-3">
        <svg aria-label="Select crop" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Select crop</title><path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path></svg>
      </div>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <div>
          <div onClick={()=>{
            setAspect(1/1)
          }} 
          className="flex flex-row justify-center cursor-pointer">
            1/1
          </div>
          <div onClick={()=>{
            setAspect(4/5)
          }}  className="flex flex-row justify-center cursor-pointer" >
            4 : 5
          </div>
          <div onClick={()=>{
            setAspect(16/9)
          }}  className="flex flex-row justify-center border-white cursor-pointer">
            16 : 9
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </>
    );
  } else if (props.step === 2) {
    return (
       <Filter  src={croppedImage||""} />
    )
  } else if(props.step==3) {
    return (
    <AddBio src={croppedImage||""}  />
    ) 
  }
};

export default StepComponent;

  