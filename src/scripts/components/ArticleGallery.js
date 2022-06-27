/**
 * Carousel Gallery Slider component
 * Slider for Carousel Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
import 'swiper/bundle'

// swiper core styles
import 'swiper/css'

// modules styles

import Swiper, { Navigation, Pagination } from 'swiper'

export default class ArticleGalleryInit {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{galleryArticle: string, options: object}}
     */
    this.DOM = {
      galleryArticle: '.js-article-gallery',
    }

    this.options = {
      loop: false,
      slidesPerView: 1,
      pagination: {
        el: '.js-article-gallery-pagination',
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          let names = [null]
          document
            .querySelectorAll('.js-article-gallery .swiper-slide')
            .forEach((item, index) => {
              names.push(item.getAttribute('data-color'))
            })

          let text = "<div class='swiper-pagination'>"
          for (let i = 1; i <= total; i++) {
            if (current === i) {
              text += `<span class="swiper-pagination-bullet active">
              <span class="bullet" style="background-color:${names[i]}"> </span>
              </span>`
            } else {
              text += `<span class="swiper-pagination-bullet">
              <span class="bullet" style="background-color:${names[i]}"> </span>
               </span>`
            }
          }
          text += '</div>'
          return text
        },
      },
    }

    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */
    this.swiperContainer = document.querySelector(this.DOM.galleryArticle)
    this.init()
  }

  /**
   * Init
   */
  init() {
    if (this.DOM.galleryArticle === null) {
      return
    }

    this.galleryArticleMethod()
  }

  /**
   * Slider method
   * Initialize Swiper slider
   */
  galleryArticleMethod() {
    let article = new Swiper(this.DOM.galleryArticle, this.options)
  }
}

const articleGallery = new ArticleGalleryInit()
