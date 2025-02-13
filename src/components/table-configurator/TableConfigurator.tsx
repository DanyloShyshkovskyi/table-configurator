import React from 'react';
import { useTableConfigurator } from '../../hooks/useTableConfigurator';
import { ControlPanel } from './ControlPanel';
import { SpotButton } from './SpotButton';

export const TableConfigurator: React.FC = () => {
  const { mode, setMode, config, placedItems, loading, error, handleSpotClick, handleUndo } = useTableConfigurator();

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;
  if (!config) return null;

  return (
    <div className='flex gap-4 p-4'>
      <div className='relative'>
        <img src={config.tableImage} alt='Table' className='border border-gray-300' />

        {mode === 'tableware' &&
          config.tablewareSpots.map((spot) => (
            <SpotButton key={spot.id} x={spot.x} y={spot.y} onClick={() => handleSpotClick(spot.id, spot.x, spot.y)} />
          ))}

        {mode === 'meals' &&
          config.mealSpots.map((spot) => (
            <SpotButton
              key={spot.id}
              x={spot.x}
              y={spot.y}
              onClick={() => handleSpotClick(spot.id, spot.x, spot.y)}
              isMeal
            />
          ))}

        {placedItems.map((item) => (
          <img
            key={item.id}
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

      <ControlPanel
        mode={mode}
        onModeChange={setMode}
        config={config}
        onUndo={handleUndo}
        canUndo={placedItems.length > 0}
      />
    </div>
  );
};
