export const isElement = (el: HTMLElement | Element): boolean => !!(el && el.nodeType === Node.ELEMENT_NODE)

export const getAttr = (el: HTMLElement | Element, attr: string): string | null =>
  attr && isElement(el) ? el.getAttribute(attr) : null

export const isTag = (tag: any, name: any): boolean => String(tag).toLowerCase() === String(name).toLowerCase()
