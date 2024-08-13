import {autonomous, CustomElement} from '@utils/decorators'
import {AccordionItem} from './accordion-item'
import {children} from '@utils/iterators'
import {timeout} from '@utils/timeout'

@autonomous('cw-accordion')
export class Accordion extends CustomElement {
  oneAtATime = true

  get items() {
    return children<AccordionItem>(this)
  }

  add(title: string, ...children: (string | Node)[]) {
    const child = new AccordionItem({title})
    child.section.append(...children)
    this.append(child)
    return child
  }

  connectedCallback() {
    for (const item of this.items) {
      item.addEventListener('expand', ({detail}) => {
        for (const item of this.items) {
          const config: ScrollIntoViewOptions = {
            behavior: 'smooth',
            block: 'start',
          }

          if (this.oneAtATime) {
            if (item.uuid !== detail.uuid) {
              item.closeSection()
            }

            if (item.uuid === detail.uuid) {
              timeout(() => item.scrollIntoView(config), 400)
            }
          }
        }
      })
    }
  }

  enableOneAtATime() {
    this.oneAtATime = true
  }

  disableOneAtATime() {
    this.oneAtATime = false
  }

  openAll() {
    for (const item of this.items) {
      item.openSection()
    }
  }

  closeAll() {
    for (const item of this.items) {
      item.closeSection()
    }
  }
}
