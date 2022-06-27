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
import 'swiper/css/thumbs'

import Swiper, { Navigation, Pagination, Thumbs, Controller } from 'swiper'

export default class ExploreSlider {
  constructor() {
    /**
     * Product component DOM selectors
     * @type {{sliderExplore: string, options: object}}
     */
    this.DOM = {
      sliderExplore: '.js-explore-slider',
      sliderThumb: '.js-explore-thumb',
      explorePopupContainer: '.js-explore-popup',
      clickToOpenPopup: '.js-click-to-explore-shape',
      closeExplorePopup: '.js-close-explore',
      popupModalEl: '.js-popup-box',
      bodyEl: 'body',
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.sliderExplore)
    this.swiperContainerThumb = document.querySelector(this.DOM.sliderThumb)

    this.clickToExploreContainer = document.querySelector(
      this.DOM.explorePopupContainer
    )

    this.explorePopupBtnOpen = document.querySelectorAll(
      this.DOM.clickToOpenPopup
    )
    this.explorePopupBtnClose = document.querySelectorAll(
      this.DOM.closeExplorePopup
    )

    this.popupModal = document.querySelectorAll(this.DOM.popupModalEl)
    this.body = document.querySelector(this.DOM.bodyEl)

    this.options = {
      slidesPerView: 1,
      navigation: {
        nextEl: '.js-explore-arrow-next',
        prevEl: '.js-explore-arrow-prev',
      },
      controller: {
        by: 'slide',
      },
    }

    this.optionsThumb = {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 60,
      slideToClickedSlide: false,
      controller: {
        by: 'slide',
      },
    }
  }

  /**
   * Init
   */
  init() {
    if (this.swiperContainer === null || this.swiperContainerThumb === null) {
      return
    }

    this.clickToExploreMethod()
  }

  clickToExploreMethod() {
    this.explorePopupBtnOpen.forEach((item, index) => {
      // item.dataset.targetCarousel = item.classList.contains('js-open-popup-mob')
      //  ? 1
      //  : index

      item.addEventListener('click', (e) => {
        //let targetCarousel = item.dataset.targetCarousel
        let targetCarousel = item.id
        console.log(targetCarousel)

        this.DOM.indexEl = item.dataset.targetCarousel

        this.clickToExploreContainer.classList.add('active')
        //this.body.classList.add('active-explore')

        let el = this.clickToExploreContainer.querySelector(
          '[data-target="' + targetCarousel + '"'
        )
        console.log('ad', el)
        el.classList.add('active')
      })
    })

    let carousels = document.querySelectorAll('.js-popup-box[data-target]')
    console.log(carousels, 'carusles')

    let carouselObject = []
    let carouselThumbObject = []

    carousels.forEach((carousel, index) => {
      let previewSlider = carousel.querySelector('.js-explore-slider'),
        thumbnailSlider = carousel.querySelector('.js-explore-thumb')

      let prev = thumbnailSlider.querySelector('.js-explore-arrow-prev'),
        next = thumbnailSlider.querySelector('.js-explore-arrow-next')

      next.addEventListener('click', (e) => {
        if (next.getAttribute('aria-disabled') === 'true') {
          carousel.classList.remove('active')
          if (carousels[index + 1]) {
            carousels[index + 1].classList.add('active')
          }
          console.log(carousels.length, 'length carousel')
          let carouselId = carousel.dataset.target.substr(
            carousel.dataset.target.length - 1
          )
          console.log(carouselId, 'number')
          if (carousels.length == carouselId) {
            this.explorePopupBtnClose.forEach((item) => {
              item.click()
              this.clickToExploreContainer.classList.remove('active')
              this.body.classList.remove('active-explore')
              carousel.classList.remove('active')
            })
          }
        }
      })

      this.options.navigation.nextEl = next
      this.options.navigation.prevEl = prev

      /**
       * Slider method
       * Initialize Swiper slider
       */
      carouselObject[index] = new Swiper(previewSlider, this.options)
      carouselThumbObject[index] = new Swiper(
        thumbnailSlider,
        this.optionsThumb
      )

      carouselObject[index].controller.control = carouselThumbObject[index]
      carouselThumbObject[index].controller.control = carouselObject[index]
    })

    this.explorePopupBtnClose.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        this.clickToExploreContainer.classList.remove('active')
        this.body.classList.remove('active-explore')
        this.popupModal.forEach((element) => {
          element.classList.remove('active')
        })
      })
    })

    document.addEventListener('keydown', function (event) {
      let $explorePopup = document.querySelector('.js-explore-popup'),
        $bodyEl = document.querySelector('body'),
        $popupBoxes = document.querySelectorAll('.js-popup-box')

      if (event.key == '27' || event.key == 'Escape') {
        $explorePopup.classList.remove('active')
        $bodyEl.classList.remove('active-explore')
        $popupBoxes.forEach((element) => {
          element.classList.remove('active')
        })
      }
    })
  }
}

new ExploreSlider().init()
