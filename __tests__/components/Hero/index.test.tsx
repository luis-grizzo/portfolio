import { render, screen } from '@testing-library/react'

import { Hero } from '@/components'

import type { Random } from 'unsplash-js/dist/methods/photos/types'

describe('Hero', () => {
  const mockImage: Random = {
    alt_description: 'alt_description',
    blur_hash: null,
    color: null,
    created_at: '2024-05-21T14:42:05Z',
    description: null,
    exif: {
      aperture: null,
      exposure_time: null,
      focal_length: null,
      iso: null,
      make: null,
      model: null
    },
    height: 100,
    id: 'id',
    likes: 0,
    links: {
      download: 'download',
      download_location: 'download_location',
      html: 'html',
      self: 'self'
    },
    location: {
      city: null,
      country: null,
      name: null,
      position: { latitude: null, longitude: null }
    },
    promoted_at: null,
    updated_at: '2024-07-03T18:25:47Z',
    urls: {
      full: '/full',
      raw: '/raw',
      regular: '/regular',
      small: '/small',
      thumb: '/thumb'
    },
    user: {
      bio: null,
      first_name: 'first_name',
      id: 'id',
      instagram_username: null,
      last_name: null,
      links: {
        followers: 'followers',
        following: 'following',
        html: 'html',
        likes: 'likes',
        photos: 'photos',
        portfolio: 'portfolio',
        self: 'self'
      },
      location: null,
      name: 'name',
      portfolio_url: null,
      profile_image: { large: 'large', medium: 'medium', small: 'small' },
      total_collections: 0,
      total_likes: 0,
      total_photos: 0,
      twitter_username: null,
      updated_at: '2024-07-03T18:25:47Z',
      username: 'username'
    },
    width: 100
  }

  it('should match snapshot', () => {
    const { container } = render(<Hero image={mockImage} />)

    expect(container).toMatchSnapshot()
  })

  it('should render a generic alt description when the info is not available', () => {
    const newMockImage: Random = { ...mockImage, alt_description: null }

    render(<Hero image={newMockImage} />)

    const eImage = screen.getByRole('img') as HTMLImageElement

    expect(eImage.alt).toEqual('Generic background image')
  })
})
