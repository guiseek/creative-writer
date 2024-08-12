import {builtIn} from '@utils/decorators'

type ButtonMode = 'contained' | 'outlined' | 'text'
type ButtonType = 'button' | 'submit' | 'reset'

@builtIn('button', 'cw-button')
export class Button extends HTMLButtonElement {
  constructor(
    public textContent: string,
    public type: ButtonType = 'button',
    public onclick: (event: Event) => void = () => {},
    public mode: ButtonMode = 'outlined'
  ) {
    super()
  }

  connectedCallback() {
    this.classList.add(`cw-button-${this.mode}`)
  }
}
