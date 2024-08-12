import {Config, EventHandler, LayerSchema} from '@interfaces'
import {determineCenter, determineSize} from '@math'
import {loadImageData, readDataFile} from '@utils'
import {ImageLayer} from '@models/image-layer'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onSponsorInputChange = (file: File) => {
  const config = use(Config)
  const canvas = use(Canvas)
  const handler = use(EventHandler)
  const layer = use(LayerSchema)

  readDataFile(file)
    .then(({data}) => data)
    .then(loadImageData)
    .then((image) => {
      /**
       * determines the size of the image without exceeding the size limits
       */
      let dimension = determineSize(image, {width: 300, height: 120})

      /**
       * Centers the layer based on its size
       */
      const center = determineCenter({width: 360, height: 180}, dimension)

      /**
       * The size of the layer multiplied by the amount already added
       */
      const offset = config.sponsor.w * layer.sponsors.length

      /**
       * Create the layer for the sponsor logo
       */
      const sponsor = new ImageLayer(
        config.sponsor.x + center.width + offset,
        config.sponsor.y + center.height,
        dimension.width,
        dimension.height
      )

      /**
       * Add it to the canvas and the layer configuration object
       * used to update them when something in the form changes
       */
      sponsor
        .setSrc(image.src)
        .render()
        .then(() => {
          layer.sponsors.push(sponsor)
          canvas.add(sponsor)
          handler.emit('sponsorLayerAdded', sponsor)
        })
        .then(canvas.render)
    })
}
