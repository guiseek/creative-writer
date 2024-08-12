import {builtIn} from '@utils/decorators'
import {parseDOM} from '@utils/parse-dom'

@builtIn('button', 'cw-sidenav-button')
export class SidenavButton extends HTMLButtonElement {
  svg = parseDOM<SVGElement>(
    `
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" stroke-width="4" stroke-linecap="square" fill="currentColor" />
        <path d="M5 12H19" stroke="currentColor" stroke-width="4" stroke-linecap="square" fill="currentColor" />
      </svg>
    `,
    'image/svg+xml'
  )

  constructor(public onclick: () => void) {
    super()
  }

  connectedCallback() {
    this.classList.add('cw-sidenav-toggle')
    this.append(this.svg)
  }
}
