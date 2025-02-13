// src/types/table-configurator.ts
export type Mode = 'tableware' | 'meals';

export interface Spot {
  id: number;
  x: number;
  y: number;
}

export interface Item {
  id: number;
  name: string;
  image: string;
}

export interface PlacedItem {
  id: number;
  type: Mode;
  itemId: number;
  spotId: number;
  x: number;
  y: number;
  image: string;
}

export interface TableConfig {
  tableImage: string;
  tablewareSpots: Spot[];
  mealSpots: Spot[];
  tableware: Item[];
  meals: Item[];
}
