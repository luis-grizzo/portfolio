import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components'

import { verticalHidden, verticalVisible } from '@/utils/animations'

interface DropdownProps {
  label: string | React.ReactElement
  options: Option[]
  onClickOption: (value: string) => void
}

interface Option {
  id: number
  label: string | React.ReactElement
  value: string
}

export const Dropdown = ({ label, options, onClickOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = (value: string) => {
    onClickOption(value)

    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-center relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="text-lg"
      >
        {label}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            className="flex flex-wrap items-center gap-2 absolute top-full mt-4 w-max max-w-xs bg-shape_color_lightTheme dark:bg-shape_color_darkTheme rounded p-5 z-50"
          >
            {options.map(({ id, label, value }) => (
              <button
                key={id}
                onClick={() => handleButtonClick(value)}
                className="text-text_color_lightTheme dark:text-text_color_darkTheme"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
