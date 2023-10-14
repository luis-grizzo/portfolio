import { Metadata } from 'next'

import Client from './client'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend engineer | Home'
}

export default function Home() {
  return <Client />
}
