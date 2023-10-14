'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MdClose } from 'react-icons/md'

import { useColor } from '@/hooks/useColor'

import { Button } from '@/components'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { color } = useColor()

  const pathname = usePathname()

  const menuItems = [
    {
      description: 'Home',
      path: '/'
    },
    {
      description: 'About me',
      path: '/about'
    },
    {
      description: 'Portfolio',
      path: '/portfolio'
    }
  ]

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-end h-screen w-screen overflow-hidden z-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.1 }}
            className="z-20 flex flex-col items-end gap-12 w-fit max-w-screen h-full bg-shape_color_lightTheme dark:bg-shape_color_darkTheme p-12 overflow-auto"
          >
            <Button variant="ghost" onClick={() => onClose()}>
              <MdClose size={30} />
            </Button>

            {menuItems.map((item) => (
              <Link
                key={item.description}
                href={item.path}
                onClick={() => onClose()}
                className={`text-4xl sm:text-5xl uppercase ${
                  pathname === item.path
                    ? `text-${color}-600 font-bold pointer-events-none`
                    : `font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme hover:text-${color}-600 transition-colors`
                }`}
              >
                {item.description}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose()}
            className="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm"
          />
        </div>
      )}
    </AnimatePresence>
  )
}
