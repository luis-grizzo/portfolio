import { render } from '@testing-library/react'

import { TriggerProvider } from '@/hooks/useTrigger'

import { LittleSunshine } from '@/components'

jest.mock('@/hooks/useTrigger', () => ({
  useTrigger() {
    return {
      isTemporaryOpen: true
    }
  }
}))

describe('LittleSunshine', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<LittleSunshine />, {
      wrapper: TriggerProvider
    })

    expect(container).toMatchSnapshot()
  })
})
