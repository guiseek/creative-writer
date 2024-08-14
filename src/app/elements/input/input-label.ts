import {Input, type InputType} from './input'
import {builtIn} from '@utils/decorators'
import {h} from '@utils/h'

export type InputMode = 'filled' | 'outlined' | 'standard'

@builtIn('label', 'cw-input-label')
export class InputLabel<T> extends HTMLLabelElement {
  text: HTMLSpanElement

  element: Input<T>

  constructor(
    text: string,
    type: InputType,
    public name: string,
    onChange = () => {},
    public mode: InputMode = 'outlined',
    public required = false
  ) {
    super()
    this.text = this.#createSpan(text)
    this.element = this.#createElement(name, type, onChange, required)
  }

  setLabel(text: string) {
    this.text.textContent = text
    return this
  }

  setType(type: InputType) {
    this.element.type = type
    return this
  }

  setMode(mode: InputMode) {
    this.mode = mode
    return this
  }

  setRequired(required: boolean) {
    this.element.required = required
    return this
  }

  #createElement(
    name: string,
    type: InputType,
    onChange: () => void,
    required: boolean
  ) {
    return new Input(name, type, required, onChange)
  }

  #createSpan(text: string) {
    return h('span', {}, text)
  }

  connectedCallback() {
    this.append(this.element, this.text)
    this.classList.add(`cw-input-${this.mode}`)
  }

  get value() {
    return this.element.value
  }
}
