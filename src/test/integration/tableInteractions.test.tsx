import { QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { beforeEach, describe, expect, it } from 'vitest'

import App from '../../App'
import { queryClient } from '../../config/query-client'

describe('Table Configurator Interactions', () => {
  const renderApp = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    // Reset query client between tests
    queryClient.clear()
  })

  it('should switch between tableware and meals modes', async () => {
    renderApp()

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    // Wait for the initial load
    await waitFor(
      () => {
        expect(screen.getByText('Tableware')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )

    // Find and click the Meals mode button
    const mealsButton = await screen.findByTestId('mode-selector-meal')
    fireEvent.click(mealsButton)

    // Verify the mode switch
    await waitFor(() => {
      expect(mealsButton).toHaveClass('bg-blue-500')
    })

    // Check if meal items are displayed
    await waitFor(() => {
      expect(screen.getByText('Spaghetti')).toBeInTheDocument()
    })
  })

  it('should place an item on the table and undo', async () => {
    renderApp()

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    // Wait for the initial load
    await waitFor(
      () => {
        expect(screen.getByText('Tableware')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )

    // Select a plate
    const plateOption = await screen.findByText('Wooden Plate')
    fireEvent.click(plateOption)

    // Find and click a spot on the table
    const spot = await screen.findByTestId('tableware-spot-1')
    fireEvent.click(spot)

    // Verify item placement
    await waitFor(() => {
      const placedItems = document.querySelectorAll('img[alt="Item 1"]')
      expect(placedItems).toHaveLength(1)
    })

    // Click undo button
    const undoButton = await screen.findByText('Undo')
    fireEvent.click(undoButton)

    // Verify item was removed
    await waitFor(() => {
      expect(document.querySelectorAll('img[alt="Item 1"]')).toHaveLength(0)
    })
  })

  it('should handle mode switching with placed items', async () => {
    renderApp()

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    // Wait for the initial load
    await waitFor(
      () => {
        expect(screen.getByText('Tableware')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )

    // Place a tableware item
    const plateOption = await screen.findByText('Wooden Plate')
    fireEvent.click(plateOption)

    const spot = await screen.findByTestId('tableware-spot-1')
    fireEvent.click(spot)

    // Verify tableware placement
    await waitFor(() => {
      expect(document.querySelectorAll('img[alt="Item 1"]')).toHaveLength(1)
    })

    // Switch to meals mode
    const mealsButton = await screen.findByTestId('mode-selector-meal')
    fireEvent.click(mealsButton)

    // Verify tableware item remains while in meals mode
    await waitFor(() => {
      expect(document.querySelectorAll('img[alt="Item 1"]')).toHaveLength(1)
    })

    // Place a meal item
    const mealOption = await screen.findByText('Spaghetti')
    fireEvent.click(mealOption)

    const mealSpot = await screen.findByTestId('meal-spot-1')
    fireEvent.click(mealSpot)

    // Verify both items are present
    await waitFor(() => {
      expect(document.querySelectorAll('img[alt*="Item"]')).toHaveLength(2)
    })
  })
})
