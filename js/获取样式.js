function getStyle(element, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element)[attr]
  } else {
    return element.currentStyle[attr]
  }
}
