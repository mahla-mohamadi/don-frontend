'use client'
import { SVGReset } from '@/app/svg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ResetBtn({ href = '/' }) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setIsNavigating(true)
  }

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        router.push(href)
      }, 0) // Using minimal delay
      return () => clearTimeout(timer)
    }
  }, [isNavigating, href, router])

  return (
    <a
      href={href}
      onClick={handleClick}
      className='w-[40px] h-[40px] rounded-full bg-[#D52A2A] text-white flex justify-center items-center cursor-pointer fixed right-[15px] top-[15px] z-50'
    >
      <SVGReset />
    </a>
  )
}