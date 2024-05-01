import Image from 'next/image'
import { FaGithub, FaInstagram } from 'react-icons/fa6'

import { getProjects } from '@/services/github'

import { LinkButton, Card } from '@/components/base'

import { socialMedias } from '@/constants/social-medias'
import { dayInSeconds } from '@/constants/time'

import portrait from '@public/portrait.jpg'

export const revalidate = dayInSeconds

export default async function Page() {
  const projects = await getProjects()

  const instagram = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'instagram'
  )

  const github = socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === 'github'
  )

  return (
    <main className="flex flex-col gap-8 md:gap-16 lg:gap-32 h-full container mx-auto my-8 md:my-16 lg:my-32 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-x-8 py-8">
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8 py-8">
        <figure className="lg:order-2 flex items-center justify-center w-4/5 md:w-1/2 lg:w-96 aspect-square rounded-2xl overflow-hidden">
          <Image
            src={portrait}
            alt=""
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </figure>

        <div className="lg:order-1 flex flex-col gap-4 lg:max-w-3xl">
          <h2 className="text-3xl lg:text-6xl font-light">
            About <strong className="font-medium italic">Me.</strong>
          </h2>

          <p className="text-base text-pretty text-neutral-400">
            Lorem ipsum dolor sit amet consectetur. Enim vestibulum suspendisse
            luctus porttitor diam. Fames pellentesque ut morbi viverra eu.
            Malesuada pulvinar imperdiet ullamcorper et. Natoque laoreet lacus
            quis fringilla sed consequat. Aliquam at ornare viverra nisi quis
            sed enim ut morbi. Interdum quis amet urna ullamcorper odio amet
            viverra mauris interdum.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {instagram && (
              <LinkButton href={instagram.url} icon={<FaInstagram />}>
                Follow me
              </LinkButton>
            )}

            {github && (
              <LinkButton href={github.url} icon={<FaGithub />}>
                See more
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
