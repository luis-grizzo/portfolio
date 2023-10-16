import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { VscColorMode } from 'react-icons/vsc'

export const modes = [
  {
    value: 'light',
    icon: <MdLightMode size={28} />
  },
  {
    value: 'dark',
    icon: <MdDarkMode size={28} />
  },
  {
    value: 'System theme',
    icon: <VscColorMode size={28} />
  }
]
