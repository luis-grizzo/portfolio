'use client'

import { cloneElement, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdMenu } from 'react-icons/md'

import { useColor } from '@/hooks/useColor'
import { ResizeProvider } from '@/hooks/useResize'

import { socialMedias, getSocialMedia } from '@/utils/socialMedias'
import { colors } from '@/utils/colors'
import { modes } from '@/utils/modes'

import { Button, Dropdown, Logo, Menu, Portal } from '@/components'

export default function Client({ children }: { children: React.ReactNode }) {
  const { color, setColor } = useColor()

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState(modes[0].value)

  const linkedIn = getSocialMedia('linkedin')

  const handleChangeColor = (value: string) => setColor(value)

  const handleChangeMode = (value: string) => setSelectedMode(value)

  return (
    <ResizeProvider>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center pt-12 min-h-[8rem] lg:pt-0 lg:h-1/6"
      >
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex justify-end items-center gap-x-7 xsm:gap-x-8">
          <Dropdown
            label={
              <div
                className={`flex items-center justify-center relative w-7 aspect-square rounded-[50%] bg-${color}-600 before:content-[''] before:absolute before:w-6 before:aspect-square before:rounded-[50%] before:border-4 before:border-background_color_lightTheme dark:before:border-background_color_darkTheme`}
              />
            }
            options={colors.map((item, index) => ({
              id: index,
              label: (
                <div
                  key={color}
                  className={`flex items-center justify-center relative w-7 aspect-square rounded-[50%] bg-${item}-600 ${
                    color === item
                      ? "before:content-[''] before:absolute before:w-6 before:aspect-square before:rounded-[50%] before:border-4 before:border-background_color_lightTheme dark:before:border-background_color_darkTheme"
                      : ''
                  }`}
                />
              ),
              value: item
            }))}
            onClickOption={handleChangeColor}
          />

          <Dropdown
            label={
              modes.find((mode) => mode.value === selectedMode)?.icon ??
              modes[0].icon
            }
            options={modes.map((mode, index) => ({
              id: index,
              label: mode.icon,
              value: mode.value
            }))}
            onClickOption={handleChangeMode}
          />

          <Button variant="ghost" onClick={() => setMenuIsOpen(true)}>
            <MdMenu size={28} />
          </Button>
        </div>
      </motion.nav>

      <main className="flex flex-col lg:grid lg:grid-cols-[calc(40%_-_25px)_calc(60%_-_25px)] items-center gap-12 w-full min-h-[calc(100vh_-_((8rem_*_2)_+_(3rem_*_2)))] lg:h-4/6">
        {children}
      </main>

      <footer className="flex flex-wrap justify-center md:justify-between items-center gap-6 min-h-[8rem] lg:h-1/6 pb-12 lg:pb-0 text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
        <motion.span
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-base text-center md:text-left"
        >
          Developed by{' '}
          <a
            href={linkedIn?.url}
            target="_blank"
            className={`text-${color}-600 font-bold hover:text-${color}-900 transition-colors`}
          >
            Luís Grizzo
          </a>
          . All rights reserved.
        </motion.span>

        <div className="flex flex-wrap  justify-center items-center gap-4">
          {socialMedias.map((socialMedia, index) => (
            <motion.a
              key={socialMedia.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              href={socialMedia.url}
              target="_blank"
              className={`hover:text-${color}-600 transition-colors`}
            >
              {cloneElement(socialMedia.icon, { size: 25 })}
            </motion.a>
          ))}
        </div>
      </footer>

      <Portal>
        <Menu isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
      </Portal>
    </ResizeProvider>
  )
}
