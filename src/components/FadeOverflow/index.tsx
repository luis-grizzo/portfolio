'use client'

import { useRef, useState, useReducer, useEffect, Children } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useResize } from '@/hooks/useResize'

interface FadeOverflowProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  controlAxis: 'x' | 'y'
  disableOn?: 'desktop' | 'mobile'
  autoScrollItems?: boolean
}

enum AxesActionKind {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

function reducer(
  state: {
    isTop: boolean
    isBottom: boolean
    isLeft: boolean
    isRight: boolean
  },
  action: {
    type: AxesActionKind
    payload: boolean
  }
) {
  const actions = {
    TOP: { ...state, isTop: action.payload },
    BOTTOM: { ...state, isBottom: action.payload },
    LEFT: { ...state, isLeft: action.payload },
    RIGHT: { ...state, isRight: action.payload }
  }

  return actions[action.type]
}

export const FadeOverflow = ({
  controlAxis,
  disableOn,
  autoScrollItems,
  children,
  className,
  ...props
}: FadeOverflowProps) => {
  const { view } = useResize()

  const containerRef = useRef<HTMLDivElement>(null)

  const [activeItem, setActiveItem] = useState(0)

  const [state, dispatch] = useReducer(reducer, {
    isTop: true,
    isBottom: false,
    isLeft: true,
    isRight: false
  })

  const isDisabled = disableOn === view

  const axle = {
    x: {
      fadeHandler: () => {
        const container = containerRef.current

        if (container) {
          container.scrollLeft === 0
            ? dispatch({ type: AxesActionKind.LEFT, payload: true })
            : dispatch({ type: AxesActionKind.LEFT, payload: false })

          container.offsetWidth + container.scrollLeft + 1 >=
          container.scrollWidth
            ? dispatch({ type: AxesActionKind.RIGHT, payload: true })
            : dispatch({ type: AxesActionKind.RIGHT, payload: false })
        }
      },
      autoScrollHandler: () => {
        const container = containerRef.current

        if (container) {
          const child = container.children[activeItem] as HTMLElement
          const targetPosition =
            -(container.offsetWidth / 2) +
            child.offsetLeft +
            child.offsetWidth / 2

          container.scrollTo({ left: targetPosition, behavior: 'smooth' })

          setTimeout(() => {
            setActiveItem((prevState) => {
              if (prevState + 1 >= container.children.length) return 0
              else return prevState + 1
            })
          }, 3000)
        }
      },
      component: (
        <AnimatePresence>
          {!state.isLeft && (
            <motion.div
              key="left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 h-[calc(100%_-_0.5rem)] w-1/6 bg-gradient-to-r from-background_color_lightTheme dark:from-background_color_darkTheme"
            />
          )}

          {!state.isRight && (
            <motion.div
              key="right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 right-0 h-[calc(100%_-_0.5rem)] w-1/6 bg-gradient-to-l from-background_color_lightTheme dark:from-background_color_darkTheme"
            />
          )}
        </AnimatePresence>
      )
    },
    y: {
      fadeHandler: () => {
        const container = containerRef.current

        if (container) {
          container.scrollTop === 0
            ? dispatch({ type: AxesActionKind.TOP, payload: true })
            : dispatch({ type: AxesActionKind.TOP, payload: false })

          container.offsetHeight + container.scrollTop + 1 >=
          container.scrollHeight
            ? dispatch({ type: AxesActionKind.BOTTOM, payload: true })
            : dispatch({ type: AxesActionKind.BOTTOM, payload: false })
        }
      },
      autoScrollHandler: () => {
        const container = containerRef.current

        if (container) {
          const child = container.children[activeItem] as HTMLElement
          const targetPosition =
            -(container.offsetHeight / 2) +
            child.offsetTop +
            child.offsetHeight / 2

          container.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })

          setTimeout(() => {
            setActiveItem((prevState) => {
              if (prevState + 1 >= container.children.length) return 0
              else return prevState + 1
            })
          }, 3000)
        }
      },
      component: (
        <AnimatePresence>
          {!state.isTop && (
            <motion.div
              key="top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 h-1/6 w-[calc(100%_-_0.5rem)] bg-gradient-to-b from-background_color_lightTheme from-5% dark:from-background_color_darkTheme"
            />
          )}

          {!state.isBottom && (
            <motion.div
              key="bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 h-1/6 w-[calc(100%_-_0.5rem)] bg-gradient-to-t from-background_color_lightTheme from-10% to-90% dark:from-background_color_darkTheme"
            />
          )}
        </AnimatePresence>
      )
    }
  }[controlAxis]

  useEffect(() => {
    autoScrollItems && !isDisabled && axle.autoScrollHandler()
  }, [activeItem, view])

  useEffect(() => {
    containerRef.current?.addEventListener('scroll', axle.fadeHandler)

    return () =>
      containerRef.current?.removeEventListener('scroll', axle.fadeHandler)
  }, [])

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div
        ref={containerRef}
        className={`${className ?? ''} overflow-auto custom-scroll `}
        {...props}
      >
        {Children.map(children, (child, index) => (
          <div
            className={`group ${
              index === activeItem && !isDisabled ? 'is-active' : ''
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      {!isDisabled && axle.component}
    </div>
  )
}
