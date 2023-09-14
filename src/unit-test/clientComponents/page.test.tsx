import { render, fireEvent } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import ClientComponents from '@/app/clientComponents/page'

describe('unit testing clientComponents/page.tsx', () => {
  describe('initial display check', () => {
    test('should display the initial number', () => {
      // Arrange
      const { getByText } = render(<ClientComponents />)

      // Assert
      expect(getByText('You clicked 0 times')).toBeDefined()
    })
  })

  describe('test useState function', () => {
    test('should display the number of clicks', () => {
      // Arrange
      const { getByText } = render(<ClientComponents />)

      // Act
      fireEvent.click(getByText('Click'))

      // Assert
      expect(getByText('You clicked 1 times')).toBeDefined()
    })
  })
})
