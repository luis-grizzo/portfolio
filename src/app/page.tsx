import Image from 'next/image'

import { getImage } from '@/services/unsplash'
import { getProjects } from '@/services/github'

import { Card, LinkButton, Hero, Footnote } from '@/components'

import { socialMedias } from '@/constants/social-medias'
import { hourInSeconds } from '@/constants/time'

import portrait from '@public/portrait.jpg'

export const revalidate = hourInSeconds

export default async function Page() {
  const image = await getImage()
  const projects = await getProjects()

  const { github } = socialMedias

  return (
    <>
      <Hero image={image} />

      <main className="flex flex-col gap-8 md:gap-16 lg:gap-24 h-full container mx-auto my-8 md:my-16 lg:my-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-x-8 py-8">
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 py-8">
          <figure className="lg:order-2 flex items-center justify-center w-4/5 md:w-1/2 lg:w-96 aspect-square rounded-2xl overflow-hidden">
            <Image
              src={portrait}
              alt="Photo of Luís Grizzo. He is on a hill in Ilhéus with the landscape of the Jorge Amado cable-stayed bridge in the background."
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </figure>

          <div className="lg:order-1 flex flex-col gap-4 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h2 className="text-4xl sm:text-5xl">About Me</h2>

            <p className="text-base text-pretty text-neutral-400">
              Hi! My name is Luís Grizzo and I&apos;ve been working as a
              front-end developer since 2019, specializing initially in React
              and later gaining experience with Angular. My career has primarily
              revolved around projects in the banking sector. My main interests
              lie in crafting modern projects with sleek designs, focusing on
              smooth transitions and animations. I particularly enjoy working on
              user interface development for my projects.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <LinkButton href={github.url} icon={github.icon}>
                See my profile
              </LinkButton>
            </div>
          </div>
        </div>

        <Footnote />
      </main>
    </>
  )
}
