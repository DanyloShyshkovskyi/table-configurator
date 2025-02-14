import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { describe, expect, it } from 'vitest'

import { useTableConfig } from '../../api/requests/table'
import { queryClient } from '../../config/query-client'

describe('Table Configuration Data', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should load default table configuration', async () => {
    const { result } = renderHook(() => useTableConfig('default'), { wrapper })

    // Wait for the data to load
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.tableImage).toBe('/assets/images/table.png')
    expect(result.current.data?.spots).toHaveLength(2)
  })

  it('should load configuration with decorations', async () => {
    const { result } = renderHook(() => useTableConfig('with-decoration'), {
      wrapper,
    })

    // Wait for the data to load
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.spots).toHaveLength(3)
    expect(result.current.data?.elements.decoration).toBeDefined()
  })
})
