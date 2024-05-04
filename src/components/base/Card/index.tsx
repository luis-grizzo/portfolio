import { cloneElement } from 'react'
import Link from 'next/link'
import { MdFiberNew, MdNewReleases, MdStar } from 'react-icons/md'
import { BiGitRepoForked } from 'react-icons/bi'

import { socialMedias } from '@/constants/social-medias'
import { halfYearInMilliseconds, yearInMilliseconds } from '@/constants/time'

interface CardProps {
  project: {
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    fork: boolean
    created_at: string | null
    updated_at: string | null
  }
}

export function Card({ project }: CardProps) {
  const github = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'github'
  )

  const hasStatus =
    isNewProject() ||
    isRecentlyUpdatedProject() ||
    !!project.stargazers_count ||
    !!project.fork

  function isNewProject() {
    if (project.created_at) {
      const createAt = new Date(project.created_at).getTime()
      const oneYearAgo = new Date().getTime() - yearInMilliseconds

      if (createAt > oneYearAgo) return true
    }
    return false
  }

  function isRecentlyUpdatedProject() {
    if (project.updated_at) {
      const updatedAt = new Date(project.updated_at).getTime()
      const sixMonthsAgo = new Date().getTime() - halfYearInMilliseconds

      if (updatedAt > sixMonthsAgo) return true
    }
    return false
  }

  return (
    <Link
      href={project.html_url}
      target="_blank"
      className="flex flex-col gap-4 py-8 px-4 first:border-t-1 lg:card-top-border border-b-1 border-neutral-400/10 hover:bg-neutral-900 transition-colors"
    >
      {hasStatus && (
        <div className="flex flex-wrap items-center gap-4">
          {!!project.stargazers_count && (
            <span className="flex items-center gap-2 text-sm italic text-amber-400">
              <MdStar className="h-5 w-5" />
              {project.stargazers_count}
            </span>
          )}

          {!!project.fork && (
            <span className="flex items-center gap-2 text-sm italic text-cyan-400">
              <BiGitRepoForked className="h-5 w-5" />
              Fork
            </span>
          )}

          {isNewProject() && (
            <span className="flex items-center gap-2 text-sm italic text-fuchsia-400">
              <MdFiberNew className="h-5 w-5" />
              New project
            </span>
          )}

          {isRecentlyUpdatedProject() && (
            <span className="flex items-center gap-2 text-sm italic text-green-400">
              <MdNewReleases className="h-5 w-5" />
              Recently updated
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl lg:text-2xl truncate">{project.name}</h2>

        {github &&
          cloneElement(github.icon, {
            className: 'h-5 w-5 lg:h-6 lg:w-6'
          })}
      </div>

      {project.description && (
        <p className="text-base text-pretty text-neutral-400">
          {project.description}
        </p>
      )}
    </Link>
  )
}
