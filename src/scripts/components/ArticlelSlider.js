/**
 * Carousel Gallery Slider component
 * Slider for Carousel Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'

import Swiper, { Navigation } from 'swiper'

export default class ArticleSliderInit {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{sliderArticle: string, options: object}}
     */
    this.DOM = {
      sliderArticle: '.js-article-slider',
    }

    this.options = {
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: true,
      navigation: {
        nextEl: '.js-arrow-next-article',
        prevEl: '.js-arrow-prev-article',
      },
      breakpoints: {
        567: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.sliderArticle)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.sliderArticle === null) {
      return
    }

    this.sliderArticleMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  sliderArticleMethod() {
    let article = new Swiper(this.DOM.sliderArticle, this.options)
  }
}

const articleGallery = new ArticleSliderInit()
