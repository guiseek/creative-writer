import {builtIn} from '@utils/decorators'
import {Input} from '../input'

@builtIn('input', 'cw-switch')
export class Switch extends Input<boolean> {
  constructor(
    public name: string,
    public value = 'true',
    public checked = false
  ) {
    super(name, 'checkbox')
  }
}
