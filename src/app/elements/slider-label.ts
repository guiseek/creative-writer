import {builtIn} from '@utils/decorators'
import {Slider} from './slider'
import {h} from '@utils/h'

@builtIn('label', 'cw-slider-label')
export class SliderLabel extends HTMLLabelElement {
  text: HTMLSpanElement
  thumb: HTMLSpanElement
  hint: Text

  element: Slider

  constructor(
    text: string,
    public name: string,
    public value = 6,
    public min = 0,
    public max = 16,
  ) {
    super()
    this.hint = new Text(value.toString())
    this.text = this.#createSpan(text)
    this.thumb = this.#createSpan(this.hint)
    this.thumb.classList.add('thumb-label')
    this.element = this.#createElement(name, min, max, value)
  }

  #createElement(name: string, min: number, max: number, value: number) {
    return new Slider(name, min, max, value)
  }

  #createSpan(text: string | Text) {
    return h('span', {}, text)
  }

  connectedCallback() {
    this.append(this.element, this.text, this.thumb)
    this.classList.add(`cw-slider`)

    this.#updateThumbLabel()

    this.element.oninput = this.#updateThumbLabel
  }

  #timeout = -1

  #updateThumbLabel = () => {
    if (!this.thumb.classList.contains('show')) {
      this.thumb.classList.add('show')

      if (this.#timeout) {
        clearTimeout(this.#timeout)
      }

      setTimeout(() => {
        this.thumb.classList.remove('show')
      }, 2000)
    }

    const value = this.element.valueAsNumber
    this.hint.textContent = value.toString()

    // Calcula a posição do thumb
    const rangeWidth = this.element.offsetWidth
    const thumbWidth = this.element.offsetHeight

    const max = +this.element.max - +this.element.min

    const position =
      ((value - +this.element.min) / max) * (rangeWidth - thumbWidth)

    this.thumb.style.left = `calc(${position}px + (${thumbWidth / 2}px))`
  }
}
