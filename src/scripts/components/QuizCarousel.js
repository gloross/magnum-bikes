/**
 * QuizCarousel Slider component
 * Slider for QuizCarousel type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class QuizCarouselSlider {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{quizSliderCarousel: string, options: object}}
     */
    this.DOM = {
      quizSliderCarousel: '.js-quiz-carousel',
    }

    this.options = {
      spaceBetween: 16,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: false,
      centeredSlides: true,
      allowTouchMove: false,
      initialSlide: 1,
      noSwipping: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.quizSliderCarousel)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.quizSliderCarousel === null) {
      return
    }
    if (window.innerWidth < 768) {
      this.homeSliderCarouselMethod()
    }
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  homeSliderCarouselMethod() {
    let quizCarouselSlider = new Swiper(
      this.DOM.quizSliderCarousel,
      this.options
    )
  }
}

const quizSliderCarousel = new QuizCarouselSlider()
