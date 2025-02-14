
import { QueryCache, QueryClient } from '@tanstack/react-query'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // or we can use Infinity
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.log(error)
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error)
    },
  }),
})
