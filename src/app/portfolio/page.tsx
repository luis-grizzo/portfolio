import { Metadata } from 'next'
import Image from 'next/image'
import { MdStar, MdRemoveRedEye } from 'react-icons/md'

import { FetchReposProps } from '@/types'

import { AutoScrollTitle, FadeOverflow } from '@/components'

import { getSocialMedia } from '@/utils/socialMedias'
import { getTechIcon } from '@/utils/techs'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend developer | Portfolio'
}

async function getRepos(): Promise<FetchReposProps[]> {
  const response = await fetch('https://api.github.com/users/luis-grizzo/repos')
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch data.')
    })

  return response
}

export default async function Portfolio() {
  const repos = await getRepos()

  const gitHub = getSocialMedia('github')

  return (
    <main className="flex flex-col-reverse lg:grid lg:grid-cols-[calc(40%_-_0.75rem)_calc(60%_-_0.75rem)] items-center gap-6 w-full min-h-[calc(100vh_-_((8rem_*_2)_+_(3rem_*_2)))] lg:h-4/6">
      <FadeOverflow
        controlAxis="y"
        disableOn="mobile"
        autoScrollItems
        className="flex flex-col gap-6 w-full h-full"
      >
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col gap-3 p-6 rounded-3xl transition-colors bg-shape_color_lightTheme dark:bg-shape_color_darkTheme group-[.is-active]:bg-pink-950"
          >
            <div className="flex items-center gap-2">
              <Image
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                width={28}
                height={28}
                className="rounded-[50%]"
              />

              <span className="text-base text-text_color_lightTheme dark:text-text_color_darkTheme group-[.is-active]:text-pink-600">
                {repo.owner.login}
              </span>
            </div>

            <AutoScrollTitle
              tag="h2"
              className="text-3xl font-bold text-contrast_color_lightTheme dark:text-contrast_color_darkTheme group-[.is-active]:text-pink-600"
              leftFadeClassName="group-[.is-active]:from-pink-950"
              rightFadeClassName="group-[.is-active]:from-pink-950"
            >
              {repo.name}
            </AutoScrollTitle>

            <div className="flex flex-wrap items-center gap-2 text-shape_color_lightTheme dark:text-shape_color_darkTheme group-[.is-active]:text-pink-950">
              <div className="flex items-center px-1 gap-1 rounded bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme group-[.is-active]:bg-pink-600">
                <MdStar />

                {repo.stargazers_count}
              </div>

              <div className="flex items-center px-1 gap-1 rounded bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme group-[.is-active]:bg-pink-600">
                {<MdRemoveRedEye />}

                {repo.watchers_count}
              </div>

              {repo.language && (
                <div className="flex items-center px-1 gap-1 rounded bg-contrast_color_lightTheme dark:bg-contrast_color_darkTheme group-[.is-active]:bg-pink-600">
                  {getTechIcon(repo.language)}

                  {repo.language}
                </div>
              )}
            </div>

            {repo.description && (
              <p className="text-base truncate text-text_color_lightTheme dark:text-text_color_darkTheme group-[.is-active]:text-pink-600">
                {repo.description}
              </p>
            )}
          </div>
        ))}
      </FadeOverflow>

      <div className="flex flex-col justify-center gap-6 w-full">
        <h1 className="text-5xl xsm:text-6xl lg:text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
          My <strong className="font-bold">portfolio</strong>
        </h1>

        <p className="text-xl text-text_color_lightTheme dark:text-text_color_darkTheme">
          See and access all my projects published on my{' '}
          <a
            href={gitHub?.url}
            target="_blank"
            className={`text-pink-600 font-bold hover:text-pink-950 transition-colors`}
          >
            Github
          </a>
          !
        </p>
      </div>
    </main>
  )
}
