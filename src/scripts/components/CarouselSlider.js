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

export default class CarouselSliderInit {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{sliderCarousel: string, options: object}}
     */
    this.DOM = {
      sliderCarousel: '.js-carousel-slider',
    }

    this.options = {
      spaceBetween: false,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: true,
      centeredSlides: true,
      initialSlide: 1,
      slidesOffsetBefore: 700, 


      scrollbar: {
        el: '.js-carousel-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        768: {
          spaceBetween: 32,
          slidesPerView: 2,
        },
        360: {
          slidesOffsetBefore: 0, 
          centeredSlides: true
        }
      },
      
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.sliderCarousel)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.sliderCarousel === null) {
      return
    }

    this.sliderCarouselMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  sliderCarouselMethod() {
    console.log('carousel initialized!')
    let carouselSlider = new Swiper(this.DOM.sliderCarousel, this.options)
  }
}

const carouselSliderGallery = new CarouselSliderInit()
