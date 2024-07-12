import { cloneElement } from 'react'
import Link from 'next/link'
import { GoRepoForked, GoGitBranch, GoStar, GoZap } from 'react-icons/go'

import { socialMedias } from '@/constants/social-medias'
import { sixMonthsInMilliseconds, monthInMilliseconds } from '@/constants/time'

interface CardProps {
  project: {
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    fork: boolean
    created_at: string | null
    pushed_at: string | null
    topics?: string[]
  }
}

export function Card({ project }: CardProps) {
  const { github } = socialMedias

  const hasStatus =
    isNewProject() ||
    isRecentlyPushedProject() ||
    !!project.stargazers_count ||
    !!project.fork

  function isNewProject() {
    if (project.created_at) {
      const createAt = new Date(project.created_at).getTime()
      const sixMonthsAgo = new Date().getTime() - sixMonthsInMilliseconds

      if (createAt > sixMonthsAgo) return true
    }

    return false
  }

  function isRecentlyPushedProject() {
    if (project.pushed_at) {
      const pushedAt = new Date(project.pushed_at).getTime()
      const oneMonthAgo = new Date().getTime() - monthInMilliseconds

      if (pushedAt > oneMonthAgo) return true
    }

    return false
  }

  return (
    <Link
      href={project.html_url}
      target="_blank"
      className="flex flex-col gap-4 py-8 px-4 first:border-t-1 lg:card-top-border border-b-1 border-neutral-400/10 transition-colors hover:bg-neutral-900/60"
    >
      {hasStatus && (
        <div className="flex flex-wrap items-center gap-4">
          {!!project.stargazers_count && (
            <span className="flex items-center gap-2 text-sm italic text-amber-400">
              <GoStar className="h-3.5 w-3.5" />
              {project.stargazers_count}
            </span>
          )}

          {!!project.fork && (
            <span className="flex items-center gap-2 text-sm italic text-cyan-400">
              <GoRepoForked className="h-3.5 w-3.5" />
              Forked
            </span>
          )}

          {isNewProject() && (
            <span className="flex items-center gap-2 text-sm italic text-fuchsia-400">
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
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <h2 className="w-full text-2xl truncate">{project.name}</h2>

        {cloneElement(github.icon, {
          className: 'h-5 w-5 lg:h-6 lg:w-6'
        })}
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
    </Link>
  )
}
