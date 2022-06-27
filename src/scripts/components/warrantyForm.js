import contactFormBuilder from './contactFormBuilder'

export default class warrantyFormBuilder {
  constructor() {
    /**
     * Fetch form
     * @type {Element}
     */
    this.DOM = {
      warrantyFormEl: '.js-warranty-form',
      inputPopupEl: '.js-input-popup',
      inputPopupOpenEl: '.js-open-popup',
      inputPopupCloseEl: '.js-close-popup',
    }
    this.warrantyForm = document.querySelector(this.DOM.warrantyFormEl)
    this.inputPopup = document.querySelector(this.DOM.inputPopupEl)
    this.inputPopupOpen = document.querySelector(this.DOM.inputPopupOpenEl)
    this.inputPopupClose = document.querySelector(this.DOM.inputPopupCloseEl)

    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.warrantyForm === null) {
      return
    }
    // this.warrantyFormMethod()
    this.inputPopupMethod()
  }

  /**
   * warranty method, input popup method
   * Initialize warranty
   */
  warrantyFormMethod() {
    const warrantyForm = new contactFormBuilder(
      document.querySelector('#warranty-form-id'),
      0
    )
  }

  inputPopupMethod() {
    if (this.inputPopupOpen) {
      this.inputPopupOpen.addEventListener('click', () => {
        this.inputPopup.classList.toggle('is-active')
      })
    }
    if (this.inputPopupClose) {
      this.inputPopupClose.addEventListener('click', () => {
        this.inputPopup.classList.remove('is-active')
      })
    }
  }
}

new warrantyFormBuilder()
const warrantyForm = new contactFormBuilder(
  document.querySelector('#warranty-form-id'),
  0
)
