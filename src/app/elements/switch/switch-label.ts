import {builtIn} from '@utils/decorators'
import {Switch} from './switch'
import {h} from '@utils/h'

@builtIn('label', 'cw-switch-label')
export class SwitchLabel extends HTMLLabelElement {
  text: HTMLSpanElement

  element: Switch

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
    return new Switch(name, value, checked)
  }

  #createSpan(text: string) {
    return h('span', {}, text)
  }

  connectedCallback() {
    this.append(this.element, this.text)
    this.classList.add(`cw-switch`)
  }
}
