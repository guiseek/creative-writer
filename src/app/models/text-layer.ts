import {wrapText} from '@utils/wrap-text'
import {Layer} from './base/layer'

type FontWeight = 'normal' | 'bold'

export class TextLayer extends Layer {
  #color = 'black'

  #weight: FontWeight = 'bold'
  #family = 'Mukta'
  #size = 24
  #text = ''

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.font = this.#getFont()
    this.context.fillStyle = this.#color

    wrapText(this.context, this.#text, 750).map((text, i) => {
      this.context.fillText(text, 0, this.height / 2 + this.#size * i)
    })
  }

  #getFont() {
    return `${this.#weight} ${this.#size}px ${this.#family}`
  }

  setSize(size: number) {
    this.#size = size
    return this
  }

  setWeight(weight: FontWeight) {
    this.#weight = weight
    return this
  }

  setColor(color: string) {
    this.#color = color
    return this
  }

  setText(text: string) {
    this.#text = text
    return this
  }
}
