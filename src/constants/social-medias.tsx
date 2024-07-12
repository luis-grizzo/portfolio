import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

export const socialMedias = {
  linkedin: {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/luis-grizzo/',
    icon: <FaLinkedinIn />
  },
  github: {
    name: 'Github',
    url: 'https://github.com/luis-grizzo',
    icon: <FaGithub />
  },
  email: {
    name: 'Email',
    url: 'mailto:luisoggrizzo@gmail.com',
    icon: <MdAlternateEmail />
  }
}

export const socialMediasArray = Object.values(socialMedias)
