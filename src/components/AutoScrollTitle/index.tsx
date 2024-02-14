'use client'

import { createElement, useEffect, useRef, useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useResize } from '@/hooks/useResize'

interface AutoScrollTitleProps
  extends React.BaseHTMLAttributes<HTMLTitleElement> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  leftFadeClassName?: string
  rightFadeClassName?: string
}

enum ReducerActionKind {
  TOGGLE_TRANSITION = 'TOGGLE_TRANSITION',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  ABLE = 'ABLE'
}

function reducer(
  state: {
    toggleTransition: boolean
    isLeft: boolean
    isRight: boolean
    isAble: boolean
  },
  action: {
    type: ReducerActionKind
    payload: boolean
  }
) {
  const actions = {
    TOGGLE_TRANSITION: { ...state, toggleTransition: action.payload },
    LEFT: { ...state, isLeft: action.payload },
    RIGHT: { ...state, isRight: action.payload },
    ABLE: { ...state, isAble: action.payload }
  }

  return actions[action.type]
}

export const AutoScrollTitle = ({
  tag,
  className,
  leftFadeClassName,
  rightFadeClassName,
  ...props
}: AutoScrollTitleProps) => {
  const { viewSize } = useResize()

  const titleRef = useRef<HTMLDivElement>(null)

  const [state, dispatch] = useReducer(reducer, {
    toggleTransition: false,
    isLeft: true,
    isRight: false,
    isAble: false
  })

  const handleFade = () => {
    const title = titleRef.current

    if (title) {
      title.scrollLeft === 0
        ? dispatch({ type: ReducerActionKind.LEFT, payload: true })
        : dispatch({ type: ReducerActionKind.LEFT, payload: false })

      title.offsetWidth + title.scrollLeft + 1 >= title.scrollWidth
        ? dispatch({ type: ReducerActionKind.RIGHT, payload: true })
        : dispatch({ type: ReducerActionKind.RIGHT, payload: false })
    }
  }

  useEffect(() => {
    const title = titleRef.current

    if (title) {
      if (title.scrollWidth > title.offsetWidth) {
        dispatch({ type: ReducerActionKind.ABLE, payload: true })

        title.addEventListener('scroll', handleFade)

        return () => title.removeEventListener('scroll', handleFade)
      } else {
        dispatch({ type: ReducerActionKind.ABLE, payload: false })

        title.removeEventListener('scroll', handleFade)
      }
    }
  }, [viewSize])

  useEffect(() => {
    const title = titleRef.current

    if (title && state.isAble) {
      const targetPosition = !title.scrollLeft ? title.scrollWidth : 0

      title.scrollTo({ left: targetPosition, behavior: 'smooth' })
      setTimeout(() => {
        dispatch({
          type: ReducerActionKind.TOGGLE_TRANSITION,
          payload: !state.toggleTransition
        })
      }, 3000)
    }
  }, [state.toggleTransition, state.isAble])

  return (
    <div className="relative">
      {createElement(tag, {
        ...props,
        ref: titleRef,
        className: `${className ?? ''} w-full overflow-hidden whitespace-nowrap`
      })}

      {state.isAble && (
        <AnimatePresence>
          {!state.isLeft && (
            <motion.div
              key="left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                leftFadeClassName ?? ''
              } absolute top-0 left-0 h-full w-1/6 bg-gradient-to-r from-shape_color_lightTheme dark:from-shape_color_darkTheme`}
            />
          )}

          {!state.isRight && (
            <motion.div
              key="right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                rightFadeClassName ?? ''
              } absolute top-0 right-0 h-full w-1/6 bg-gradient-to-l from-shape_color_lightTheme dark:from-shape_color_darkTheme`}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
