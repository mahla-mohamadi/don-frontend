'use client'
import { SVGNext, SVGReset } from '@/app/svg'
import React from 'react'

export default function NextBtn({onClick}) {
  return (
    <button onClick={onClick} className='animate-bounce animate-infinite animate-duration-[5000ms] animate-delay-[1ms] animate-ease-linear w-[84px] h-[84px] rounded-full bg-white flex justify-center items-center p-[7px] shadow-2xl cursor-pointer fixed left-0 right-0 bottom-[140px] m-auto'>
        <SVGNext className='border-2 w-[70px] h-[70px] p-2 rounded-full flex justify-center items-center' />
    </button>
  )
}
