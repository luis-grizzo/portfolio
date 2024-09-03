import { cloneElement } from 'react'
import Link from 'next/link'
import {
  GoRepoForked,
  GoGitBranch,
  GoStar,
  GoZap,
  GoLaw,
  GoCodeSquare,
  GoEye
} from 'react-icons/go'

import { socialMedias } from '@/constants/social-medias'
import { timeUnits } from '@/constants/timeUnits'

import { AutoSlider } from '@/components/AutoSlider'

export interface CardProps {
  project: {
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    watchers_count: number
    forks_count: number
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

  function getRelativeTime(timestamp: string) {
    const now = Date.now()
    const numericTimestamp = new Date(timestamp).getTime()
    const timeDifference = numericTimestamp - now
    const absoluteTimeDifference = Math.abs(timeDifference)

    const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto'
    })

    const units = [
      { max: timeUnits.minute, value: timeUnits.second, name: 'second' },
      { max: timeUnits.hour, value: timeUnits.minute, name: 'minute' },
      { max: timeUnits.day, value: timeUnits.hour, name: 'hour' },
      { max: timeUnits.week, value: timeUnits.day, name: 'day' },
      { max: timeUnits.month, value: timeUnits.week, name: 'week' },
      { max: timeUnits.year, value: timeUnits.month, name: 'month' },
      { max: Infinity, value: timeUnits.year, name: 'year' }
    ]

    let timeUnitIndex = 0

    while (absoluteTimeDifference > units[timeUnitIndex].max) {
      timeUnitIndex++
    }

    const value = Math.round(timeDifference / units[timeUnitIndex].value)
    return relativeTimeFormatter.format(
      value,
      units[timeUnitIndex].name as Intl.RelativeTimeFormatUnit
    )
  }

  function isNewProject() {
    if (!project.created_at) {
      return false
    }

    const createdAt = new Date(project.created_at).getTime()
    const yearAndHalfAgo = Date.now() - timeUnits.year * 1.5

    return createdAt > yearAndHalfAgo
  }

  function isRecentlyPushedProject() {
    if (!project.pushed_at) {
      return false
    }

    const pushedAt = new Date(project.pushed_at).getTime()
    const monthAndHalfAgo = Date.now() - timeUnits.month * 1.5

    return pushedAt > monthAndHalfAgo
  }

  return (
    <div className="flex flex-col gap-4 py-8 first:border-t-1 lg:card-top-border border-b-1 border-neutral-400/10">
      <AutoSlider>
        {isNewProject() && project.created_at && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-purple-400">
            <GoZap size={14} />
            Created {getRelativeTime(project.created_at)}
          </span>
        )}

        {isRecentlyPushedProject() && project.pushed_at && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-green-400">
            <GoGitBranch size={14} />
            Pushed {getRelativeTime(project.pushed_at)}
          </span>
        )}

        {!!project.stargazers_count && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-yellow-400">
            <GoStar size={14} />
            {project.stargazers_count}
          </span>
        )}

        {!!project.forks_count && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-neutral-400">
            <GoRepoForked size={14} />
            {project.forks_count}
          </span>
        )}

        {!!project.watchers_count && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-neutral-400">
            <GoEye size={14} />
            {project.watchers_count}
          </span>
        )}

        {!!project.language && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-neutral-400">
            <GoCodeSquare size={14} />
            {project.language}
          </span>
        )}

        {project.fork && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-neutral-400">
            <GoRepoForked size={14} />
            Forked
          </span>
        )}

        {!!project.license && (
          <span className="flex items-center gap-2 text-sm text-nowrap italic text-neutral-400">
            <GoLaw size={14} />
            {project.license.name}
          </span>
        )}
      </AutoSlider>

      <div className="flex items-center justify-between gap-2">
        <h2 className="w-full text-2xl truncate">{project.name}</h2>

        {cloneElement(github.icon, {
          size: 24
        })}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={project.html_url}
          target="_blank"
          className="underline underline-offset-2 text-sm text-blue-400 hover:text-blue-200 transition-colors"
        >
          Repository
        </Link>

        {project.homepage && (
          <Link
            href={project.homepage}
            target="_blank"
            className="underline underline-offset-2 text-sm text-blue-400 hover:text-blue-200 transition-colors"
          >
            Homepage
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
