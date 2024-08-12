import {async} from './async'

export const loadImageData = (
  data: string,
  width?: number,
  height?: number
) => {
  return async<HTMLImageElement>(async (resolve) => {
    const image = new Image(width, height)
    image.src = data

    await image.decode()

    resolve(image)
  })
}
