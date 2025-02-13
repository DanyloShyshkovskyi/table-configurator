import { Undo2 } from 'lucide-react';
import React from 'react';
import { Mode, TableConfig } from '../../types/table-configurator';
import { ModeSelector } from './ModeSelector';

interface ControlPanelProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  config: TableConfig;
  onUndo: () => void;
  canUndo: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ mode, onModeChange, config, onUndo, canUndo }) => (
  <div className='w-64 p-4 bg-gray-50 rounded-lg'>
    <ModeSelector currentMode={mode} onModeChange={onModeChange} />

    <div className='space-y-2'>
      <h3 className='font-medium mb-2'>Select {mode === 'tableware' ? 'Tableware' : 'Meal'}</h3>
      {config[mode].map((item) => (
        <label key={item.id} className='flex items-center gap-2'>
          <input type='radio' name='itemSelection' value={item.id} className='w-4 h-4' />
          <img src={item.image} alt={item.name} className='w-8 h-8' />
          <span>{item.name}</span>
        </label>
      ))}
    </div>

    <button
      className='flex items-center gap-2 mt-4 px-3 py-2 bg-gray-200 rounded 
        hover:bg-gray-300 disabled:opacity-50'
      onClick={onUndo}
      disabled={!canUndo}
    >
      <Undo2 size={20} />
      Undo
    </button>
  </div>
);
