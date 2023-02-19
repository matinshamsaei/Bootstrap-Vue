import { RX_HASH, RX_HASH_ID, RX_SPACE_SPLIT } from '../constants/regex'
import { getAttr, isTag } from '../utils'
import type { Directive, DirectiveBinding } from 'vue'

const resolveToggleType = (el: HTMLElement): string => {
  if (el.classList.contains('offcanvas')) {
    return 'offcanvas'
  }

  if (el.classList.contains('collapse')) {
    return 'collapse'
  }

  throw Error("Couldn't resolve toggle type")
}

/**
 *
 * @param binding
 * @param el
 * @returns
 */
const getTargets = (binding: DirectiveBinding<string>, el: HTMLElement) => {
  const { modifiers, arg, value } = binding
  // Any modifiers are considered target Ids
  const targets = Object.keys(modifiers || {})

  // If value is a string, split out individual targets (if space delimited)
  const localValue = typeof value === 'string' ? value.split(RX_SPACE_SPLIT) : value

  // Support target Id as link href (`href="#id"`)
  if (isTag(el.tagName, 'a')) {
    const href = getAttr(el, 'href') || ''
    if (RX_HASH_ID.test(href)) {
      targets.push(href.replace(RX_HASH, ''))
    }
  }

  Array.prototype.concat.apply([], [arg, localValue]).forEach((t) => typeof t === 'string' && targets.push(t))

  // Return only unique and truthy target Ids
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
}

/**
 * @external
 */
export default {
  mounted(el, binding: DirectiveBinding<string>): void {
    const targetIds = getTargets(binding, el)
    const targetAttrs: Array<string> = []

    const targetAttr = el.tagName === 'a' ? 'href' : 'data-bs-target'

    targetIds.forEach((targetId) => {
      const target = document.getElementById(targetId)

      if (target !== null) {
        el.setAttribute('data-bs-toggle', resolveToggleType(target))

        targetAttrs.push(`#${targetId}`)
      }
    })

    if (targetAttrs.length > 0) {
      el.setAttribute(targetAttr, targetAttrs.join(','))
    }
  }
} as Directive<HTMLElement>
