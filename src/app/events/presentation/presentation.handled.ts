import {EventHandler} from '@interfaces/event-handler'
import {Presentation} from '@interfaces/presentation'
import { WordLayer } from '@models/word-layer'
import {PhotoLayer} from '@models/photo-layer'
import {Config} from '@interfaces/config'
import {use} from '@websqnl/di'

export const onPresentationHandled = (presentation: Presentation) => {
  console.log(presentation);
  
  const config = use(Config)
  const handler = use(EventHandler)

  const offset = 180
  const padding = {x: 40, y: 50}

  let x = padding.x
  let y = offset + padding.y

  const photo = new PhotoLayer(x, y, offset, offset).setSrc(presentation.photo)

  const title = new WordLayer(
    offset * 2,
    offset + offset,
    config.width - (offset + offset / 2),
    50
  )
    .setColor('#62F772')
    .setWeight('bold')
    .setSize(48)
    .setWord(presentation.title)

  const speaker = new WordLayer(
    offset * 2,
    offset + offset / 3 + 50,
    config.width - (offset + offset / 3),
    50
  )
    .setColor('#D9D9D9')
    .setWeight('normal')
    .setSize(36)
    .setWord(presentation.name)

  const role = new WordLayer(x, y, config.width - 360, 270).setWord(
    presentation.role
  )

  handler.emit('presentation.created', {title, speaker, photo, role})
}
