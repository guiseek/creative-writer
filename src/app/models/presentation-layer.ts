import {PresentationSchema} from '@interfaces/presentation'
import {PhotoFrameLayer} from './photo-frame'
import {PhotoLayer} from './photo-layer'
import {WordLayer} from './word-layer'
import {TextLayer} from './text-layer'
import {Layer} from './base'

export class PresentationLayer extends Layer implements PresentationSchema {
  photo = new PhotoLayer(this.position.x, 0, 180, 180)
  photoFrame = new PhotoFrameLayer(this.position.x, 0, 180, 180)

  title = new TextLayer(
    this.position.x + this.photo.position.x,
    0,
    this.width - this.photo.width,
    this.height / 4,
  )
    .setSize(48)
    .setWeight('bold')
    .setColor('#62F772')

  speaker = new WordLayer(
    this.title.position.x + this.title.width,
    0,
    this.width - this.photo.width,
    this.height / 2,
  )
    .setSize(32)
    .setWeight('normal')
    .setColor('#D9D9D9')

  async render(): Promise<void> {
    let y = 0
    let x = 40

    await this.photo
      .render()
      .then(() => this.photo.render())
      .then(() => this.context.drawImage(this.photo, x, y))
      .then(() => this.photoFrame.render())
      .then(() => this.context.drawImage(this.photoFrame, x, y))
      .then(() => this.title.render())
      .then(() => {
        y += 40
        x += this.photo.width + x
        this.context.drawImage(this.title, x, y)
      })
      .then(() => this.speaker.render())
      .then(() => this.context.drawImage(this.speaker, x, y))
  }

  setPhoto(photo: string) {
    this.photo.setSrc(photo)
  }

  setTitle(title: string) {
    this.title.setText(title)
  }

  setSpeaker(speaker: string, role: string) {
    this.speaker.setWord(`${speaker} - ${role}`)
  }
}
