/**
 * HomeCarousel Slider component
 * Slider for HomeCarousel type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class HomeCarouselSlider {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{homeSliderCarousel: string, options: object}}
     */
    this.DOM = {
      homeSliderCarousel: '.js-home-carousel',
    }

    this.options = {
      slidesPerView: 1,
      spaceBetween: 16,
      direction: 'horizontal',
      slideToClickedSlide: true,
      loop: true,
      centeredSlides: true,
      initialSlide: 1,
      speed: 550,
      autoplay: 
        {
          delay: 4000,
        },
      breakpoints: {
        768: {
          spaceBetween: 70,
          slidesPerView: 2.6,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.homeSliderCarousel)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.homeSliderCarousel === null) {
      return
    }

    this.homeSliderCarouselMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  homeSliderCarouselMethod() {
    let carouselSlider = new Swiper(this.DOM.homeSliderCarousel, this.options)
  }
}

const homeSliderCarousel = new HomeCarouselSlider()
