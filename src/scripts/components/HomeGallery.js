/**
 * HomeGallery Slider component
 * Slider for HomeGallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class HomeGallerySlider {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{homeSliderGallery: string, options: object}}
     */
    this.DOM = {
      homeSliderGallery: '.js-home-gallery',
    }

    this.options = {
      spaceBetween: 22,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: true,
      navigation: {
        nextEl: '.js-arrow-next-home-gallery',
        prevEl: '.js-arrow-prev-home-gallery',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.homeSliderGallery)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.homeSliderGallery === null) {
      return
    }

    this.homeSliderGalleryMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  homeSliderGalleryMethod() {
    let carouselSlider = new Swiper(this.DOM.homeSliderGallery, this.options)
  }
}

const homeSliderGallery = new HomeGallerySlider()
