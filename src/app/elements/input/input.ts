import {builtIn} from '@utils/decorators'

export type InputType =
  | 'hidden'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number'
  | 'range'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'image'

@builtIn('input', 'cw-input')
export class Input<T> extends HTMLInputElement {
  constructor(
    public name: string,
    public type: InputType,
    public required = false,
    public onchange = () => {}
  ) {
    super()
  }

  setValue(value: T) {
    this.value = String(value)
  }
}
