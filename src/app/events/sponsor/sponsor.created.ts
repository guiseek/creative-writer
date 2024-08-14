import {LayerSchema} from '@interfaces/layer-schema'
import {ImageLayer} from '@models/image-layer'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onSponsorCreated = (sponsor: ImageLayer) => {
  const layer = use(LayerSchema)
  const canvas = use(Canvas)

  canvas.add(sponsor)
  layer.sponsors.push(sponsor)

  sponsor.render().then(canvas.render)
}
