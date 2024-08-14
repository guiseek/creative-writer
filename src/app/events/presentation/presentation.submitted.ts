import {SubmittedPresentation} from '@interfaces/presentation'
import {EventHandler} from '@interfaces/event-handler'
import {readDataFile} from '@utils/read-data-file'
import {use} from '@websqnl/di'

export const onPresentationSubmitted = (value: SubmittedPresentation) => {
  const handler = use(EventHandler)

  readDataFile(value.photo).then(({data}) => {
    handler.emit('presentation.handled', {...value, photo: data})
  })
}
