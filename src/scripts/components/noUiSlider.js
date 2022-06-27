/**
 * noUiSlider Slider component
 * Slider for Measurs type of section. Uses Swiper as a dependency.
 */
// import noUiSlider from 'nouislider'
// Or the namespace:
// import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css'
import noUiSlider from 'nouislider'

export default class noUiSliderInit {
  constructor() {
    /**
     * Product component DOM selectors
     * @type {{noUiSliderEl: string, options: object}}
     */
    this.DOM = {
      noUiSliderEl: '.js-select-measures',
      noUiSliderValueElement: '.js-select-value',
      noUIHandle: '.noUi-handle',
      noUiSliderEl1: '.js-select-height',
      noUiSliderValueElement1: '.js-select-value-1',
      noUIHandle1: '.noUi-handle-1',
      measuresWrapper: '.js-tabs-measures',
      matchMessage: '.js-match',
      noMatchMessage: '.js-mismatch',
    }

    this.options = {
      start: [22],
      connect: [true, false],
      step: 1,
      range: {
        min: [22],
        max: [36],
      },
      format: {
        to: (v) => v | 0,
        from: (v) => v | 0,
      },
      handleAttributes: [{ 'data-type': 'leg' }],
    }

    this.options1 = {
      start: [58],
      connect: [true, false],
      step: 1,
      range: {
        min: [58],
        max: [82],
      },
      format: {
        to: (v) => v | 0,
        from: (v) => v | 0,
      },
      handleAttributes: [{ 'data-type': 'height' }],
    }

    /**
     * Fetch noUiSlider DOM element
     * @type {Element}
     */
    this.nouiSliderWrapper = document.querySelector(this.DOM.noUiSliderEl)
    this.nouiSliderValue = document.querySelector(
      this.DOM.noUiSliderValueElement
    )
    this.nouiSliderWrapper1 = document.querySelector(this.DOM.noUiSliderEl1)
    this.nouiSliderValue1 = document.querySelector(
      this.DOM.noUiSliderValueElement1
    )
    this.measuresWrapper = document.querySelector(this.DOM.measuresWrapper)

    this.matchMessage = document.querySelector(this.DOM.matchMessage)
    this.noMatchMessage = document.querySelector(this.DOM.noMatchMessage)

    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.nouiSliderWrapper === null && this.nouiSliderWrapper1 === null) {
      return
    }
    this.noUiSliderMethod()
    this.noUiSliderValue()
    this.onChangeTabs()
  }

  /**
   * Slider method
   * Initialize noUiSlider slider
   */

  noUiSliderMethod() {
    let noUiSliderProgress = new noUiSlider.create(
      this.nouiSliderWrapper,
      this.options
    )
    let noUiSliderProgress1 = new noUiSlider.create(
      this.nouiSliderWrapper1,
      this.options1
    )
  }

  onChangeTabs() {
    let tabs = document.querySelectorAll('.js-tab-btn')
    tabs.forEach((t) => {
      t.addEventListener('click', (e) => {
        let name = t.getAttribute('data-name')
        this.noMatchMessage.classList.remove('is-active')
        this.matchMessage.classList.remove('is-active')

        if (name === 'measures-height') {
          this.nouiSliderWrapper1.noUiSlider.reset()
        } else if (name === 'measures-leg') {
          this.nouiSliderWrapper.noUiSlider.reset()
        }
      })
    })
  }

  noUiSliderValue() {
    let self = this
    this.nouiSliderWrapper.noUiSlider.on('update', function (values, handle) {
      self.measuresCheck(values, 'l')
      document.querySelector('.js-select-value').innerHTML = values[handle]
    })
    var handle = this.nouiSliderWrapper.querySelector(this.DOM.noUIHandle)
    this.nouiSliderWrapper1.noUiSlider.on('update', function (values, handle1) {
      self.measuresCheck(values, 'h')
      document.querySelector('.js-select-value-1').innerHTML = values[handle1]
    })
    var handle1 = this.nouiSliderWrapper.querySelector(this.DOM.noUIHandle1)
  }

  measuresCheck(customerInput, type) {
    let minInnerLeg = Number(this.measuresWrapper.dataset.leg)
    let minHeight = Number(this.measuresWrapper.dataset.height)
    let sliderLeg = document.querySelector('[data-type="leg"]')
    let sliderHeight = document.querySelector('[data-type="height"]')
    let legSliderMin = sliderLeg.ariaValueMin
    let legSliderCurrent = sliderLeg.ariaValueNow
    let heightSliderMin = sliderHeight.ariaValueMin
    let heightSliderCurrent = sliderHeight.ariaValueNow

    if (typeof minInnerLeg === 'number' && typeof minHeight === 'number') {
      if (type === 'l' && legSliderMin != legSliderCurrent) {
        if (minInnerLeg <= customerInput) {
          this.sucessMessage()
        } else {
          this.errorMessage()
        }
      }
      if (type === 'h' && heightSliderMin != heightSliderCurrent) {
        if (minHeight <= customerInput) {
          this.sucessMessage()
        } else {
          this.errorMessage()
        }
      }
    }
  }
  sucessMessage() {
    this.matchMessage.classList.add('is-active')
    this.noMatchMessage.classList.remove('is-active')
  }
  errorMessage() {
    this.noMatchMessage.classList.add('is-active')
    this.matchMessage.classList.remove('is-active')
  }
}

const selectMeasures = new noUiSliderInit()
