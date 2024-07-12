'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { useTrigger } from '@/hooks/useTrigger'

import { LinkButton } from '@/components'

import { socialMedias } from '@/constants/social-medias'

import { defaultTransition } from '@/utils/animations'

import logo from '@public/logo.svg'

export function Navbar() {
  const { setIsTemporaryOpen } = useTrigger()

  const { linkedin } = socialMedias

  function handleGoToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    setIsTemporaryOpen(true)
  }

  return (
    <motion.nav
      className="sticky top-0 flex items-center justify-between container mx-auto -mb-[114px] px-4 py-8 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={defaultTransition}
    >
      <button
        onClick={handleGoToTop}
        className="flex items-center justify-center w-[50px] aspect-square rounded-full text-base bg-neutral-900/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 transition-colors hover:bg-neutral-900/40"
      >
        {/* <Logo /> */}
        <Image src={logo} alt="" className="w-8 aspect-square" />
      </button>

      {linkedin && (
        <LinkButton href={linkedin.url} icon={linkedin.icon}>
          Get in touch
        </LinkButton>
      )}
    </motion.nav>
  )
}
