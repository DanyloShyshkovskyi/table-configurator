import React from 'react'

import { ControlPanel } from 'components/menu/ControlPanel'
import { ModeSelector } from 'components/menu/ModeSelector'
import { TableConfigSelect } from 'components/menu/TableConfigSelect'
import { UndoButton } from 'components/menu/UndoButton'
import { Table } from 'components/table'
import { TableConfigProvider } from 'provider'

const App: React.FC = () => {
  return (
    <TableConfigProvider>
      <div className='min-h-screen p-8'>
        <div className='flex gap-4'>
          <Table />
          <div className='sticky top-10 flex h-fit flex-col gap-4'>
            <div className='mb-10 flex flex-col gap-2'>
              <h2 className='text-lg font-medium'>Table Config Selector</h2>
              <TableConfigSelect />
            </div>
            <ModeSelector />
            <ControlPanel />
            <UndoButton />
          </div>
        </div>
      </div>
    </TableConfigProvider>
  )
}

export default App
