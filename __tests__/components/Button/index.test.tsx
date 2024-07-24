import { render } from '@testing-library/react'
import { MdStar } from 'react-icons/md'

import { Button } from '@/components'

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(<Button icon={<MdStar />}>test</Button>)

    expect(container).toMatchSnapshot()
  })
})
