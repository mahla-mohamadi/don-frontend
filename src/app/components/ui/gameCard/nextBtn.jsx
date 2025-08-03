'use client'
import { SVGNext, SVGReset } from '@/app/svg'
import React from 'react'

export default function NextBtn() {
  return (
    <button onClick={()=>console.log('hi')} className='w-[84px] h-[84px] rounded-full bg-white flex justify-center items-center p-[7px] shadow-2xl cursor-pointer'>
        <SVGNext className='border-2 w-[70px] h-[70px] p-2 rounded-full flex justify-center items-center' />
    </button>
  )
}
