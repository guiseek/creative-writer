import {LayerSchema} from '@interfaces/layer-schema'
import {Schema} from '@interfaces/schema'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onFormChange = (value: Schema) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  if (value.grid) {
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
