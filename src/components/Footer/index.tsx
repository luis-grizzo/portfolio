'use client'

import { cloneElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { socialMediasArray } from '@/constants/social-medias'

import { defaultTransition } from '@/utils/animations'

import logo from '@public/logo.svg'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="border-t-1 border-neutral-400/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={defaultTransition}
    >
      <div className="flex items-center justify-between container mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          {socialMediasArray.map((socialMedia) => (
            <Link
              key={socialMedia.name}
              href={socialMedia.url}
              target="_blank"
              title={socialMedia.name}
              className="text-sm text-white hover:text-neutral-400 transition-colors"
            >
              {cloneElement(socialMedia.icon, { size: 20 })}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Image src={logo} alt="" className="w-6 aspect-square" />

          <span className="text-base">&copy; {currentYear}</span>
        </div>
      </div>
    </motion.footer>
  )
}
