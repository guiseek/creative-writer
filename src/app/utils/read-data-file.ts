import {DataFile} from '@interfaces/data-file'
import {async} from './async'

export const readDataFile = (file: File) => {
  return async<DataFile>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result,
        })
      }
    }

    reader.readAsDataURL(file)
  })
}
