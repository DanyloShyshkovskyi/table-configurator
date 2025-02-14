import { useQuery } from '@tanstack/react-query'

import { GET } from 'api'
import { ITableConfig, ITableConfigMode } from 'types/table-configurator'

export const useTableConfig = (mode: ITableConfigMode) => {
  return useQuery({
    queryKey: ['table-config', mode],
    queryFn: () =>
      GET<ITableConfig>(`/assets/data/table-configuration/${mode}.json`),
    enabled: !!mode,
  })
}
