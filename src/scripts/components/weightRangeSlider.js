/**
 * noUiSlider Slider component
 * Slider for Measurs type of section. Uses Swiper as a dependency.
 */
// import noUiSlider from 'nouislider'
// Or the namespace:
// import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css'
import noUiSlider from 'nouislider'

export default class filterRangeSlider {
  constructor() {
    /**
     * Product component DOM selectors
     * @type {{noUiSliderEl: string, options: object}}
     */

    this.DOM = {
      noUiSliderEl: '.js-filter-weight-slider',
      noUiSliderValueElement: '.js-filter-weight-value',
      rangeMaxValue: '.js-filter-range-max',
      noUIHandle: '.noUi-handle',
    }

    this.rangeSlider = document.querySelector(this.DOM.noUiSliderEl)

    this.options = {
      start: [400],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [400],
      },
      format: {
        to: (v) => v | 0,
        from: (v) => v | 0,
      },  
    }

    /**
     * Fetch noUiSlider DOM element
     * @type {Element}
     */
    this.nouiSliderWrapper = document.querySelector(this.DOM.noUiSliderEl)
    this.nouiSliderValue = document.querySelector(
      this.DOM.noUiSliderValueElement
    )

    if (this.rangeSlider) {
      this.init()
    }
  }

  /**
   * Init
   */
  init() {
    this.noUiSliderMethod()
    this.noUiSliderHeighValue()
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
  }

  noUiSliderHeighValue() {
    this.nouiSliderWrapper.noUiSlider.on('update', function (values, handle) {
      document.querySelector('.js-filter-weight-value').innerHTML = values[0]
    })
    let maxWeight = document.querySelector('.js-filter-weight-max')
    if (maxWeight) {
      this.rangeSlider.noUiSlider.on('end', function (values, handle) {
        maxWeight.value = Number(values[0])
        var event = document.createEvent('HTMLEvents')
        event.initEvent('change', false, true)
        maxWeight.dispatchEvent(event)
      })
    }
  }
}

const selectMeasures = new filterRangeSlider()
