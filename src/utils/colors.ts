export const fromColors = [
  'from-lime-900',
  'from-green-900',
  'from-emerald-900',
  'from-teal-900',
  'from-cyan-900',
  'from-sky-900',
  'from-blue-900',
  'from-indigo-900',
  'from-violet-900',
  'from-purple-900',
  'from-fuchsia-900'
] as const

export const getRandomFromColors = () => {
  'use client'

  return fromColors[Math.floor(Math.random() * fromColors.length)]
}

/**
 * @const renderFromColor
 *
 * @returns Retorna sempre a mesma cor dentro do tempo de vida do render.
 */

export const renderFromColor = getRandomFromColors()
