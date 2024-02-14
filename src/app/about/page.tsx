import { cloneElement } from 'react'
import { Metadata } from 'next'

import { FadeOverflow } from '@/components'

import { techs } from '@/utils/techs'
import { getSocialMedia } from '@/utils/socialMedias'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend developer | About me'
}

export default function About() {
  const linkedIn = getSocialMedia('linkedin')
  const gitHub = getSocialMedia('github')

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-[calc(40%_-_0.75rem)_calc(60%_-_0.75rem)] items-center gap-6 w-full min-h-[calc(100vh_-_((8rem_*_2)_+_(3rem_*_2)))] lg:h-4/6">
      <div className="flex flex-col gap-6 w-full h-full">
        <h2 className="text-5xl xsm:text-6xl lg:text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
          <strong className="font-bold">Techs</strong> & {''}
          <strong className="font-bold">libs</strong>
        </h2>

        <FadeOverflow
          controlAxis="x"
          disableOn="desktop"
          autoScrollItems
          className="grid grid-cols-[repeat(9,_auto)] lg:grid-cols-[1fr_1fr_1fr] auto-rows-[1fr] gap-6 w-full h-full overflow-auto"
        >
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-between w-40 aspect-square lg:w-full lg:h-full lg:aspect-auto p-6 rounded-3xl transition-colors group-[.is-active]:bg-pink-600/20 text-contrast_color_lightTheme dark:text-contrast_color_darkTheme bg-shape_color_lightTheme dark:bg-shape_color_darkTheme"
            >
              {cloneElement(tech.icon, {
                size: 40,
                className: 'self-end group-[.is-active]:text-pink-600'
              })}

              <span className="self-start text-base group-[.is-active]:text-pink-600 text-text_color_lightTheme dark:text-text_color_darkTheme">
                {tech.name}
              </span>
            </div>
          ))}
        </FadeOverflow>
      </div>

      <div className="flex flex-col justify-center gap-6 h-full overflow-hidden">
        <h1 className="text-5xl xsm:text-6xl lg:text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
          <strong className="font-bold">About</strong> me
        </h1>

        <FadeOverflow
          controlAxis="y"
          disableOn="mobile"
          className="flex flex-col items-start gap-6 h-full w-full pr-2 text-xl text-text_color_lightTheme dark:text-text_color_darkTheme"
        >
          <p>
            Hello! I&apos;m{' '}
            <a
              href={linkedIn?.url}
              className={`font-bold text-pink-600 hover:text-pink-900 transition-colors`}
            >
              Luís Grizzo
            </a>
            , a Front-End Developer since 2019. I have a passion for creating
            engaging and functional digital experiences. My work involves
            developing web applications using technologies like HTML, CSS, and
            JavaScript, with a special focus on the React.js framework.
            Additionally, I embrace TypeScript, allowing me to make the most of
            the latest advancements in the market.
          </p>

          <p>
            My journey in Front-End development is complemented by my deep
            interest in interface design. I believe that the harmony between
            functionality and aesthetics is crucial for the success of any
            digital project. Therefore, I apply UI Design principles to every
            project I tackle, utilizing Figma as my tool.
          </p>

          <p>
            Furthermore, I have a strong commitment to code quality and
            maintaining robust projects. I employ unit testing in all my
            projects, using libraries like react-testing-library, Enzyme, and
            Jest. This ensures that functionalities remain solid and reliable as
            the code evolves.
          </p>

          <p>
            Outside the realms of programming and design, I am a technology
            enthusiast always seeking continuous learning. I enjoy taking on
            challenges and collaborating with fellow professionals to create
            amazing solutions. My passion for Front-End development extends
            beyond code, as I am dedicated to delivering exceptional experiences
            to end-users.
          </p>

          <p>
            I invite you to explore my completed projects, available on my{' '}
            <a
              href={gitHub?.url}
              className={`font-bold text-pink-600 hover:text-pink-900 transition-colors`}
            >
              GitHub
            </a>{' '}
            profile. If you are in search of a Front-End developer committed to
            crafting high-quality products, please don&apos;t hesitate to get in
            touch. Let&apos;s turn your ideas into digital reality!
          </p>
        </FadeOverflow>
      </div>
    </main>
  )
}
