import { useFormContext, useWatch } from 'react-hook-form'

import { SpotGroup } from 'components/table/Spot'
import { useTableConfigContext } from 'provider'
import { ITableConfigForm } from 'types/table-configurator'

export const Table = () => {
  const { tableConfig } = useTableConfigContext()
  const { control } = useFormContext<ITableConfigForm>()
  const elementsOnTheTable = useWatch({
    control,
    name: 'elementsOnTheTable',
  })
  return (
    <div className='relative'>
      <img
        src={tableConfig.tableImage}
        alt='Table'
        className='border border-gray-300'
      />

      <SpotGroup />

      {elementsOnTheTable.map((item) => (
        <img
          key={`${item.type}-${item.itemId}-${item.x}-${item.y}`}
          src={item.image}
          alt={`Item ${item.itemId}`}
          className='absolute'
          style={{
            left: item.x,
            top: item.y,
            //   width: item.type === 'tableware' ? '64px' : '48px',
            //   height: item.type === 'tableware' ? '64px' : '48px',
          }}
        />
      ))}
    </div>
  )
}
