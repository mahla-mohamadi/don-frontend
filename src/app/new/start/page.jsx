import React from 'react'
import NextBtn from '@/app/components/ui/gameCard/nextBtn'
import ResetBtn from '@/app/components/ui/gameCard/resetBtn'
import RollHeader from '@/app/components/ui/deck/rollHeader'




export default function page() {
  return (
    <div className='w-full h-screen  relative'>
      <img className='flex w-full h-full object-cover' src="/img/domy.png" alt="" />
      <header className='absolute right-6 top-6 z-10'>
          <ResetBtn />
      </header>
     <div className='w-full h-[260px] pt-10 absolute top-0 left-[40%] inset-0 bg-gradient-to-b from-[#322E23e5] to-transparent'>
      <RollHeader />
     </div>
      <div className='absolute left-[39%] bottom-[135px] z-10'>
          <NextBtn />
      </div>

    </div>
  )
}
