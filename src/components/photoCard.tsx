import Image from 'next/image'
import React from 'react'

const photoCard = (props:{image:string,like:string,comment:string,imgdescription:string}) => {
  return (
    <div className='w-full h-full'>
        <div>
            
        </div>
      <Image src={props.image}  alt={props.imgdescription} />
    </div>
  )
}

export default photoCard
