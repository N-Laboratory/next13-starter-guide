import { render } from '@testing-library/react'
import { expect, test, describe, vi, afterEach } from 'vitest'
import ServerComponents from '@/app/serverComponents/page'

const notFoundMock = vi.hoisted(() => vi.fn())
const responseData = [
  {
    id: 1,
    title: 'test title 1',
    body: 'test body 1',
  },
  {
    id: 2,
    title: 'test title 2',
    body: 'test body 2',
  },
]

describe('unit testing serverComponents/page.tsx', () => {
  const response = {} as Response
  vi.mock('next/navigation', () => ({
    notFound: notFoundMock,
  }))

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should display the post list', async () => {
    // Arrange
    response.json = vi.fn().mockResolvedValue(responseData)
    vi.spyOn(global, 'fetch').mockResolvedValue(response)
    const { getByText } = render(await ServerComponents())

    // Assert
    expect(getByText('test title 1')).toBeDefined()
    expect(getByText('test body 1')).toBeDefined()
    expect(getByText('test title 2')).toBeDefined()
    expect(getByText('test body 2')).toBeDefined()
    expect(notFoundMock).not.toBeCalled()
  })

  test('should call notFound function', async () => {
    // Arrange
    response.json = vi.fn().mockResolvedValue([])
    vi.spyOn(global, 'fetch').mockResolvedValue(response)
    render(await ServerComponents())

    // Assert
    expect(notFoundMock).toHaveBeenCalledOnce()
  })
})
