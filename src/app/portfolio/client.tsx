'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components'
import { Carousel } from './components'

import { useColor } from '@/hooks/useColor'

import { getSocialMedia } from '@/utils/socialMedias'
import {
  horizontalHidden,
  horizontalVisible,
  verticalHidden,
  verticalVisible
} from '@/utils/animations'

import { FetchReposProps } from '@/types'

interface ClientProps {
  repos: FetchReposProps[]
}

export default function Client({ repos = [] }: ClientProps) {
  const { color } = useColor()

  const gitHub = getSocialMedia('github')

  const MotionLink = motion(Link)

  return (
    <>
      <Carousel items={repos} />

      <div className="flex flex-col justify-center gap-12 w-full">
        <motion.h1
          initial={horizontalHidden}
          animate={horizontalVisible}
          className="text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme"
        >
          My <strong className="font-bold">portfolio</strong>
        </motion.h1>

        <motion.p
          initial={horizontalHidden}
          animate={horizontalVisible}
          transition={{ delay: 0.1 }}
          className="text-xl text-text_color_lightTheme dark:text-text_color_darkTheme"
        >
          See and access all my projects published on my{' '}
          <a
            href={gitHub?.url}
            target="_blank"
            className={`text-${color}-600 font-bold hover:text-${color}-900 transition-colors`}
          >
            Github
          </a>
          !
        </motion.p>

        <div className="flex gap-4">
          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            transition={{ delay: 0.2 }}
            href="/about"
          >
            <Button variant="primary">About me</Button>
          </MotionLink>

          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            transition={{ delay: 0.3 }}
            href="/"
          >
            <Button variant="secondary">Return to home</Button>
          </MotionLink>
        </div>
      </div>
    </>
  )
}
