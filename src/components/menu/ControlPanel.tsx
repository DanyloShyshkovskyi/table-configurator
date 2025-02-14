import React, { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { useTableConfigContext } from 'provider'
import { ITableConfigForm } from 'types/table-configurator'
import { cn } from 'utils'

export const ControlPanel: React.FC = () => {
  const { tableConfig } = useTableConfigContext()
  const { control, setValue } = useFormContext<ITableConfigForm>()
  const [placedType] = useWatch({
    control,
    name: ['placedType'],
  })

  const elementsGroup = tableConfig.elements[placedType]

  useEffect(() => {
    if (elementsGroup) {
      setValue('placedElement', elementsGroup.items[0])
    }
  }, [placedType])

  if (!elementsGroup) return null

  return (
    <div className='w-64 space-y-2 rounded-lg bg-gray-50 p-4'>
      <h3 className='mb-2 font-medium'>
        Select <span className='capitalize'>{elementsGroup.name}</span>
      </h3>
      <Controller
        control={control}
        name='placedElement'
        render={({ field }) => (
          <>
            {elementsGroup.items.map((item) => (
              <label
                key={`${placedType}-${item.id}`}
                htmlFor={`${placedType}-${item.id}`}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg p-2',
                  field.value.id === item.id && 'cursor-not-allowed bg-gray-200'
                )}
              >
                <input
                  type='radio'
                  id={`${placedType}-${item.id}`}
                  name={placedType}
                  value={`${placedType}-${item.id}`}
                  onChange={() => {
                    field.onChange(item)
                  }}
                  className='sr-only h-4 w-4'
                />
                <img src={item.image} alt={item.name} className='h-8 w-8' />
                <span>{item.name}</span>
              </label>
            ))}
          </>
        )}
      />
    </div>
  )
}
