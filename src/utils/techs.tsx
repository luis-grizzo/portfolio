import { FaHtml5, FaCss3, FaSass, FaReact } from 'react-icons/fa6'
import {
  SiRedux,
  SiTailwindcss,
  SiNextdotjs,
  SiStyledcomponents
} from 'react-icons/si'
import { BiLogoTypescript, BiLogoJavascript } from 'react-icons/bi'
import { TbBrandFramerMotion } from 'react-icons/tb'
import { DiMaterializecss } from 'react-icons/di'

export const techs = [
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3 /> },
  { name: 'Sass', icon: <FaSass /> },
  { name: 'Materialize', icon: <DiMaterializecss /> },
  { name: 'Javascript', icon: <BiLogoJavascript /> },
  { name: 'Typescript', icon: <BiLogoTypescript /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Redux', icon: <SiRedux /> },
  { name: 'Styled Components', icon: <SiStyledcomponents /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'Framer Motion', icon: <TbBrandFramerMotion /> }
]
