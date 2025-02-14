import { Plus } from 'lucide-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { useTableConfigContext } from 'provider'
import { IItem, IMode, ISpot, ITableConfigForm } from 'types/table-configurator'

type ISpotProps = ISpot & {
  onClick: (spot: ISpot) => void
  placedType: IMode
  placedElement: IItem
}

export const Spot: React.FC<ISpotProps> = ({
  x,
  y,
  id,
  onClick,
  placedType,
  placedElement,
}: ISpotProps) => {
  return (
    <button
      data-testid={`${placedType}-spot-${id}`}
      className={`group absolute rounded-full border-2 border-dashed transition-colors`}
      style={{ left: x, top: y }}
      onClick={() => onClick({ x, y, id })}
    >
      <Plus className='absolute top-1/2 left-1/2 z-[0] size-20 -translate-x-1/2 -translate-y-1/2 opacity-80' />
      <img
        src={placedElement.image}
        className='relative z-[1] opacity-0 transition-opacity group-hover:opacity-60'
        alt={placedElement.name}
      />
    </button>
  )
}

export const SpotGroup: React.FC = () => {
  const { tableConfig } = useTableConfigContext()
  const { control, setValue } = useFormContext<ITableConfigForm>()
  const [placedType, elementsOnTheTable, placedElement] = useWatch({
    control,
    name: ['placedType', 'elementsOnTheTable', 'placedElement'],
  })

  const spots = tableConfig.spots
    .find((spot) => spot.type === placedType)
    ?.spots.filter(
      (spot) =>
        !elementsOnTheTable.some(
          (item) => item.x === spot.x && item.y === spot.y
        )
    )

  if (!spots || spots.length === 0 || !placedType) return null

  const handleSpotClick = ({ id, ...spotParams }: ISpot) => {
    setValue('elementsOnTheTable', [
      ...elementsOnTheTable,
      {
        ...spotParams,
        spotId: id,
        type: placedType,
        itemId: placedElement.id,
        image: placedElement.image,
      },
    ])
  }

  return spots.map((spot) => (
    <Spot
      key={spot.id}
      {...spot}
      onClick={handleSpotClick}
      placedType={placedType}
      placedElement={placedElement}
    />
  ))
}
