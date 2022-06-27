// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/scss/scrollbar'

import Swiper, { Navigation, Pagination } from 'swiper'

export default class headerNavSlider {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{headerSlider: string, options: object}}
     */
    this.DOM = {
      headerSlider: '.js-header-slider',
    }
    this.options = {
      slidesPerView: 3.3,
      spaceBetween: 32,
      loop: true,
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.headerSlider)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.headerSlider === null) {
      return
    }
    this.headerSliderMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  headerSliderMethod() {
    let headerSlider = new Swiper(this.DOM.headerSlider, this.options)
  }
}

if (window.innerWidth > 991) {
  const headerSlider = new headerNavSlider()
}
