/**
 * Article Slider component
 * Slider for Article type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class LearningSlider {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{LearningSlider: string, options: object}}
     */
    this.DOM = {
      learningSlider: '.js-learning-slider',
    }

    this.options = {
      slidesPerView: 'auto',
      spaceBetween: 20,
      direction: 'horizontal',
      loop: false,
      scrollbar: {
        el: '.js-carousel-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        567: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 'auto',
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.learningSlider)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.learningSlider === null) {
      return
    }

    this.learningSliderMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  learningSliderMethod() {
    let carouselSlider = new Swiper(this.DOM.learningSlider, this.options)
  }
}

const learningSlider = new LearningSlider()
