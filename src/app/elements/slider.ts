import {builtIn} from '@utils/decorators'
import {Input} from './input'

@builtIn('input', 'cw-slider')
export class Slider extends Input<string> {
  constructor(public name: string, min = 0, max = 16, value = 6) {
    super(name, 'range')
    this.min = min.toString()
    this.max = max.toString()
    this.value = value.toString()
  }
}
