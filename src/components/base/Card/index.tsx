import Link from 'next/link'
import { MdFiberNew, MdNewReleases, MdStar } from 'react-icons/md'
import { FaCodeFork, FaEye } from 'react-icons/fa6'

import { Tag } from '@/components/base'

import { socialMedias } from '@/constants/social-medias'
import { cloneElement } from 'react'
import { halfYearInMilliseconds, yearInMilliseconds } from '@/constants/time'

interface CardProps {
  project: {
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    forks_count: number
    watchers_count: number
    created_at: string | null
    updated_at: string | null
  }
  className?: string
}

export function Card({ className, project }: CardProps) {
  const github = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'github'
  )

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
      const oneMonthAgo = new Date().getTime() - halfYearInMilliseconds

      if (updatedAt > oneMonthAgo) return true
    }
    return false
  }

  return (
    <Link
      href={project.html_url}
      target="_blank"
      className={`flex flex-col gap-4 py-8 px-4 card-top-border border-b-1 border-neutral-400/10 hover:bg-neutral-900 transition-colors ${
        className ?? ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-4">
        {isNewProject() && (
          <span className="flex items-center gap-2 text-sm italic text-purple-400">
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
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl lg:text-2xl truncate">{project.name}</h2>

        {github &&
          cloneElement(github.icon, {
            className: 'h-5 w-5 lg:h-6 lg:w-6'
          })}
      </div>

      <div className="flex gap-4">
        <Tag icon={<MdStar />} className="text-sm">
          {project.stargazers_count}
        </Tag>

        <Tag icon={<FaCodeFork />} className="text-sm">
          {project.forks_count}
        </Tag>

        <Tag icon={<FaEye />} className="text-sm">
          {project.watchers_count}
        </Tag>
      </div>

      {project.description && (
        <p className="text-base text-pretty text-neutral-400">
          {project.description}
        </p>
      )}
    </Link>
  )
}
