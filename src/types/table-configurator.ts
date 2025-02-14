// It could be any string but personally prefer to define it here
export type IMode = 'tableware' | 'meals' | 'decoration'

export type ITableConfigMode = 'default' | 'with-decoration'

export interface ISpot {
  id: number
  x: number
  y: number
}

export interface ISpotGroup {
  type: IMode
  spots: ISpot[]
}

export interface IItem {
  id: number
  name: string
  image: string
}

export interface IElementGroup {
  name: string
  items: IItem[]
}

export type IElements = {
  [key in IMode]: IElementGroup
}

export interface IPlacedItem {
  type: IMode
  itemId: number
  spotId: number
  x: number
  y: number
  image: string
}

export interface ITableConfig {
  tableImage: string
  spots: ISpotGroup[]
  elements: IElements
}

export interface ITableConfigForm {
  tableConfigMode: ITableConfigMode
  placedType: IMode
  placedElement: IItem
  elementsOnTheTable: IPlacedItem[]
}
