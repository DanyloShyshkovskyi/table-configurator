// src/hooks/useTableConfigurator.ts
import { useEffect, useState } from 'react';
import { Mode, PlacedItem, TableConfig } from '../types/table-configurator';

const table_config = '/assets/data/table-configuration.json';

export const useTableConfigurator = () => {
  const [mode, setMode] = useState<Mode>('tableware');
  const [config, setConfig] = useState<TableConfig | null>(null);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch(table_config);
        const data = await response.json();
        setConfig(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load configuration:', error);
        setError('Failed to load configuration');
        setLoading(false);
      }
    };
    loadConfig();
  }, []);

  const handleSpotClick = (spotId: number, x: number, y: number) => {
    const selectedItem = document.querySelector<HTMLInputElement>('input[name="itemSelection"]:checked');
    if (!selectedItem || !config) return;

    const itemId = parseInt(selectedItem.value);
    const item = config[mode === 'tableware' ? 'tableware' : 'meals'].find((item) => item.id === itemId);

    if (!item) return;

    setPlacedItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: mode,
        itemId: item.id,
        spotId,
        x,
        y,
        image: item.image,
      },
    ]);
  };

  const handleUndo = () => {
    setPlacedItems((prev) => prev.slice(0, -1));
  };

  return {
    mode,
    setMode,
    config,
    placedItems,
    loading,
    error,
    handleSpotClick,
    handleUndo,
  };
};
