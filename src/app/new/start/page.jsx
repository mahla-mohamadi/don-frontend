'use client'
import React, { useEffect, useState } from 'react'
import NextBtn from '@/app/components/ui/gameCard/nextBtn'
import ResetBtn from '@/app/components/ui/gameCard/resetBtn'
import RollHeader from '@/app/components/ui/deck/rollHeader'
import axios from "axios";




export default function page() {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
   


  useEffect(() => {
      axios.get('https://api.donplay.ir/api/scenario')
        .then(function (response) {
          // handle success
          setCards(response.data.data);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
      });
  }, []);

   function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }
   function handleReset() {
    setCurrentIndex(0);
  }
   const card = cards[currentIndex];

  return (
    <div className='w-full h-screen  relative'>
      {card ? (
      <img className='flex w-full h-full object-cover' src={card.images?.[0]?.original} alt="" />
      ) : (
         <p className="text-white">در حال بارگذاری...</p>
      )}
      <header className='absolute right-6 top-6 z-10'>
          <ResetBtn onClick={handleReset}/>
      </header>
     <div className='w-full h-[260px] pt-10 absolute top-0 left-[40%] inset-0 bg-gradient-to-b from-[#322E23e5] to-transparent'>
      <RollHeader card={card} currentIndex={currentIndex} total={cards.length}/>
     </div>
      <div className='absolute left-[39%] bottom-[135px] z-10'>
          <NextBtn onClick={handleNext}/>
      </div>

    </div>
  )
}
