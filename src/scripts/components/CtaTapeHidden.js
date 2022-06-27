export default class CtaTapeHidden {
  constructor() {}

  init() {
    const headerEl = document.querySelectorAll('.cta')
    const sentinalEl = document.querySelector('.js-select-class')
    const sentinalEl1 = document.querySelector('.js-off-cta')

    if (sentinalEl === null) {
      return
    }

    const handler = (entries) => {
      if (entries[0].isIntersecting) {
        headerEl.forEach((element) => {
          element.classList.add('enabled')
        })
      } else {
        headerEl.forEach((element) => {
          element.classList.remove('enabled')
        })
      }
    }
    // create the observer
    const observer = new window.IntersectionObserver(handler)
    // give the observer some dom nodes to keep an eye on
    observer.observe(sentinalEl)
    observer.observe(sentinalEl1)
  }
}
