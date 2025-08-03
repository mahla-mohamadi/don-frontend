import { SVGNext, SVGReset } from '@/app/svg'
import React from 'react'

export default function NextBtn() {
  return (
    <button onClick={``} className='w-[84px] h-[84px] rounded-full bg-white flex justify-center items-center p-[7px] shadow-2xl'>
        <SVGNext className='border w-[70px] h-[70px] p-2 rounded-full flex justify-center items-center' />
    </button>
  )
}
