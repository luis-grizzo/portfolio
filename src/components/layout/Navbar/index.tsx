'use client'

import { motion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa6'

import { LinkButton, Logo } from '@/components/base'

import { socialMedias } from '@/constants/social-medias'

import { defaultTransition } from '@/utils/animations'

export function Navbar() {
  const linkedin = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'linkedin'
  )

  function handleGoToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="sticky top-0 flex items-center justify-between container mx-auto -mb-[114px] px-4 py-8 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={defaultTransition}
    >
      <button
        onClick={handleGoToTop}
        className="flex items-center gap-3 w-fit min-h-[50px] px-4 py-3 text-base bg-neutral-900/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 rounded-lg"
      >
        <Logo />
      </button>

      {linkedin && (
        <LinkButton href={linkedin.url} icon={<FaLinkedinIn />}>
          Get in touch
        </LinkButton>
      )}
    </motion.nav>
  )
}
