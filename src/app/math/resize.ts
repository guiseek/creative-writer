import {Size} from '@interfaces/size'

export const resize = (original: Required<Size>, target: Partial<Size>) => {
  if (target.width && !target.height) {
    const height = (original.height / original.width) * target.width
    return {width: target.width, height}
  } else if (!target.width && target.height) {
    const width = (original.width / original.height) * target.height
    return {height: target.height, width}
  } else {
    throw new DOMException(
      `You must provide either target.width or target.height`
    )
  }
}
