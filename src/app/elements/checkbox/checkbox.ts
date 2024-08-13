import {builtIn} from '@utils/decorators'
import {Input} from '../input'

@builtIn('input', 'cw-checkbox')
export class Checkbox extends Input<string> {
  constructor(
    public name: string,
    public value = 'true',
    public checked = false
  ) {
    super(name, 'checkbox')
  }
}
