import {async} from './async'

export const loadBlob = async (url: string) => {
  return async<Blob>(async (resolve, reject) => {
    try {
      const req = await fetch(url)
      const blob = await req.blob()
      resolve(blob)
    } catch (err) {
      if (err instanceof Error) {
        reject(new DOMException(err.message))
      }
    }
  })
}
