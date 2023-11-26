import React, { ReactNode } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { useToast } from './ui/use-toast';


interface Props {
    children: ReactNode;
    username:string
    }
const AlertBlock: React.FC<Props> = ({children,username}) => {
    const {toast} = useToast()
    const queryClient = useQueryClient();
    const mutateFollow = useMutation({
        mutationFn: async (id:string) => {
        await axios.delete(`/api/follow?=${id}`)
        await axios.post(`/api/block?p=${id}`)
        },
        onError: () => {
          // reset current vote
        return toast({
            title: 'Something went wrong.',
            variant: 'destructive',
        })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['followerslist',] })
            queryClient.refetchQueries({queryKey:['followerslist']})
            return toast({
                title: `You now blocked ${username}`,
                description: 'Your follow was  registered. ',
            })
        }
      }) 
    
    return (
        <div>
        <AlertDialog >
        <AlertDialogTrigger className='w-full'>{children}</AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>{`Are you absolutely sure you want to block ${username} ?`}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Block</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

    </div>
  )
}

export default AlertBlock



