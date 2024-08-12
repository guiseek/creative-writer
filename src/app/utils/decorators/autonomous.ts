// prettier-ignore
export abstract class CustomElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return []
  }

  shadow!: ShadowRoot

  connectedCallback?(): void
  attributeChangedCallback?(
    name: string, prev?: string, next?: string
  ): void
  disconnectedCallback?(): void
}

interface CustomConstructor extends CustomElementConstructor {
  prototype: CustomElement
  new (...args: any[]): CustomElement
}

export const autonomous = (tag: `${string}-${string}`) => {
  return <T extends CustomConstructor>(target: T) => {
    customElements.define(tag, target)
  }
}
