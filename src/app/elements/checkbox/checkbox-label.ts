import {builtIn} from '@utils/decorators'
import {Checkbox} from './checkbox'
import {h} from '@utils/h'

@builtIn('label', 'cw-checkbox-label')
export class CheckboxLabel extends HTMLLabelElement {
  text: HTMLSpanElement

  element: Checkbox

  constructor(
    text: string,
    public name: string,
    public value = 'true',
    public checked = false,
  ) {
    super()
    this.text = this.#createSpan(text)
    this.element = this.#createElement(name, value, checked)
  }

  #createElement(name: string, value: string, checked: boolean) {
    return new Checkbox(name, value, checked)
  }

  #createSpan(text: string) {
    return h('span', {}, text)
  }

  connectedCallback() {
    this.append(this.element, this.text)
    this.classList.add(`cw-checkbox`)
  }
}
