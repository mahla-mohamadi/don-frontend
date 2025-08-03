import React from 'react'
import ResetBtn from '../gameCard/resetBtn'

export default function SeeRoll() {
  return (
    <div className='bg-[url(/img/bg.png)] w-full h-screen'>
      <header className='pt-9 pr-8'>
        <ResetBtn />
      </header>
      <figure className='w-full h-[90%] mx-auto flex justify-center items-center px-[80px] py-[270px]'>
       <img className='w-[200px] h-[200px]' src="/img/donClub.png" alt="logo" />
      </figure>
    </div>
  )
}
