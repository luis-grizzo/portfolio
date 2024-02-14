'use client'

import { useState, cloneElement } from 'react'
import Link from 'next/link'
import { MdMenu } from 'react-icons/md'

import { Button, Logo, Portal, Menu } from '@/components'

import { socialMedias, getSocialMedia } from '@/utils/socialMedias'

export default function RootLayoutClient({
  children
}: {
  children: React.ReactNode
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const linkedIn = getSocialMedia('linkedin')

  return (
    <>
      <nav className="flex justify-between items-center pt-6 min-h-[8rem] lg:min-h-[16.666667%] lg:pt-0 lg:h-1/6">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex justify-end items-center gap-x-7 xsm:gap-x-8">
          <Button variant="ghost" onClick={() => setMenuIsOpen(true)}>
            <MdMenu size={28} />
          </Button>
        </div>
      </nav>

      {children}

      <footer className="flex flex-wrap justify-center md:justify-between items-center gap-6 min-h-[8rem] lg:min-h-[16.666667%] lg:h-1/6 pb-6 lg:pb-0 text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
        <span className="text-base text-center md:text-left">
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

        <div className="flex flex-wrap  justify-center items-center gap-4">
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

      <Portal>
        <Menu isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
      </Portal>
    </>
  )
}
