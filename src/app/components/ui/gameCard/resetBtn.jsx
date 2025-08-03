import { SVGReset } from '@/app/svg'
import React from 'react'

export default function ResetBtn() {
  return (
    <button onClick={``} className='w-[45px] h-[45px] rounded-full bg-[#D52A2A] text-white flex justify-center items-center'>
      <SVGReset />
    </button>
  )
}

