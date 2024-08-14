import { render, screen } from '@testing-library/react'

import { Card, CardProps } from '@/components'

jest.useFakeTimers()

describe('Card', () => {
  beforeAll(() => {
    const fakeDate = new Date('2024-07-06T18:25:47Z')

    jest.setSystemTime(fakeDate)
  })

  afterAll(() => {
    jest.clearAllTimers()
  })

  const mockProject: CardProps['project'] = {
    forks_count: 10,
    language: 'language',
    watchers_count: 10,
    created_at: '2024-05-21T14:42:05Z',
    description: 'description',
    fork: false,
    homepage: 'homepage',
    html_url: 'html_url',
    license: { name: 'license name' },
    name: 'name',
    pushed_at: '2024-07-03T18:25:47Z',
    stargazers_count: 10,
    topics: ['topic']
  }

  it('should match snapshot', () => {
    const { container } = render(<Card project={mockProject} />)

    expect(container).toMatchSnapshot()
  })

  it('should not render the new project badge if createdAt data is null', () => {
    const newMockProject: CardProps['project'] = {
      ...mockProject,
      created_at: null
    }

    render(<Card project={newMockProject} />)

    const eNewProjectBadge = screen.queryByText(/new project/i)

    expect(eNewProjectBadge).not.toBeInTheDocument()
  })

  it('should not render the recently pushed badge if pushedAt data is null', () => {
    const newMockProject: CardProps['project'] = {
      ...mockProject,
      pushed_at: null
    }

    render(<Card project={newMockProject} />)

    const eRecentlyPushedBadge = screen.queryByText(/recently pushed/i)

    expect(eRecentlyPushedBadge).not.toBeInTheDocument()
  })
})
