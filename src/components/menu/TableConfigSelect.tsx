import { Controller, useFormContext } from 'react-hook-form'

import { ITableConfigForm } from 'types/table-configurator'

export const TableConfigSelect = () => {
  const { control } = useFormContext<ITableConfigForm>()

  return (
    <Controller
      control={control}
      name='tableConfigMode'
      render={({ field }) => (
        <select
          value={field.value}
          onChange={field.onChange}
          className='rounded-md border-2 border-gray-300 p-2'
        >
          <option value='default'>Default</option>
          <option value='with-decoration'>With Decorations</option>
        </select>
      )}
    />
  )
}
