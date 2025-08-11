'use client';

export default function PlayerRole({title='دن' , number='1' , englishTitle='GODFATHER'}) {
  return (
    <div className='bg-[url(/img/rolebg.jpg)] p-[6px] flex flex-wrap relative justify-start gap-[12px] items-center rounded-[10px] overflow-hidden w-full after:absolute after:bg-[#FFFFFF33] after:left-0 after:right-0 after:bottom-0 after:top-0 after:w-full after:h-full after:z-10'>
        <span 
        className='bg-[rgba(0,0,0,0.5)] relative z-20 w-[37px] h-[37px] flex justify-center items-center rounded-full text-[20px] font-semibold text-white pt-[3px]'>
            {number}
        </span>
        <span className='text-[16px] relative z-30 text-[#4B4030]'>{title}</span>
        <span className='text-[22px] z-20 text-[#DDD4C6] h-[30px] tracking-1 mr-auto font-semibold absolute left-[6px] top-0 bottom-0 m-auto'>{englishTitle}</span>
    </div>
  )
}
