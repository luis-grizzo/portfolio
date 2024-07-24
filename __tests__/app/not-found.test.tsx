import { render } from '@testing-library/react'

import NotFound from '@/app/not-found'

describe('NotFound', () => {
  beforeEach(() => {
    render(<NotFound />)
  })

  it('should match snapshot', () => {
    const { container } = render(<NotFound />)

    expect(container).toMatchSnapshot()
  })
})
