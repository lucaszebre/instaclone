import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
const optionFeed = ({children:React.node}) => {
  return (
    <div>
       <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
              
            </DialogContent>
            </Dialog>
    </div>
  )
}

export default optionFeed
