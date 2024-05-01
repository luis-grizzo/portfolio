import { Transition } from 'framer-motion'

export const defaultTransition: Transition = {
  ease: [0.77, 0, 0.18, 1],
  duration: 0.4
}

export const verticalHidden = {
  y: 50,
  opacity: 0
}

export const verticalVisible = {
  y: 0,
  opacity: 1
}
