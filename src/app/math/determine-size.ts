import {Size} from '@interfaces/size'

export const determineSize = (original: Size, max: Size) => {
  const ratio = {
    width: max.width / original.width,
    height: max.height / original.height,
  }
  const scale = Math.min(ratio.width, ratio.height)

  const width = original.width * scale
  const height = original.height * scale

  return {width, height}
}
