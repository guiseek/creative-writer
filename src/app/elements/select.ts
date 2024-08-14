import {builtIn} from '@utils/decorators'

type OptionInit = [
  text: string,
  value: string,
  defaultSelected?: boolean,
  selected?: boolean,
]

@builtIn('select', 'cw-select')
export class Select<T> extends HTMLSelectElement {
  constructor(
    public name: string,
    public onchange = () => {},
    public required = false,
    public multiple = false,
  ) {
    super()
  }

  setOptions(...options: OptionInit[]) {
    for (const [text, value, defaultSelected, selected] of options) {
      this.add(new Option(text, value, defaultSelected, selected))
    }
  }

  get selected() {
    return this.options[this.selectedIndex]
  }

  setValue(value: T) {
    this.value = String(value)
  }
}
