import { cache } from 'react'
import { Octokit } from '@octokit/core'

const octokit = new Octokit({
  auth: process.env.GITHUB_KEY
})

export const getProjects = cache(async () => {
  const { status, data } = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    type: 'owner',
    sort: 'created'
  })

  if (![200, 304].includes(status)) {
    throw new Error('Failed to fetch projects.')
  }

  return data
})
