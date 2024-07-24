import { act } from 'react'
import { renderHook, waitFor } from '@testing-library/react'

import { TriggerProvider, useTrigger } from '@/hooks/useTrigger'

import { fiveSecondsInMilliseconds } from '@/constants/timeMarks'

jest.useFakeTimers()

describe('useTrigger', () => {
  afterAll(() => {
    jest.clearAllTimers()
  })

  it('should auto close after five seconds', async () => {
    const { result } = renderHook(() => useTrigger(), {
      wrapper: TriggerProvider
    })

    expect(result.current.isTemporaryOpen).toEqual(false)

    act(() => {
      result.current.setIsTemporaryOpen(true)
    })

    expect(result.current.isTemporaryOpen).toEqual(true)

    act(() => {
      jest.advanceTimersByTime(fiveSecondsInMilliseconds)
    })

    await waitFor(() => {
      expect(result.current.isTemporaryOpen).toEqual(false)
    })
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useTrigger())
    }).toThrow()
  })
})
