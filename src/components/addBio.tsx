
import Image from "next/image";
import { Textarea } from "./ui/textarea";



const AddBio = (props:{src:string}) => {
  return (
    <div className='flex flex-row h-full gap-4 justiy-between w-full '>
        <div className="w-[50%] h-full relative">
        <Image fill={true}
    style={{ objectFit: 'cover' }} className="w-full h-full" src={props.src} alt="" />
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
