import { Undo2 } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ITableConfigForm } from 'types/table-configurator'

export const UndoButton = () => {
  const { control, setValue } = useFormContext<ITableConfigForm>()
  const elementsOnTheTable = useWatch({ control, name: 'elementsOnTheTable' })

  return (
    <button
      className='mt-4 flex items-center gap-2 rounded bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:opacity-50'
      onClick={() => {
        // remove the last element
        const newElementsOnTheTable = elementsOnTheTable.slice(0, -1)
        setValue('elementsOnTheTable', newElementsOnTheTable)
      }}
      disabled={elementsOnTheTable.length === 0}
    >
      <Undo2 size={20} />
      Undo
    </button>
  )
}
