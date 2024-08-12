import {builtIn} from '@utils/decorators'
import {h} from '@utils/h'

@builtIn('fieldset', 'cw-fieldset')
export class FieldSet extends HTMLFieldSetElement {
  legend

  constructor(text: string) {
    super()
    this.legend = this.#createLegend(text)
  }

  #createLegend(text: string) {
    return h('legend', {}, text)
  }

  connectedCallback() {
    this.append(this.legend)
  }

  add(...children: Element[]) {
    this.append(...children)
  }
}
