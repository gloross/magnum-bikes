import contactFormBuilder from './contactFormBuilder'

export default class quizForm {
  constructor() {
    /**
     * Fetch form
     * @type {Element}
     */
    this.DOM = {
      quizForm: '.js-quiz-form',
      quizBtn: '.js-quiz-btn',
    }

    this.quizForm = document.querySelector(this.DOM.quizForm)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.quizForm === null) {
      return
    }
    // this.quizFormMethod()

    let btnReload = document.querySelectorAll('.js-btn-start-over'),
      quizStep = document.querySelectorAll('.js-step')
    btnReload.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        quizStep.forEach((el) => {
          el.classList.remove('is-active')
          if (el.classList.contains('quiz__step--one')) {
            el.classList.add('is-active')
          }
        })
      })
    })
  }

  /**
   * Rental method
   * Initialize Rental
   */
  quizFormMethod() {
    // if (condition) {

    // }
    const quizFormStep = new contactFormBuilder(
      document.querySelector('#quiz-form-id'),
      0
    )
  }
}

new quizForm()
const quizFormStep = new contactFormBuilder(
  document.querySelector('#quiz-form-id'),
  0
)
