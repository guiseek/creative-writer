import {LayerSchema} from '@interfaces/layer-schema'
import {Schema} from '@interfaces/schema'
import {Config} from '@interfaces/config'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onFormChange = (value: Schema) => {
  const canvas = use(Canvas)
  const config = use(Config)
  const layer = use(LayerSchema)

  if (value.grid) {
    canvas.setGrid(Math.round(config.grid.w / value.grid))
    layer.grid
      .setSize(value.grid)
      .setActive(!!value.gridActive)
      .render()
      .then(canvas.render)
  }

  if (value.logo) {
    layer.logo.setSrc(value.logo).render().then(canvas.render)
  }

  if (value.background) {
    layer.background.setSrc(value.background).render().then(canvas.render)
  }

  if (value.title) {
    layer.title.setText(value.title).render().then(canvas.render)
  }
}
