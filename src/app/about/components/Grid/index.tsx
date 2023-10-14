'use client'

import { cloneElement } from 'react'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3, FaSass, FaReact } from 'react-icons/fa6'
import {
  SiRedux,
  SiTailwindcss,
  SiNextdotjs,
  SiStyledcomponents
} from 'react-icons/si'
import { BiLogoTypescript, BiLogoJavascript } from 'react-icons/bi'
import { TbBrandFramerMotion } from 'react-icons/tb'
import { DiMaterializecss } from 'react-icons/di'

import { useColor } from '@/hooks/useColor'

import { verticalHidden, verticalVisible } from '@/utils/animations'

export const Grid = (): React.ReactElement => {
  const { color } = useColor()

  const techs = [
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3 /> },
    { name: 'Sass', icon: <FaSass /> },
    { name: 'Materialize', icon: <DiMaterializecss /> },
    { name: 'Javascript', icon: <BiLogoJavascript /> },
    { name: 'Typescript', icon: <BiLogoTypescript /> },
    { name: 'React.js', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'Styled Components', icon: <SiStyledcomponents /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'Framer Motion', icon: <TbBrandFramerMotion /> }
  ]

  return (
    <div className="flex relative h-full">
      <div className="grid grid-cols-[1fr_1fr_1fr] auto-rows-[1fr] gap-6 w-full h-full">
        {techs.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-center w-full rounded-[1.25rem] text-contrast_color_lightTheme dark:text-contrast_color_darkTheme bg-shape_color_lightTheme dark:bg-shape_color_darkTheme hover:bg-${color}-600 transition-colors`}
          >
            {cloneElement(tech.icon, {
              size: 60,
              className: 'gi__icon'
            })}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
