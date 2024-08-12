export function h<
  K extends keyof HTMLElementTagNameMap,
  A extends HTMLElementTagNameMap[K]
>(
  name: K,
  attrs: Partial<A> = {},
  ...children: (string | Text | Element)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(name);
  element.append(...children);
  return Object.assign(element, attrs);
}
