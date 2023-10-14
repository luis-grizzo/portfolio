import { Metadata } from 'next'

import { FetchReposProps } from '@/types'

import Client from './client'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend developer | Portfolio'
}

async function getRepos(): Promise<FetchReposProps[]> {
  const response = await fetch('https://api.github.com/users/luis-grizzo/repos')
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch data')
    })

  return response
}

export default async function Portfolio() {
  const repos = await getRepos()

  return <Client repos={repos} />
}
