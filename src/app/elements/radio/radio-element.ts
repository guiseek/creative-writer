import {builtIn} from '@utils/decorators'
import {Input} from '../input'

@builtIn('input', 'cw-radio')
export class RadioElement extends Input<string> {
  constructor(
    public name: string,
    public value: string,
    public checked = false
  ) {
    super(name, 'radio')
  }
}
