import React from 'react';

interface SpotButtonProps {
  x: number;
  y: number;
  onClick: () => void;
  isMeal?: boolean;
}

export const SpotButton: React.FC<SpotButtonProps> = ({ x, y, onClick, isMeal }) => (
  <button
    data-testid={`${isMeal ? 'meal' : 'tableware'}-spot`}
    className={`absolute ${isMeal ? 'w-12 h-12' : 'w-16 h-16'} 
      border-2 border-dashed 
      ${isMeal ? 'border-green-300 hover:bg-green-100' : 'border-blue-300 hover:bg-blue-100'} 
      rounded-full transition-colors`}
    style={{ left: x, top: y }}
    onClick={onClick}
  />
);
