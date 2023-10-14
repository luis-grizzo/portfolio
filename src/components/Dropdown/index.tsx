import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components'

import { verticalHidden, verticalVisible } from '@/utils/animations'

interface DropdownProps {
  label: string | React.ReactElement
  options: Option[]
  onClickOption: (id: number) => void
}

interface Option {
  id: number
  item: string | React.ReactElement
}

export const Dropdown = ({ label, options, onClickOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = (id: number) => {
    onClickOption(id)

    setIsOpen(false)
  }

  return (
    <div
      className="flex items-center justify-center relative"
      onBlur={() => setIsOpen(false)}
    >
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
            className="flex flex-wrap items-center gap-2 absolute top-full mt-4 w-max max-w-xs bg-shape_color_lightTheme dark:bg-shape_color_darkTheme rounded p-5"
          >
            {options.map(({ id, item }) => (
              <button
                key={id}
                onClick={() => handleButtonClick(id)}
                className="text-text_color_lightTheme dark:text-text_color_darkTheme"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
