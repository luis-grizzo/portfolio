import Image from 'next/image'

import { AiOutlineLoading } from 'react-icons/ai'

import logo from '@public/logo.svg'

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 md:gap-8 lg:gap-16 h-[calc(100vh_-_114px_-_88px_-_1px)] container mx-auto mt-[114px] py-8 md:py-16 lg:py-32 px-4">
      <Image src={logo} alt="" className="w-16 aspect-square" />

      <AiOutlineLoading size={32} className="animate-spin" />
    </main>
  )
}
