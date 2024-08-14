import {Size} from '@interfaces/common'

export const determineCenter = (area: Size, item: Size) => {
  const width = area.width / 2 - item.width / 2
  const height = area.height / 2 - item.height / 2

  return {width, height}
}
