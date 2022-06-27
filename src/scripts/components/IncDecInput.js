export default class IncDecInput {
  constructor() {}

  init() {
    document.addEventListener('click', function (event) {
      let clickedElem = event.target

      if (clickedElem.classList.contains('js-number-increase')) {
        let inputWrapper = clickedElem.closest('.js-input-increment'),
          input = clickedElem
            .closest('.js-input-increment')
            .querySelector('.js-input-number'),
          value = parseInt(input.value, 10)

        value = isNaN(value) ? 1 : value
        value++
        input.value = value
        if (value > 1) {
          inputWrapper.classList.remove('disable-decrease')
        }
      } else if (clickedElem.classList.contains('js-number-decrease')) {
        let inputWrapper = clickedElem.closest('.js-input-increment'),
          input = clickedElem
            .closest('.js-input-increment')
            .querySelector('.js-input-number'),
          value = parseInt(input.value, 10)

        value = isNaN(value) ? 2 : value
        value < 2 ? (value = 2) : ''
        value--
        input.value = value

        if (value < 2) {
          inputWrapper.classList.add('disable-decrease')
        } else {
          inputWrapper.classList.remove('disable-decrease')
        }
      }
    })
  }
}

new IncDecInput().init()
