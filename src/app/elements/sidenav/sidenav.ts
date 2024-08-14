import {PresentationForm} from '@components/presentation'
import {children, getChildren} from '@utils/decorators'
import {SidenavButton} from './sidenav-button'
import {builtIn} from '@utils/decorators'

@builtIn('aside', 'cw-sidenav')
export class Sidenav extends HTMLElement {
  onClickInsideButton = () => {
    this.classList.toggle('is-open')
    this.button.classList.toggle('is-open')
    document.body.classList.toggle('cw-sidenav-is-open')
    this.#isOpened = !this.#isOpened
  }

  button = new SidenavButton(this.onClickInsideButton)

  #isOpened = true

  @children(PresentationForm)
  presentationForm: PresentationForm[] = []

  connectedCallback() {
    this.classList.add('cw-sidenav')
    this.append(this.button)

    const observer = new MutationObserver(() => {
      console.log(getChildren(this, 'presentationForm'))
    })

    observer.observe(this, {childList: true, subtree: true})

    this.onClickInsideButton()
  }

  add(...children: Node[]) {
    this.append(...children)
  }
}
