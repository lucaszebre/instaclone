"use client"
/* eslint-disable react/jsx-no-undef */
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import React, { ReactNode, useEffect, useState } from 'react'
import QRCode from "qrcode";
import dynamic from 'next/dynamic';


interface Props {
    children: ReactNode;
    url:string
    }
const QRCodeDialog: React.FC<Props> = ({ children,url}) => {
        const [DataUrl,setDataUrl]=useState("")
        const handleQRCodeGeneration = () => {
            QRCode.toDataURL(window.location.href, { width: 300 }, (err: any, dataUrl: React.SetStateAction<string>) => {
            if (err) console.error(err);
        
            // set dataUrl state to dataUrl
            setDataUrl(dataUrl);
            });
        };
        
        useEffect(()=>{
            handleQRCodeGeneration()
        },[])
    return (
        <div>
            <Dialog >
                <DialogTrigger className='w-full h-full'> 
                    {children}
    
                </DialogTrigger>
                <DialogContent className='max-w-[350px] p-8 h-full w-full flex flex-col justify-start max-h-[350px]'>
                    <Image src={DataUrl} alt="qr-code" fill  />
                </DialogContent>
            </Dialog>
        </div>
    )
}



export default dynamic (() => Promise.resolve(QRCodeDialog), {ssr: false})
