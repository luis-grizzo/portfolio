'use client'

import { cloneElement, useState, useEffect } from 'react'
import Image from 'next/image'
import { FaCss3 } from 'react-icons/fa6'
import { BiLogoTypescript } from 'react-icons/bi'
import { DiJavascript1 } from 'react-icons/di'
import { MdStar, MdCode } from 'react-icons/md'

export interface FetchReposProps {
  id: number
  name: string
  description: string
  language: string
  html_url: string
  homepage: string
  stargazers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface CarouselProps {
  items: FetchReposProps[]
}

export const Carousel = ({ items }: CarouselProps) => {
  const [activeItem, setActiveItem] = useState(0)

  const handleLanguageIcon = (language: string) => {
    const selectedLanguage = {
      css: <FaCss3 />,
      typescript: <BiLogoTypescript />,
      javascript: <DiJavascript1 />
    }[language.toLowerCase()]

    return cloneElement(selectedLanguage || <MdCode />, {
      size: 16,
      className: 'text-neutral-400'
    })
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setActiveItem((prevState) => {
  //       if (prevState + 1 === items.length) return 0
  //       else return prevState + 1
  //     })
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [activeItem])

  return (
    <div className="flex flex-row-reverse gap-6 relative h-full overflow-hidden">
      <div className="flex items-center justify-center relative h-full w-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between items-start absolute text-left h-full w-full p-12 rounded-3xl bg-neutral-400 z-0 ${
              index !== activeItem && 'top-[100%]'
            }`}
          >
            <div className="self-end flex items-center gap-2">
              <Image
                src={item.owner.avatar_url}
                width={500}
                height={500}
                alt={`Avatar de ${item.owner.login}`}
                className="w-12 rounded-[50%]"
              />

              <span className="font-bold text-neutral-800">
                {item.owner.login}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-neutral-800">
                  {item.name}
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 rounded-[0.375rem] bg-neutral-800">
                    <MdStar size={16} className="text-neutral-400" />

                    <span className="text-neutral-400 text-base">
                      {item.stargazers_count}
                    </span>
                  </div>

                  {item.language && (
                    <div className="flex items-center gap-1 px-1.5 rounded-[0.375rem] bg-neutral-800">
                      {handleLanguageIcon(item.language)}

                      <span className="text-neutral-400 text-base">
                        {item.language}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.html_url}
                    target="_blank"
                    className="text-pink-600 transition-colors hover:text-pink-900"
                  >
                    Repository
                  </a>

                  {item.homepage && (
                    <>
                      <span className="w-2 h-2 rounded-[50%] bg-neutral-800" />

                      <a
                        href={item.homepage}
                        target="_blank"
                        className="text-pink-600 transition-colors hover:text-pink-900"
                      >
                        Homepage
                      </a>
                    </>
                  )}
                </div>
              </div>

              <p className="text-neutral-800">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-6 z-10">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`w-5 h-5 rounded-[50%] bg-neutral-800 transition-colors ${
              index === activeItem ? 'bg-pink-600 pointer-events-none' : ''
            }`}
            onClick={() => setActiveItem(index)}
          />
        ))}
      </div>
    </div>
  )
}
