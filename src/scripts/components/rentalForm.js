import contactFormBuilder from './contactFormBuilder'

export default class rentalFormBuilder {
  constructor() {
    /**
     * Fetch form
     * @type {Element}
     */
    this.DOM = {
      rentalFormEl: '.js-rental-form',
    }
    this.rentalForm = document.querySelector(this.DOM.rentalFormEl)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.rentalForm === null) {
      return
    }
    this.rentalFormMethod()
  }

  /**
   * Rental method
   * Initialize Rental
   */
  rentalFormMethod() {
    // if (condition) {

    // }
    const rentalForm = new contactFormBuilder(
      document.querySelector('#rental-form-id'),
      0
    )
  }
}

new rentalFormBuilder()
const rentalForm = new contactFormBuilder(
  document.querySelector('#rental-form-id'),
  0
)
