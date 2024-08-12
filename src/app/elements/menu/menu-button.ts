import {builtIn} from '@utils/decorators'

@builtIn('button', 'cw-menu-button')
export class MenuButton extends HTMLButtonElement {
  constructor(public textContent: string, public onclick = () => {}) {
    super()
  }
}
