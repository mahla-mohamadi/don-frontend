import React from 'react'
import { SVGPlay } from '@/app/svg'
import Link from 'next/link'


export default function Card({img, title , onClick , id}) {
  return (
    <div onClick={onClick} id={id} className='w-full rounded-[14px] max-h-[230px] relative overflow-hidden mx-auto cursor-pointer after:absolute after:bg-[rgba(0,0,0,0.59)] after:left-0 after:right-0 after:bottom-0 after:top-0 after:w-full after:h-full after:-z-0 after:backdrop-blur-[0.9px]'>
      <img className='w-full h-full object-cover  rounded-[14px] ' src={img} alt="" />
        <div className='absolute w-full left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center gap-[25px] z-10'>
          <h2 className='font-extrabold text-[26px] text-white'>{title}</h2>
        <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.7)]  text-[#2A2A2A] flex justify-center items-center'>
        <SVGPlay />
        </div>
      </div>
    </div>
  )
}
