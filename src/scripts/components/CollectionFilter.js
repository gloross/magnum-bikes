export default class CollectionFilter {
  constructor() {
    this.DOM = {}
    this.DOM.collectionGrid = '.js-grid-trigger'
    this.collectionGrid = document.querySelector(this.DOM.collectionGrid)
    this.colectionFilterTrigger =
      document.querySelectorAll('.js-filter-trigger')
    this.collectionFilterWrapper = document.querySelector(
      '.js-collection-filter-wrapper'
    )
    this.collectionFilterOverlay = document.querySelector(
      '.js-collection-filter-overlay'
    )
    this.html = document.querySelector('html')
    this.infoPopupTrigger = document.querySelectorAll('.js-info-popup-trigger')

    this.init()
  }

  init() {
    console.log('CollectionFilter is initialized')
    if (this.collectionGrid) {
      this.collectionDeploy()
    }
    this.collectionFilterSideBar()

    this.infoPopup()

    this.clickFilter()
  }

  collectionDeploy() {
    let collectionList = document.querySelector('.js-list-trigger')
    let collectionWrapper = document.querySelector('.js-grid-list-wrapper')

    this.collectionGrid.addEventListener('click', (e) => {
      e.preventDefault()
      if (!collectionWrapper.classList.contains('collection-grid')) {
        collectionWrapper.classList.add('collection-grid')
      }
      return
    })

    collectionList.addEventListener('click', (e) => {
      e.preventDefault()
      if (collectionWrapper.classList.contains('collection-grid')) {
        collectionWrapper.classList.remove('collection-grid')
      }
      return
    })
  }

  collectionFilterSideBar() {
    console.log('collectionFIlterSideBar() function start')
    this.colectionFilterTrigger.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault()

        if (this.collectionFilterWrapper.classList.contains('is-active')) {
          this.collectionFilterWrapper.classList.remove('is-active')
          this.collectionFilterOverlay.classList.remove('is-active')
          this.html.classList.remove('overflow-hidden')
        } else {
          this.collectionFilterWrapper.classList.add('is-active')
          this.collectionFilterOverlay.classList.add('is-active')
          this.html.classList.add('overflow-hidden')
        }
      })
      this.collectionFilterOverlay.addEventListener('click', () => {
        if (this.collectionFilterOverlay.classList.contains('is-active')) {
          this.collectionFilterWrapper.classList.remove('is-active')
          this.collectionFilterOverlay.classList.remove('is-active')
          this.html.classList.remove('overflow-hidden')
        }
      })
    })
  }

  infoPopup() {
    this.infoPopupTrigger.forEach((item) => {
      if (window.innerWidth > 991) {
        item.addEventListener('mouseover', () => {
          item.nextElementSibling.classList.add('is-active')
        })
        item.addEventListener('mouseout', () => {
          item.nextElementSibling.classList.remove('is-active')
        })
      } else {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          item.nextElementSibling.classList.toggle('is-active')
        })
      }
    })
  }

  clickFilter() {
    const checkBox = document.querySelectorAll('.filter-group-display__list-item input[type=checkbox]');
    const checkBoxArray = Array.from(checkBox);
    checkBoxArray.forEach(function(check) {
      check.addEventListener('change', function() {
        if (this.checked) {
          this.previousElementSibling.classList.add('active');
        } else {
          this.previousElementSibling.classList.remove('active');
        }
      })
    });
  }
}

new CollectionFilter()