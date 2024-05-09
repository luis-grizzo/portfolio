'use client'

import { motion } from 'framer-motion'

import { useTrigger } from '@/hooks/useTrigger'

import { LinkButton, Logo } from '@/components/base'

import { socialMedias } from '@/constants/social-medias'

import { defaultTransition } from '@/utils/animations'

export function Navbar() {
  const { setIsTemporaryOpen } = useTrigger()

  const linkedin = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'linkedin'
  )

  function handleGoToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    setIsTemporaryOpen(true)
  }

  const MotionLinkButton = motion(LinkButton)

  return (
    <nav className="sticky top-0 flex items-center justify-between container mx-auto -mb-[114px] px-4 py-8 z-50">
      <motion.button
        onClick={handleGoToTop}
        className="flex items-center justify-center w-[50px] aspect-square rounded-full text-base bg-neutral-900/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 transition-colors hover:bg-neutral-900/40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={defaultTransition}
      >
        <Logo />
      </motion.button>

      {linkedin && (
        <MotionLinkButton
          href={linkedin.url}
          icon={linkedin.icon}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...defaultTransition, delay: 0.2 }}
        >
          Get in touch
        </MotionLinkButton>
      )}
    </nav>
  )
}
