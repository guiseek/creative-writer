import {builtIn} from '@utils/decorators'
import {px} from '@utils/px'

export interface ExpandEventDetail {
  uuid: string
}

export interface AccordionItemAnimation {
  root: Animation | null
  section: Animation | null
  config: KeyframeAnimationOptions
}

export interface AccordionItemAttrs {
  title: string
  open?: boolean
}

@builtIn('details', 'cw-accordion-item')
export class AccordionItem extends HTMLDetailsElement {
  summary = document.createElement('summary')
  section = document.createElement('section')

  uuid = crypto.randomUUID()

  isClosing = false
  isExpanding = false

  animation: AccordionItemAnimation = {
    root: null,
    section: null,
    config: {
      duration: 450,
      easing: 'ease',
      // easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    },
  }

  constructor({title, open = false}: AccordionItemAttrs) {
    super()
    this.open = open
    this.summary.textContent = title
    this.append(this.summary, this.section)
    // this.onclick = (e) => e.preventDefault();
    this.ontoggle = (e) => e.preventDefault()
    this.summary.addEventListener('click', this.onClick)
  }

  connectedCallback() {
    // this.section = this.querySelector('section')!
    if (!this.open) this.section.style.opacity = '0'
  }

  onClick = (e: Event) => {
    e.preventDefault()

    this.style.overflow = 'hidden'

    if (this.isClosing || !this.open) {
      this.openSection()
    } else if (this.isExpanding || this.open) {
      this.closeSection()
    }
  }

  closeSection() {
    this.isClosing = true

    const startHeight = px(this.offsetHeight)

    let endHeight = this.summary ? px(this.summary.offsetHeight) : px(75)

    if (this.animation.root && this.animation.section) {
      this.animation.root.cancel()
      this.animation.section.cancel()
    }

    this.animation.section = this.section.animate(
      {opacity: [1, 0]},
      this.animation.config
    )

    this.animation.root = this.animate(
      {height: [startHeight, endHeight]},
      this.animation.config
    )

    this.animation.root.onfinish = () => this.onAnimationFinish(false)
    this.animation.root.oncancel = () => (this.isClosing = false)
  }

  openSection() {
    this.style.height = px(this.offsetHeight)
    this.open = true

    const detail = {uuid: this.uuid}
    const event = new CustomEvent('expand', {detail})
    this.dispatchEvent(event)

    requestAnimationFrame(this.expand)
  }

  expand = () => {
    this.isExpanding = true

    const startHeight = px(this.offsetHeight)

    const endHeight = this.summary
      ? px(this.summary.offsetHeight + this.section.offsetHeight)
      : px(75)

    if (this.animation.root && this.animation.section) {
      this.animation.root.cancel()
      this.animation.section.cancel()
    }

    const config: KeyframeAnimationOptions = {
      duration: 400,
      easing: 'ease-out',
    }

    this.animation.root = this.animate(
      {
        height: [startHeight, endHeight],
      },
      config
    )

    this.animation.section = this.section.animate({opacity: [0, 1]}, config)

    this.animation.root.onfinish = () => this.onAnimationFinish(true)

    this.animation.root.oncancel = () => (this.isExpanding = false)
  }

  onAnimationFinish = (open: boolean) => {
    this.open = open

    this.animation.root = null
    this.animation.section = null

    this.isClosing = false

    this.isExpanding = false

    this.style.height = this.style.overflow = ''
    this.section.style.opacity = '1'
  }

  onDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData('text/plain', this.uuid)
    this.classList.add('dragging')

    // Desativando transições para o item arrastado
    this.style.transition = 'none'
  }

  onDragOver = (e: DragEvent) => {
    e.preventDefault()
    const afterElement = this.getDragAfterElement(e.clientY)
    const parent = this.parentNode as HTMLElement
    const draggingItem = parent.querySelector('.dragging') as HTMLElement

    if (afterElement == null) {
      parent.appendChild(draggingItem)
    } else {
      parent.insertBefore(draggingItem, afterElement)
    }

    // Adicionando a transição suave
    Array.from(parent.children).forEach((child) => {
      const childElement = child as HTMLElement
      childElement.style.transition = 'transform 150ms ease'
      childElement.style.transform = 'translateY(0)'
    })
  }

  onDrop = (e: DragEvent) => {
    e.preventDefault()
    this.classList.remove('dragging')

    // Restaurando as transições após o drop
    Array.from(this.parentElement!.children).forEach((child) => {
      const childElement = child as HTMLElement
      childElement.style.transition = ''
      childElement.style.transform = ''
    })
  }

  onDragEnd = () => {
    this.classList.remove('dragging')

    // Restaurando as transições para todos os itens
    Array.from(this.parentElement!.children).forEach((child) => {
      const childElement = child as HTMLElement
      childElement.style.transition = ''
      childElement.style.transform = ''
    })
  }

  getDragAfterElement(y: number) {
    const items = Array.from(
      this.parentElement!.querySelectorAll<AccordionItem>(
        '.ws-accordion-item:not(.dragging)'
      )
    )

    return items.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
          return {offset: offset, element: child}
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: null as AccordionItem | null,
      }
    ).element
  }
}

declare global {
  interface HTMLElementEventMap {
    expand: CustomEvent<ExpandEventDetail>
  }
}
