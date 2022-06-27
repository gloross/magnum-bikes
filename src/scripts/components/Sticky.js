export default class Sticky {
  constructor() {
    this.stickySelectWrapper = document.querySelector('.js-scroll-select')
    this.stickyCardWrapper = document.querySelector('.js-scroll-card')
  }

  init() {
    let stickySelectWrapperEl = this.stickySelectWrapper
    let stickyCardWrapperEl = this.stickyCardWrapper
    document.addEventListener('DOMContentLoaded', () => {
      stickySelectWrapperEl?.addEventListener('scroll', function () {
        stickyCardWrapperEl.scrollLeft =
          document.querySelector('.js-scroll-select').scrollLeft
      })
      stickyCardWrapperEl?.addEventListener('scroll', function () {
        stickySelectWrapperEl.scrollLeft =
          document.querySelector('.js-scroll-card').scrollLeft
      })
    })
  }
}

new Sticky().init()
