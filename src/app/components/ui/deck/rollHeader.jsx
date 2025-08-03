import React from 'react'

export default function RollHeader() {

     const roll ={     
       id: 1,
       title : 'بازپرس',
       titleEng : 'INVESTIGATOR',
       number : 'نقش 1 از 10',     
     }

  return (
   <div key={roll.id} className='w-full text-center '>
       <h2 className='text-[30px] font-extrabold mb-1 text-white'>{roll.title}</h2>
       <h4 className='text-[12px] font-semibold mb-1 text-[#E6E6E6] tracking-1'>{roll.titleEng}</h4>
       <p className='text-[10px] text-white'>{roll.number}</p>
   </div>
  
  )
}
