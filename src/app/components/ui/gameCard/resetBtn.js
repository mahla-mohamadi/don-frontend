'use client'
import { SVGReset } from '@/app/svg'
import Link from 'next/link'
export default function ResetBtn({href='/'}) {
  return (
    <Link href={href} className='w-[40px] h-[40px] rounded-full bg-[#D52A2A] text-white flex justify-center items-center cursor-pointer fixed right-[15px] top-[15px] z-50'>
      <SVGReset />
    </Link>
  )
}

