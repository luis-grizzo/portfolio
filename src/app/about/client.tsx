'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components'
import { TextRender, Grid } from './components'

import { useColor } from '@/hooks/useColor'

import {
  horizontalHidden,
  horizontalVisible,
  verticalHidden,
  verticalVisible
} from '@/utils/animations'

import { getSocialMedia } from '@/utils/socialMedias'

export default function Client() {
  const { color } = useColor()

  const MotionLink = motion(Link)

  const linkedIn = getSocialMedia('linkedin')
  const gitHub = getSocialMedia('github')

  const texts = [
    {
      id: 0,
      paragraph: (
        <p>
          Hello! I&apos;m{' '}
          <a
            href={linkedIn?.url}
            className={`font-bold text-${color}-600 hover:text-${color}-900 transition-colors`}
          >
            Luís Grizzo
          </a>
          , a Front-End Developer since 2019. I have a passion for creating
          engaging and functional digital experiences. My work involves
          developing web applications using technologies like HTML, CSS, and
          JavaScript, with a special focus on the React.js framework.
          Additionally, I embrace TypeScript, allowing me to make the most of
          the latest advancements in the market.
        </p>
      )
    },
    {
      id: 1,
      paragraph: (
        <p>
          My journey in Front-End development is complemented by my deep
          interest in interface design. I believe that the harmony between
          functionality and aesthetics is crucial for the success of any digital
          project. Therefore, I apply UI Design principles to every project I
          tackle, utilizing Figma as my tool.
        </p>
      )
    },
    {
      id: 2,
      paragraph: (
        <p>
          Furthermore, I have a strong commitment to code quality and
          maintaining robust projects. I employ unit testing in all my projects,
          using libraries like react-testing-library, Enzyme, and Jest. This
          ensures that functionalities remain solid and reliable as the code
          evolves.
        </p>
      )
    },
    {
      id: 3,
      paragraph: (
        <p>
          Outside the realms of programming and design, I am a technology
          enthusiast always seeking continuous learning. I enjoy taking on
          challenges and collaborating with fellow professionals to create
          amazing solutions. My passion for Front-End development extends beyond
          code, as I am dedicated to delivering exceptional experiences to
          end-users.
        </p>
      )
    },
    {
      id: 4,
      paragraph: (
        <p>
          I invite you to explore my completed projects, available on my{' '}
          <a
            href={gitHub?.url}
            className={`font-bold text-${color}-600 hover:text-${color}-900 transition-colors`}
          >
            GitHub
          </a>{' '}
          profile. If you are in search of a Front-End developer committed to
          crafting high-quality products, please don&apos;t hesitate to get in
          touch. Let&apos;s turn your ideas into digital reality!
        </p>
      )
    }
  ]

  return (
    <>
      <Grid />

      <div className="flex flex-col justify-center gap-12 h-full overflow-hidden">
        <motion.h1
          initial={horizontalHidden}
          animate={horizontalVisible}
          exit={horizontalHidden}
          className="text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme"
        >
          <strong className="font-bold">About</strong> me
        </motion.h1>

        <TextRender texts={texts} />

        <div className="flex flex-wrap gap-4">
          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: 0.1 }}
            href="/portfolio"
          >
            <Button variant="primary">My portfolio</Button>
          </MotionLink>

          <MotionLink
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: 0.2 }}
            href="/"
          >
            <Button variant="secondary">Return to home</Button>
          </MotionLink>
        </div>
      </div>
    </>
  )
}
