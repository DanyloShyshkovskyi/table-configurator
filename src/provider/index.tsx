import { createContext, useContext, useEffect } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { useTableConfig } from 'api/requests/table'
import { ITableConfig, ITableConfigForm } from 'types/table-configurator'

interface ITableConfigProvider {
  tableConfig: ITableConfig
  isLoading: boolean
  error: Error | null
}

export const TableConfigContext = createContext<ITableConfigProvider | null>(
  null
)

export const TableConfigProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const methods = useForm<ITableConfigForm>({
    defaultValues: {
      tableConfigMode: 'default',
      elementsOnTheTable: [],
    },
  })
  const tableConfigMode = useWatch({
    control: methods.control,
    name: 'tableConfigMode',
  })
  const { data, isLoading, error } = useTableConfig(tableConfigMode)

  useEffect(() => {
    if (data) {
      const placedType = data.spots[0].type
      methods.setValue('placedElement', data.elements[placedType].items[0])
      methods.setValue('placedType', placedType)
      methods.setValue('elementsOnTheTable', [])
    }
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return (
    <TableConfigContext.Provider
      value={{ tableConfig: data, isLoading, error }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </TableConfigContext.Provider>
  )
}

export const useTableConfigContext = () => {
  const context = useContext(TableConfigContext)
  if (!context) {
    throw new Error(
      'useTableConfigContext must be used within a TableConfigProvider'
    )
  }
  return context
}
