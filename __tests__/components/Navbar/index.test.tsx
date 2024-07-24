import { fireEvent, render, screen } from '@testing-library/react'

import { TriggerProvider } from '@/hooks/useTrigger'

import { Navbar } from '@/components'

const setIsTemporaryOpenMock = jest.fn()

jest.mock('@/hooks/useTrigger', () => ({
  useTrigger() {
    return {
      setIsTemporaryOpen: setIsTemporaryOpenMock
    }
  }
}))

describe('Navbar', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<Navbar />, { wrapper: TriggerProvider })

    expect(container).toMatchSnapshot()
  })

  it('should call custom hook function on button click', () => {
    render(<Navbar />)

    const eButton = screen.getByRole('button')

    fireEvent.click(eButton)

    expect(setIsTemporaryOpenMock).toHaveBeenCalled()
  })
})
