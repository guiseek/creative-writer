import {PresentationLayerSchema} from '@interfaces/layer-schema'
import {Presentation} from '@interfaces/presentation'
import {PhotoLayer} from '@models/photo-layer'
import {TextLayer} from '@models/text-layer'
import {Config} from '@interfaces/config'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onAddPresentation = (value: Presentation) => {
  console.log(value)

  const canvas = use(Canvas)
  const config = use(Config)
  // const layer = use(LayerSchema)

  const schema: PresentationLayerSchema = {
    title: new TextLayer(20, config.height / 3, config.width - 360, 270),
    speaker: new TextLayer(20, config.height / 3 + 50, config.width - 360, 270),
    role: new TextLayer(20, config.height / 3, config.width - 360, 270),
    photo: new PhotoLayer(20, config.height / 3, config.width - 360, 270),
  }

  canvas.add(schema.photo)
}
