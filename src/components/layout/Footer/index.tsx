'use client'

import Link from 'next/link'

import { Logo } from '@/components/base/Logo'

import { socialMedias } from '@/constants/social-medias'
import { cloneElement } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-1 border-neutral-400/10">
      <div className="flex items-center justify-between container mx-auto px-4 py-8">
        <div className="flex items-center gap-2">
          {socialMedias.map((socialMedia) => (
            <Link
              key={socialMedia.name}
              href={socialMedia.url}
              target="_blank"
              title={socialMedia.name}
              className="text-sm text-white hover:text-neutral-400 transition-colors"
            >
              {cloneElement(socialMedia.icon, { size: 16 })}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Logo pathClassName="!fill-neutral-400" />

          <span className="text-base text-neutral-400">
            &copy; {currentYear}
          </span>
        </div>
      </div>
    </footer>
  )
}
