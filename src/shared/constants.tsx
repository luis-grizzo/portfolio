import {
  FaBehance,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter
} from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

export const socialMedias = [
  {
    name: 'Github',
    url: 'https://github.com/luis-grizzo',
    icon: <FaGithub />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lu%C3%ADs-ot%C3%A1vio-gaido-grizzo-2a957a1b2/',
    icon: <FaLinkedinIn />
  },
  {
    name: 'X',
    url: 'https://google.com',
    icon: <FaXTwitter />
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/luis_ozzirg/',
    icon: <FaInstagram />
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/luisgrizzo',
    icon: <FaBehance />
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ozzirg.odiag/',
    icon: <FaFacebook />
  },
  {
    name: 'Email',
    url: 'mailto:luisoggrizzo@gmail.com',
    icon: <MdAlternateEmail />
  }
]

export const getSocialMedia = (socialMediaName: string) =>
  socialMedias.find(
    (socialMedia) => socialMedia.name.toLowerCase() === socialMediaName
  )
