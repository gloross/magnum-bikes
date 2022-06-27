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
  constructor(sliderElemenet, sliderValueElement, minRange, maxRange, minMaxValues) {
    /**
     * Product component DOM selectors
     * @type {{noUiSliderEl: string, options: object}}
     */

    this.DOM = {
      noUiSliderEl: sliderElemenet,
      noUiSliderValueElement: sliderValueElement,
      rangeMinValue: minRange,
      rangeMaxValue: maxRange,
      noUIHandle: '.noUi-handle',
    }


    this.rangeSlider = document.querySelector(this.DOM.noUiSliderEl);
    let parent = this.rangeSlider.parentNode;
    this.minValue    = minMaxValues.length > 1 ? parent.querySelector(this.DOM.rangeMinValue): null;
    this.maxValue    = parent.querySelector(this.DOM.rangeMaxValue);

    

    this.options = {
      start: minMaxValues.length > 1 ? [Number(minMaxValues[0]), Number(minMaxValues[1])] : [Number(minMaxValues[0])],
      connect: minMaxValues.length > 1 ? true : [true, false],
      step: 1,
      range: {
        min: [minMaxValues.length > 1 ? Number(minMaxValues[0]) : 1],
        max: [minMaxValues.length > 1 ? (Number(minMaxValues[1])) : Number(minMaxValues[0])],
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
    let slider = this;

    this.nouiSliderWrapper.noUiSlider.on('update', function (values, handle) {

      if (slider.minValue) {
        slider.minValue.innerHTML = values[0];
      }

      if (slider.maxValue) {
        if (slider.rangeSlider.classList.contains('js-filter-height-slider')) {
            let realFeet = ((values[values.length -1]*0.393700) / 12);
            let feet = Math.floor(realFeet);
            let inches = Math.round((realFeet - feet) * 12);
            let prepHtml =  feet + "&prime; " + inches + '&Prime;';
            slider.maxValue.innerHTML = prepHtml;
        } else {
          slider.maxValue.innerHTML = values[values.length - 1];
        }
      }
    })


    let inputMin = slider.rangeSlider.parentNode.querySelector('.js-filter-min');
    let inputMax = slider.rangeSlider.parentNode.querySelector('.js-filter-max');


    if (inputMax) {
      this.rangeSlider.noUiSlider.on('end', function (values, handle) {
        if (inputMin) {
          inputMin.value = Number(values[0]);
        }

        
        if (inputMax) {
          inputMax.value = Number(values[values.length - 1]);
        }
        var event = document.createEvent('HTMLEvents')
        event.initEvent('change', false, true)
        inputMax.dispatchEvent(event);
      })
    }
  }
}

// const selectMeasures = new filterRangeSlider()
