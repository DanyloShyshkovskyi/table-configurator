import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useTableConfigContext } from 'provider'
import { cn } from 'utils'

import { ITableConfigForm } from '../../types/table-configurator'

export const ModeSelector: React.FC = () => {
  const { control } = useFormContext<ITableConfigForm>()
  const { tableConfig } = useTableConfigContext()

  const modes = tableConfig.spots.map((spot) => spot.type)

  return (
    <Controller
      control={control}
      name='placedType'
      render={({ field }) => (
        <div className='mb-4 flex gap-2'>
          {modes.map((mode) => (
            <label
              data-testid={`mode-selector-${mode}`}
              data-is-active={field.value === mode}
              key={mode}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded px-3 py-2',
                field.value === mode && 'bg-blue-500 text-white'
              )}
            >
              <input
                type='radio'
                name='mode'
                value={mode}
                checked={field.value === mode}
                onChange={() => field.onChange(mode)}
                className='sr-only'
              />
              <span className='capitalize'>{mode}</span>
            </label>
          ))}
        </div>
      )}
    />
  )
}
