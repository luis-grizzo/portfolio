import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdClose } from 'react-icons/md'

import { Button } from '@/components'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const pathname = usePathname()

  const menuItems = [
    {
      description: 'Home',
      path: '/'
    },
    {
      description: 'About me',
      path: '/about'
    },
    {
      description: 'Portfolio',
      path: '/portfolio'
    }
  ]

  return (
    isOpen &&
    createPortal(
      <div className="fixed top-0 left-0 flex items-center justify-end h-screen w-screen overflow-hidden z-10">
        <div className="z-20 flex flex-col items-end gap-12 w-fit max-w-screen h-full bg-white p-12 shadow-2xl overflow-auto">
          <Button variant="ghost" onClick={() => onClose()}>
            <MdClose size={30} />
          </Button>

          {menuItems.map((item) => (
            <Link
              key={item.description}
              href={item.path}
              onClick={() => onClose()}
              className={`text-5xl uppercase ${
                pathname === item.path
                  ? 'text-pink-600 font-bold pointer-events-none'
                  : 'font-light text-neutral-800 hover:text-pink-600 transition-colors'
              } `}
            >
              {item.description}
            </Link>
          ))}
        </div>

        <div
          onClick={() => onClose()}
          className="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm"
        />
      </div>,
      document.body
    )
  )
}
