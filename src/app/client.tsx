'use client'

import { cloneElement, useState } from 'react'
import Link from 'next/link'
import { MdMenu } from 'react-icons/md'

import { socialMedias, getSocialMedia } from '@/shared/constants'

import { Button, Logo, Menu } from '@/components'

export default function Client({ children }: { children: React.ReactNode }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const linkedIn = getSocialMedia('linkedin')

  return (
    <>
      <nav className="flex justify-between items-center h-1/6">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex justify-between items-center gap-x-4">
          <Button variant="ghost" onClick={() => setMenuIsOpen(true)}>
            <MdMenu size={30} />
          </Button>
        </div>
      </nav>

      <main className="w-full h-4/6">
        <div className="grid grid-cols-[calc(40%_-_25px)_calc(60%_-_25px)] h-full gap-12">
          {children}
        </div>
      </main>

      <footer className="flex flex-row justify-between items-center h-1/6 text-neutral-800">
        <span className="text-base">
          Developed by{' '}
          <a
            href={linkedIn?.url}
            target="_blank"
            className="text-pink-600 font-bold hover:text-pink-900 transition-colors"
          >
            Luís Grizzo
          </a>
          . All rights reserved.
        </span>

        <div className="flex flex-row justify-between items-center gap-x-4">
          {socialMedias.map((socialMedia) => (
            <a
              key={socialMedia.name}
              href={socialMedia.url}
              target="_blank"
              className="hover:text-pink-600 transition-colors"
            >
              {cloneElement(socialMedia.icon, { size: 25 })}
            </a>
          ))}
        </div>
      </footer>

      <Menu isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
    </>
  )
}
