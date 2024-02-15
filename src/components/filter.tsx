// import AnotherComponent from './AnotherComponent'; // Import AnotherComponent if needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const Filter = () => {
  return (
    <div className='flex flex-row justiy-between w-full relatives'>
        <img className='w-full h-full' src="" alt="" />
        <div>

               
        <Tabs defaultValue="register" className="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="filter">Filter</TabsTrigger>
    <TabsTrigger value="setting">Setting</TabsTrigger>
  </TabsList>
  <TabsContent value='filter'>
    <div className="flex  flex-col justify-start" >
    <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center items-center">
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
  <TabsContent value='setting'>
    <div >

</div></TabsContent>
</Tabs>
            
            
        </div>
    </div>
  ) 
};

export default Filter;
