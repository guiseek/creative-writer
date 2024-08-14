import {SubmittedPresentation} from '@interfaces/presentation'
import {EventHandler} from '@interfaces/event-handler'
import {readDataFile} from '@utils/read-data-file'
import {use} from '@websqnl/di'
import {loadBlob} from '@utils/load-blob'

export const onPresentationSubmitted = (value: SubmittedPresentation) => {
  const handler = use(EventHandler)

  const photo = value.photo

  if (photo instanceof File) {
    readDataFile(photo).then(({data}) => {
      handler.emit('presentation.handled', {...value, photo: data})
    })
  } else if (typeof photo === 'string') {
    loadBlob(photo)
      .then(readDataFile)
      .then(({data}) => {
        handler.emit('presentation.handled', {...value, photo: data})
      })
  }
}
