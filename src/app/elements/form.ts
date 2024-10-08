import {serialize} from '@utils/serialize'
import {builtIn} from '@utils/decorators'
import {CheckboxLabel} from './checkbox'
import {FieldSet} from './field-set'
import {Checkbox} from './checkbox'
import {InputLabel} from './input'
import {Button} from './button'
import {Select} from './select'
import {Input} from './input'

type FormControl<T> =
  | Input<T>
  | InputLabel<T>
  | Select<T>
  | Checkbox
  | CheckboxLabel
  | FieldSet
  | Button

@builtIn('form', 'cw-form')
export class Form<T extends object> extends HTMLFormElement {
  constructor(public onchange = () => {}) {
    super()
  }

  add<T>(control: FormControl<T>) {
    this.append(control)
  }

  get value() {
    return serialize<T>(this)
  }
}
