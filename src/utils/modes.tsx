import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { VscColorMode } from 'react-icons/vsc'

export const modes = [
  {
    description: 'light',
    icon: <MdLightMode size={28} />
  },
  {
    description: 'dark',
    icon: <MdDarkMode size={28} />
  },
  {
    description: 'System theme',
    icon: <VscColorMode size={28} />
  }
]
