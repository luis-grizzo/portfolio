import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { timeUnits } from '@/constants/timeUnits'

import { AutoSlider } from '@/components'

const mockItems = [
  'item 1',
  'item 2',
  'item 3',
  'item 4',
  'item 5',
  'item 6',
  'item 7',
  'item 8',
  'item 9'
]

jest.useFakeTimers()

describe('AutoSlider', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <AutoSlider>
        {mockItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </AutoSlider>
    )

    expect(container).toMatchSnapshot()
  })

  it('should auto scroll to the end of content after interval', () => {
    render(
      <AutoSlider>
        {mockItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </AutoSlider>
    )

    const container = screen.getByRole('tabpanel')
    const content = screen.getByRole('tablist')

    container.scrollTo = jest.fn((xOrOptions?: number | ScrollToOptions) => {
      if (typeof xOrOptions === 'number') {
        container.scrollLeft = xOrOptions
      } else {
        const { left } = xOrOptions as ScrollToOptions
        container.scrollLeft = left ?? 0
      }
    })
    const spyScrollTo = jest.spyOn(container, 'scrollTo')

    Object.defineProperties(container, {
      scrollWidth: {
        value: 400,
        writable: true
      },
      clientWidth: {
        value: 300,
        writable: true
      }
    })

    Object.defineProperty(content, 'clientWidth', {
      value: 400,
      writable: true
    })

    jest.advanceTimersByTime(timeUnits.second * 3)

    expect(spyScrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      left: 100
    })

    jest.advanceTimersByTime(timeUnits.second * 3)

    expect(spyScrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      left: 0
    })
  })

  it('should handle scroll', async () => {
    render(
      <AutoSlider>
        {mockItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </AutoSlider>
    )

    const container = screen.getByRole('tabpanel')
    const content = screen.getByRole('tablist')

    let leftFade!: HTMLElement | null, rightFade!: HTMLElement | null

    Object.defineProperties(container, {
      scrollWidth: {
        value: 400,
        writable: true
      },
      clientWidth: {
        value: 300,
        writable: true
      }
    })

    Object.defineProperty(content, 'clientWidth', {
      value: 400,
      writable: true
    })

    fireEvent.scroll(container, { target: { scrollLeft: 100 } })

    leftFade = screen.queryByTestId('left-fade')
    rightFade = screen.queryByTestId('right-fade')

    await waitFor(() => {
      expect(leftFade).toBeInTheDocument()
      expect(rightFade).not.toBeInTheDocument()
    })

    fireEvent.scroll(container, { target: { scrollLeft: 50 } })

    leftFade = screen.queryByTestId('left-fade')
    rightFade = screen.queryByTestId('right-fade')

    await waitFor(() => {
      expect(leftFade).toBeInTheDocument()
      expect(rightFade).toBeInTheDocument()
    })

    fireEvent.scroll(container, { target: { scrollLeft: 0 } })

    leftFade = screen.queryByTestId('left-fade')
    rightFade = screen.queryByTestId('right-fade')

    await waitFor(() => {
      expect(leftFade).not.toBeInTheDocument()
      expect(rightFade).toBeInTheDocument()
    })
  })

  // it('should handle the scroll functions', () => {
  //   render(
  //     <AutoSlider>
  //       {mockItems.map((item) => (
  //         <span key={item}>{item}</span>
  //       ))}
  //     </AutoSlider>
  //   )

  //   const container = screen.getByRole('tabpanel')
  //   let leftFade, rightFade

  //   fireEvent.scroll(container, { target: { scrollLeft: 100 } })

  //   leftFade = screen.findAllByRole('presentation')
  //   rightFade = screen.findAllByRole('presentation')[1]

  //   expect(leftFade).toBeInTheDocument()
  //   expect(rightFade).not.toBeInTheDocument()

  //   // fireEvent.scroll(container, { target: { scrollLeft: 50 } })

  //   // leftFade = screen.findAllByRole('presentation')[0]
  //   // rightFade = screen.findAllByRole('presentation')[1]

  //   // expect(leftFade).toBeInTheDocument()
  //   // expect(rightFade).toBeInTheDocument()

  //   // fireEvent.scroll(container, { target: { scrollLeft: 0 } })

  //   // leftFade = screen.findAllByRole('presentation')[0]
  //   // rightFade = screen.findAllByRole('presentation')[1]

  //   // expect(leftFade).not.toBeInTheDocument()
  //   // expect(rightFade).toBeInTheDocument()
  // })
})
