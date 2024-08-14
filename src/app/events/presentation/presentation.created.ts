import {PresentationLayer} from '@models/presentation-layer'
import {LayerSchema} from '@interfaces/layer-schema'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onPresentationCreated = (presentation: PresentationLayer) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  console.log(presentation);
  

  canvas.add(presentation)
  layer.presentations.push(presentation)

  presentation
    .render()
    // .then(() => schema.title.render())
    // .then(() => schema.speaker.render())
    // // .then(() => schema.role.render())
    .then(() => canvas.render())
}
