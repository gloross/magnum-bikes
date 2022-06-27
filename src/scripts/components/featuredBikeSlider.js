/**
 * Carousel Gallery Slider component
 * Slider for Carousel Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/scss/scrollbar'

import Swiper, { Navigation, Pagination } from 'swiper'

export default class FeaturedSliderInit {
  constructor() {
    /**
     * Featured component DOM selectors
     * @type {{sliderFeatured: string, options: object}}
     */
    this.DOM = {
      sliderFeatured: '.js-featured-slider',
    }

    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,

      pagination: {
        el: '.js-featured-pagination-progress',
        type: 'progressbar',
      },

      breakpoints: {
        768: {
          spaceBetween: 48,
          slidesPerView: 2.62,
          direction: 'horizontal',
          slideToClickedSlide: false,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.sliderFeatured)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.sliderFeatured === null) {
      return
    }

    this.sliderFeaturedMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  sliderFeaturedMethod() {
    let featuredSlider = new Swiper(this.DOM.sliderFeatured, this.options)
  }
}

const featuredSlider = new FeaturedSliderInit()
