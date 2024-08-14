export function s<
  K extends keyof SVGElementTagNameMap,
  A extends SVGElementTagNameMap[K],
>(
  name: K,
  attrs: Partial<A> = {},
  ...children: (string | Node)[]
): SVGElementTagNameMap[K] {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name)
  element.append(...children)
  return Object.assign(element, attrs)
}
