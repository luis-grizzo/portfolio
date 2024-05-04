import { cache } from 'react'
import { createApi } from 'unsplash-js'

import type { Random } from 'unsplash-js/dist/methods/photos/types'

const unsplashApi = createApi({
  accessKey: `${process.env.UNSPLASH_KEY}`
})

export const getImage = cache(async () => {
  const { errors, response } = await unsplashApi.photos.getRandom({
    collectionIds: ['2kcXOONNrrA']
  })

  if (errors) {
    const formattedErrors = errors.join('|')
    throw new Error(`Failed to fetch images | ${formattedErrors}`)
  }

  return response as Random
})
