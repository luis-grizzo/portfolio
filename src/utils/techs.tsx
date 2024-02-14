import { FaSass, FaReact } from 'react-icons/fa6'
import {
  SiRedux,
  SiTailwindcss,
  SiNextdotjs,
  SiStyledcomponents
} from 'react-icons/si'
import { BiLogoTypescript, BiLogoJavascript } from 'react-icons/bi'
import { TbBrandFramerMotion } from 'react-icons/tb'

export const techs = [
  { name: 'Sass', icon: <FaSass /> },
  { name: 'Styled Components', icon: <SiStyledcomponents /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'Javascript', icon: <BiLogoJavascript /> },
  { name: 'Typescript', icon: <BiLogoTypescript /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Redux', icon: <SiRedux /> },
  { name: 'Framer Motion', icon: <TbBrandFramerMotion /> }
]

export const getTechIcon = (techName: string) =>
  techs.find((tech) => tech.name.toLowerCase() === techName.toLowerCase())?.icon
