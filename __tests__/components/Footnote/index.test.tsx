import { render } from '@testing-library/react'

import { Footnote } from '@/components'

describe('Footnote', () => {
  it('should match snapshot', () => {
    const { container } = render(<Footnote />)

    expect(container).toMatchSnapshot()
  })
})
