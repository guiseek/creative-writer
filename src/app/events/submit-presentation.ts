import {Presentation} from '@interfaces/presentation'
import {LayerSchema} from '@interfaces/layer-schema'
import {PhotoLayer} from '@models/photo-layer'
import {TextLayer} from '@models/text-layer'
import {Config} from '@interfaces/config'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onSubmitPresentation = async (value: Presentation) => {
  console.log(value)

  const canvas = use(Canvas)
  const config = use(Config)
  const layerSchema = use(LayerSchema)

  const offset = 180
  const padding = {x: 40, y: 50}

  let x = padding.x
  let y = offset + padding.y

  const photo = new PhotoLayer(x, y, offset, offset)

  const title = new TextLayer(
    offset * 2,
    offset + offset,
    config.width - (offset + offset / 2),
    50
  )
    .setColor('#62F772')
    .setWeight('bold')
    .setSize(48)

  const speaker = new TextLayer(
    offset * 2,
    offset + (offset / 3) + 50,
    config.width - (offset + offset / 3),
    50
  )
    .setColor('#D9D9D9')
    .setWeight('normal')
    .setSize(36)

  const role = new TextLayer(x, y, config.width - 360, 270)

  canvas.add(title, speaker, role, photo)

  await photo.setSrc(value.photo).render()

  await title.setText(value.title).render()
  await speaker.setText(value.speaker).render()
  await role.setText(value.role).render()
  await photo.setSrc(value.photo).render()

  const presentationSchema = {title, speaker, role, photo}
  console.log(presentationSchema)

  layerSchema.presentations.push(presentationSchema)

  canvas.render()
}
