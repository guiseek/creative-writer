import {RadioElement} from './radio-element'
import {builtIn} from '@utils/decorators'
import {h} from '@utils/h'

@builtIn('label', 'cw-radio-label')
export class RadioLabel extends HTMLLabelElement {
  text: HTMLSpanElement

  element: RadioElement

  constructor(
    text: string,
    public name: string,
    public value: string,
    public checked = false,
  ) {
    super()
    this.text = this.#createSpan(text)
    this.element = this.#createElement(name, value, checked)
  }

  #createElement(name: string, value: string, checked: boolean) {
    return new RadioElement(name, value, checked)
  }

  #createSpan(text: string) {
    return h('span', {}, text)
  }

  connectedCallback() {
    this.append(this.element, this.text)
    this.classList.add(`cw-radio`)
  }
}
