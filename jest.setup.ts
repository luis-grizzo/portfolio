import '@testing-library/jest-dom'

// ------------------------------------------------------------------------------

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  options: IntersectionObserverInit
  observe: jest.Mock
  unobserve: jest.Mock
  disconnect: jest.Mock

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback
    this.options = options || {}
    this.observe = jest.fn()
    this.unobserve = jest.fn()
    this.disconnect = jest.fn()
  }

  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver)
  }
}

global.IntersectionObserver = MockIntersectionObserver as never

// ------------------------------------------------------------------------------

const testCache = <T extends Function>(func: T) => func

jest.mock('react', () => {
  const originalModule = jest.requireActual('react')
  return {
    ...originalModule,
    cache: testCache
  }
})
