'use client'

import { cloneElement, useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCss3 } from 'react-icons/fa6'
import { BiLogoTypescript } from 'react-icons/bi'
import { DiJavascript1 } from 'react-icons/di'
import { MdStar, MdCode } from 'react-icons/md'

import { useColor } from '@/hooks/useColor'
import { useResize } from '@/hooks/useResize'

import { verticalHidden, verticalVisible } from '@/utils/animations'

import { FetchReposProps } from '@/types'

interface CarouselProps {
  items: FetchReposProps[]
}

export const Carousel = ({ items }: CarouselProps) => {
  const { color } = useColor()
  const { isDesktop } = useResize()

  const [activeItem, setActiveItem] = useState(0)

  const handleLanguageIcon = (language: string) => {
    const selectedLanguage = {
      css: <FaCss3 />,
      typescript: <BiLogoTypescript />,
      javascript: <DiJavascript1 />
    }[language.toLowerCase()]

    return cloneElement(selectedLanguage || <MdCode />, {
      size: 16,
      className: 'text-shape_color_lightTheme dark:text-shape_color_darkTheme'
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveItem((prevState) => {
        if (prevState + 1 === items.length) return 0
        else return prevState + 1
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeItem])

  return (
    <div className="grid grid-cols-[auto,_1fr] gap-6 relative h-full w-full overflow-hidden pb-5 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-5 before:z-10 before:bg-gradient-to-t from-background_color_lightTheme to-transparent dark:from-background_color_darkTheme">
      <div className="flex flex-col justify-center gap-6 z-10">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={verticalHidden}
            animate={verticalVisible}
            transition={{ delay: index * 0.1 }}
            className={`w-5 h-5 rounded-[50%] transition-colors ${
              index === activeItem
                ? `bg-${color}-600 pointer-events-none`
                : `bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme hover:bg-${color}-600`
            }`}
            onClick={() => setActiveItem(index)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center relative h-96 lg:h-full w-full">
        <AnimatePresence mode="wait">
          {items.map(
            (item, index) =>
              index === activeItem && (
                <motion.div
                  key={item.id}
                  initial={verticalHidden}
                  animate={verticalVisible}
                  exit={verticalHidden}
                  className={`flex flex-col justify-between items-start absolute text-left h-full w-full p-12 rounded-3xl bg-shape_color_lightTheme dark:bg-shape_color_darkTheme z-0 ${
                    index !== activeItem && 'top-[100%]'
                  }`}
                >
                  <div className="self-end flex items-center gap-2">
                    <Image
                      src={item.owner.avatar_url}
                      width={500}
                      height={500}
                      alt={`Avatar de ${item.owner.login}`}
                      className="w-12 rounded-[50%]"
                    />

                    <span className="font-bold text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
                      {item.owner.login}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-4xl font-bold text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
                        {item.name}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 px-1.5 rounded-[0.375rem] bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme">
                          <MdStar
                            size={16}
                            className="text-shape_color_lightTheme dark:text-shape_color_darkTheme"
                          />

                          <span className="text-shape_color_lightTheme dark:text-shape_color_darkTheme text-base">
                            {item.stargazers_count}
                          </span>
                        </div>

                        {item.language && (
                          <div className="flex items-center gap-1 px-1.5 rounded-[0.375rem] bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme">
                            {handleLanguageIcon(item.language)}

                            <span className="text-shape_color_lightTheme dark:text-shape_color_darkTheme text-base">
                              {item.language}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={item.html_url}
                          target="_blank"
                          className={`text-${color}-600 font-bold transition-colors hover:text-${color}-900`}
                        >
                          Repository
                        </a>

                        {item.homepage && (
                          <>
                            <span className="w-2 h-2 rounded-[50%] bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme" />

                            <a
                              href={item.homepage}
                              target="_blank"
                              className={`text-${color}-600 font-bold transition-colors hover:text-${color}-900`}
                            >
                              Homepage
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
