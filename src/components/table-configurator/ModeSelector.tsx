import React from 'react';
import { Coffee, Utensils } from 'lucide-react';
import { Mode } from '../../types/table-configurator';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => (
  <div className='flex gap-2 mb-4'>
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded 
        ${currentMode === 'tableware' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => onModeChange('tableware')}
    >
      <Coffee size={20} />
      Tableware
    </button>
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded 
        ${currentMode === 'meals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => onModeChange('meals')}
    >
      <Utensils size={20} />
      Meals
    </button>
  </div>
);
