import {PresentationSchema} from '@interfaces/presentation'
import {LayerSchema} from '@interfaces/layer-schema'
import {Canvas} from '@elements/canvas'
import {values} from '@utils/iterators'
import {use} from '@websqnl/di'

export const onPresentationCreated = (schema: PresentationSchema) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  canvas.add(schema.photo, schema.title, schema.speaker, schema.role)
  layer.presentations.push(...values(schema))

  schema.photo
    .render()
    .then(() => schema.title.render())
    .then(() => schema.speaker.render())
    .then(() => schema.role.render())
    .then(() => canvas.render())
}
