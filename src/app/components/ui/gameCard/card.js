import React from 'react'
import { SVGPlay } from '@/app/svg'
import Link from 'next/link'


export default function Card({img, title , onClick , id}) {
  return (
    <div onClick={onClick} id={id} className='w-full rounded-[14px] relative overflow-hidden mx-auto cursor-pointer after'>
        <img className='w-full h-full object-contain  rounded-[14px] ' src={img} alt="" />
       <div className='absolute w-full left-0 right-0 top-0 bottom-0 flex flex-col justify-between pt-[60px] pb-[20px] pr-[24px]'>
         <h2 className='font-extrabold text-[24px] text-[#2B3741]'>{title}</h2>
        <div className='w-[40px] h-[40px] rounded-full bg-[#44433f]  text-white flex justify-center items-center'>
        <SVGPlay />
        </div>
       </div>

    </div>
  )
}
