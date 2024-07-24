import { cloneElement } from 'react'
import Link from 'next/link'
import {
  GoRepoForked,
  GoGitBranch,
  GoStar,
  GoZap,
  GoLinkExternal,
  GoLaw,
  GoCode
} from 'react-icons/go'

import { socialMedias } from '@/constants/social-medias'
import {
  oneMonthInMilliseconds,
  oneYearInMilliseconds
} from '@/constants/timeMarks'

export interface CardProps {
  project: {
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    fork: boolean
    created_at: string | null
    pushed_at: string | null
    topics?: string[]
    homepage: string | null
    language: string | null
    license: {
      name: string
    } | null
  }
}

export function Card({ project }: CardProps) {
  const { github } = socialMedias

  function isNewProject() {
    if (!project.created_at) {
      return false
    }

    const createdAt = new Date(project.created_at).getTime()
    const sixMonthsAgo = new Date().getTime() - oneYearInMilliseconds

    return createdAt > sixMonthsAgo
  }

  function isRecentlyPushedProject() {
    if (!project.pushed_at) {
      return false
    }

    const pushedAt = new Date(project.pushed_at).getTime()
    const oneMonthAgo = new Date().getTime() - oneMonthInMilliseconds

    return pushedAt > oneMonthAgo
  }

  return (
    <div className="flex flex-col gap-4 py-8 first:border-t-1 lg:card-top-border border-b-1 border-neutral-400/10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {isNewProject() && (
          <span className="flex items-center gap-2 text-sm italic text-purple-400">
            <GoZap className="h-3.5 w-3.5" />
            New project
          </span>
        )}

        {isRecentlyPushedProject() && (
          <span className="flex items-center gap-2 text-sm italic text-green-400">
            <GoGitBranch className="h-3.5 w-3.5" />
            Recently pushed
          </span>
        )}

        {!!project.stargazers_count && (
          <span className="flex items-center gap-2 text-sm italic text-yellow-400">
            <GoStar className="h-3.5 w-3.5" />
            {project.stargazers_count}
          </span>
        )}

        {!!project.language && (
          <span className="flex items-center gap-2 text-sm italic text-neutral-400">
            <GoCode className="h-3.5 w-3.5" />
            {project.language}
          </span>
        )}

        {project.fork && (
          <span className="flex items-center gap-2 text-sm italic text-neutral-400">
            <GoRepoForked className="h-3.5 w-3.5" />
            Forked
          </span>
        )}

        {!!project.license && (
          <span className="flex items-center gap-2 text-sm italic text-neutral-400">
            <GoLaw className="h-3.5 w-3.5" />
            {project.license.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <h2 className="w-full text-2xl truncate">{project.name}</h2>

        {cloneElement(github.icon, {
          className: 'h-5 w-5 lg:h-6 lg:w-6'
        })}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href={project.html_url}
          target="_blank"
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-200 transition-colors"
        >
          Repository
          <GoLinkExternal className="h-3.5 w-3.5" />
        </Link>

        {project.homepage && (
          <Link
            href={project.homepage}
            target="_blank"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-200 transition-colors"
          >
            Homepage
            <GoLinkExternal className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {project.description && (
        <p className="text-base text-pretty text-neutral-400">
          {project.description}
        </p>
      )}

      {project.topics && (
        <div className="flex flex-wrap items-center gap-2">
          {project.topics.map((topic) => (
            <span
              key={topic}
              className="flex items-center px-2 py-1 text-xs bg-neutral-800/60 text-neutral-50 border-1 border-neutral-400/10 rounded-lg"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
