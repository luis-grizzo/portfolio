import { render } from '@testing-library/react'
import { MdStar } from 'react-icons/md'

import { LinkButton } from '@/components'

describe('LinkButton', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <LinkButton href="mockUrl" icon={<MdStar />}>
        test
      </LinkButton>
    )

    expect(container).toMatchSnapshot()
  })
})
