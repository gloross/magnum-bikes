export default class Checkout {
  constructor() {
    this.orderTrigger = document.querySelector('.js-order-item-trigger')
    this.orderDropdownWrapper = document.querySelector(
      '.js-order-item-dropdown'
    )
    this.orderImg = document.querySelector('.js-order-img')
  }

  init() {
    if (this.orderTrigger) {
      this.orderDropdown()
    }
  }

  orderDropdown() {
    this.orderTrigger.addEventListener('click', (e) => {
      e.preventDefault()
      this.orderTrigger.classList.toggle('active')
      this.orderDropdownWrapper.classList.toggle('active')

      if (this.orderDropdownWrapper.classList.contains('active')) {
        this.orderImg.classList.add('hidden')
      } else {
        this.orderImg.classList.remove('hidden')
      }
    })
  }
}

new Checkout().init()
