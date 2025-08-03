import React from 'react';

export default function RollHeader({ card, currentIndex, total }) {
  if (!card) return null;

  return (
    <div className='w-full text-center'>
      <h2 className='text-[30px] font-extrabold mb-1 text-white'>{card.name}</h2>
      <h4 className='text-[12px] font-semibold mb-1 text-[#E6E6E6] tracking-1'>{card.slug}</h4>
      <p className='text-[10px] text-white'>نقش {currentIndex + 1} از {total}</p>
    </div>
  );
}