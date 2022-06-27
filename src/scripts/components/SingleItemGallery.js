export default class SingleItemGallery {
  constructor() {
    /**
     * Product component DOM selectors
     * @type {{singleProductGallery: string }}
     */
    this.DOM = {
      singleGalleryBtnEl: '.js-single-gallery-open',
      singleProductGalleryPopupEl: '.js-single-gallery-popup',
      closeSingleGalleryEl: '.js-close-single-gallery',
      bodyEl: 'body',
    }
    /**
     * Fetch product gallery DOM element
     * @type {Element}
     */
    this.singleGalleryBtn = document.querySelectorAll(
      this.DOM.singleGalleryBtnEl
    )
    this.closeSingleGallery = document.querySelectorAll(
      this.DOM.closeSingleGalleryEl
    )
    this.singleProductGalleryPopup = document.querySelector(
      this.DOM.singleProductGalleryPopupEl
    )
    this.body = document.querySelector(this.DOM.bodyEl)

    this.init()
  }

  init() {
    this.singleGalleryBtn.forEach((item) => {
      item.addEventListener('click', (e) => {
        let $popupSingleProduct = e.target.parentElement.querySelector(
          this.DOM.singleProductGalleryPopupEl
        )

        if ($popupSingleProduct) {
          $popupSingleProduct.classList.add('active')
          this.body.classList.add('active-gallery')
        }
      })
    })

    this.closeSingleGallery.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        let $targetPopup = e.target.closest(
          this.DOM.singleProductGalleryPopupEl
        )
        $targetPopup.classList.remove('active')
        this.body.classList.remove('active-gallery')
      })
    })
  }
}

new SingleItemGallery()
