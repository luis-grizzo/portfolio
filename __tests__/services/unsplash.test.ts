import { getImage } from '@/services/unsplash'

describe('getImage', () => {
  const mockGetRandom = jest.fn()

  beforeEach(() => {
    jest.mock('unsplash-js', () => ({
      createApi: () => ({
        photos: {
          getRandom: mockGetRandom
        }
      })
    }))
  })

  it('should return the expected response', async () => {
    const mockSucessResponse = { response: { id: 1 }, errors: null }

    global.fetch = jest.fn().mockImplementation(() => ({
      then: jest.fn().mockResolvedValue(mockSucessResponse)
    }))

    mockGetRandom.mockResolvedValue(mockSucessResponse)

    const response = await getImage()

    expect(response).toEqual(mockSucessResponse.response)
  })

  it('should throw if the response has errors', async () => {
    const mockErrorResponse = { response: null, errors: ['error'] }

    global.fetch = jest.fn().mockImplementation(() => ({
      then: jest.fn().mockResolvedValue(mockErrorResponse)
    }))

    mockGetRandom.mockResolvedValue(mockErrorResponse)

    await expect(async () => await getImage()).rejects.toThrow()
  })
})
