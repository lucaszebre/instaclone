import { Skeleton } from "@/components/ui/skeleton"

    export function FeedPostLoader() {
    return (
<>  
        <div className='flex flex-col  w-full h-screen gap-13 justify-between max-h-[800px]  max-w-[470px]'>
            <header className='flex flex-row justify-between mb-6 content-center h-[32px]'>
                <div className='flex flex-row justify-start content-center gap-2'>
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>
            </header>
        <div className='flex flex-col relative  w-screen h-screen max-w-[468px] max-h-[400px] '>
        <Skeleton className="h-full w-full" />
        </div>
    </div>
</>

    )
    }