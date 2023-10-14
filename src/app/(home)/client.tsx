'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components'
import { Frame } from './components'

import { useColor } from '@/hooks/useColor'

import { getSocialMedia } from '@/utils/socialMedias'
import {
  horizontalHidden,
  horizontalVisible,
  verticalHidden,
  verticalVisible
} from '@/utils/animations'

export default function Client() {
  const { color } = useColor()

  const linkedIn = getSocialMedia('linkedin')

  const MotionLink = motion(Link)

  return (
    <>
      <Frame />

      <div className="flex flex-col justify-center gap-12">
        <motion.h1
          initial={horizontalHidden}
          animate={horizontalVisible}
          className="text-5xl xsm:text-6xl lg:text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme"
        >
          Hi, I&apos;m a <br />
          <strong className="font-bold">Front-End Dev</strong> & <br />
          <strong className="font-bold">UI-Designer</strong>
        </motion.h1>

        <motion.p
          initial={horizontalHidden}
          animate={horizontalVisible}
          transition={{ delay: 0.1 }}
          className="text-xl text-text_color_lightTheme dark:text-text_color_darkTheme"
        >
          My name is{' '}
          <a
            href={linkedIn?.url}
            target="_blank"
            className={`text-${color}-600 font-bold hover:text-${color}-900 transition-colors`}
          >
            Luís Grizzo
          </a>
          , and this is my website! In the field since 2019, my passion has
          always been creating interfaces and animations. Welcome, and please
          don&apos;t hesitate to get in touch!
        </motion.p>

        <div className="flex flex-wrap gap-4">
          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: 0.2 }}
            href="/portfolio"
          >
            <Button variant="primary">My portfolio</Button>
          </MotionLink>

          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: 0.3 }}
            href="/about"
          >
            <Button variant="secondary">About me</Button>
          </MotionLink>
        </div>
      </div>
    </>
  )
}
