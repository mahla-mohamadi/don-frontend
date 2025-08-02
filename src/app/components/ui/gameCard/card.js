import React from 'react'
import { SVGPlay } from '@/app/svg'
import Link from 'next/link'


export default function Card({img, title}) {
  return (
    <div className='w-[30%] max-h-[190px] rounded-[14px] relative mx-auto'>
        <img className='w-full h-full object-contain  rounded-[14px] ' src={img} alt="" />
       <div className='absolute top-13 right-7'>
         <h2 className='font-extrabold text-[28px] text-[#2B3741]'>{title}</h2>
        <Link href={``} className='w-[50px] h-[50px] rounded-full bg-[#44433f] text-white flex justify-center items-center mt-10'>
        <SVGPlay />
        </Link>
       </div>

    </div>
  )
}
