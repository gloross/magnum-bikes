/**
 * Finds closest parent element that matches the selector
 * @param {DOMElement} elem - dom element.
 * @param {String} selector - css selector
 */

export default function getClosest(elem, selector) {
  let elemTemp = elem

  for (; elemTemp && elemTemp !== document; elemTemp = elemTemp.parentNode) {
    if (elemTemp.matches(selector)) {
      return elemTemp
    }
  }

  return null
}
