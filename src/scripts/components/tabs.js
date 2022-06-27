export default class Tabs {
  constructor(tabsWrapper) {
    let tabsContainer = document.querySelector(tabsWrapper)
    if (tabsContainer) {
      this.init(tabsContainer)
    }
  }

  init(tabsContainer) {
    let tabsTriggerDesk = tabsContainer.querySelectorAll('li.js-tab-btn')
    let tabsTriggerMob = tabsContainer.querySelectorAll('option.js-tab-btn')

    let tabs = tabsContainer.querySelectorAll('.js-tab-content')

    tabsTriggerDesk.forEach((el1) => {
      el1.addEventListener('click', (e) => {
        e.preventDefault()
        this.removeActiveClass([...tabsTriggerDesk, ...tabsTriggerMob, ...tabs])
        tabs.forEach((el2) => {
          if (el2.dataset.name == el1.dataset.name) {
            el1.classList.add('active')
            el2.classList.add('active')
            let mobOption = document.querySelector(
              `option[data-name="${el1.dataset.name}"]`
            )
            if (mobOption) {
              mobOption.classList.add('active')
              mobOption.selected = true
            }
          }
        })
      })
    })
    let mobOptionSelector = document.querySelector('.js-select-option-mob')
    if (mobOptionSelector) {
      mobOptionSelector.addEventListener('change', () => {
        let selectedOpt =
          mobOptionSelector.options[mobOptionSelector.selectedIndex]
        this.removeActiveClass([...tabsTriggerDesk, ...tabsTriggerMob, ...tabs])
        selectedOpt.classList.add('active')

        tabs.forEach((el) => {
          if (el.dataset.name == selectedOpt.dataset.name) {
            el.classList.add('active')
            let deskOption = document.querySelector(
              `li[data-name="${el.dataset.name}"]`
            )
            deskOption.classList.add('active')
          }
        })
      })
    }
  }

  removeActiveClass(elements) {
    elements.forEach((el) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active')
      }
    })
  }
}

new Tabs('.js-compare-e-bikes')
new Tabs('.js-tabs-videos')
new Tabs('.js-tabs-measures')
new Tabs('.js-nav-category-tabs')
new Tabs('.js-tabs-pricelist')
new Tabs('.js-tabs-top-question')
new Tabs('.js-tabs-question')
