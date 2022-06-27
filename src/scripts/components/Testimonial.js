/**
 * Testimonial Slider component
 * Slider for Testimonial type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class Testimonial {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{testimonial: string, options: object}}
     */
    this.DOM = {
      testimonial: '.js-testimonial',
    }

    this.options = {
      spaceBetween: false,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: false,
      navigation: {
        nextEl: '.js-arrow-next-testimonial',
        prevEl: '.js-arrow-prev-testimonial',
      },
      breakpoints: {
        768: {
          spaceBetween: 52,
          slidesPerView: 2,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.testimonial)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.testimonial === null) {
      return
    }

    this.testimonialMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  testimonialMethod() {
    let carouselSlider = new Swiper(this.DOM.testimonial, this.options)
  }
}

const testimonial = new Testimonial()
