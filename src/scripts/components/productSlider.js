/**
 * Product Gallery Slider component
 * Slider for Product Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import '../../../assets/component-productSlider.css'
import Swiper, { Navigation, Pagination } from 'swiper'

export default class ProductSliderInit {
  constructor() {
    /**
     * Product component DOM selectors
     * @type {{sliderProduct: string, options: object, productColorVariation: string}}
     */
    this.DOM = {
      sliderProduct: '.js-product-slider',
      productColorVariation: '.js-color-variation',
    }

    this.options = {
      centeredSlides: true,
      centeredSlidesBounds: true,
      slidesPerView: 1,
      direction: 'horizontal',
      freemode: true,
      navigation: {
        nextEl: '.js-swiper-button-next',
        prevEl: '.js-swiper-button-prev',
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.sliderProduct)
    this.colorVariation = document.querySelector(this.DOM.productColorVariation)

    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.swiperContainer === null && this.colorVariation === null) {
      return
    }

    this.sliderProductMethod()
    this.productVariationActive()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  sliderProductMethod() {
    let productSlider = new Swiper(this.swiperContainer, this.options)
  }

  productVariationActive() {
    let $colorOptions = this.colorVariation.querySelectorAll('li')
    $colorOptions.forEach((element) => {
      element.addEventListener('click', (e) => {
        $colorOptions.forEach((element) => {
          element.classList.remove('active')
        })
        element.classList.add('active')
      })
    })
  }
}

const productSliderGallery = new ProductSliderInit()
