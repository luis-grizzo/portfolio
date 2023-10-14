import { Metadata } from 'next'

import Client from './client'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend developer | About me'
}

export default function About() {
  return <Client />
}
