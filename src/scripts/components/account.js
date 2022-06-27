export default class Account {
  constructor() {
    this.closeDashboardPopUp = document.querySelector(
      '.js-dashboard-hero-pop-up-close'
    )
    this.dashboardPopUp = document.querySelector('.js-dashboard-hero-pop-up')
    this.personalFormWrapper = document.querySelectorAll('.js-personal-form')
    this.modalWrapper = document.querySelector('.js-modal-wrapper')
    this.modalTriggerOpen = document.querySelectorAll('.js-modal-open')
    this.modalTriggerClose = document.querySelector('.js-modal-close')
    this.modalOverlay = document.querySelector('.js-modal-overlay')
  }

  init() {
    this.personalForm()

    if (this.dashboardPopUp) {
      this.dashboardPopUpRemove()
    }

    if (this.modalTriggerOpen) {
      this.modalPopUp()
    }
  }

  dashboardPopUpRemove() {
    this.closeDashboardPopUp.addEventListener('click', (e) => {
      e.preventDefault()
      this.dashboardPopUp.classList.remove('active')
    })
  }

  personalForm() {
    this.personalFormWrapper.forEach((item) => {
      let btnChange = document.querySelectorAll('.js-personal-btn-change')
      let btnSave = document.querySelectorAll('.js-personal-btn-save')
      let inputField = item.querySelectorAll('.input-field')

      btnChange.forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault()
          if (element.classList.contains('active')) {
            element.classList.remove('active')
            element.nextElementSibling.classList.add('active')
            element.parentElement.parentElement.classList.add('active')
          }
        })
      })
      btnSave.forEach((element) => {
        let inputField = item.querySelector('.input-field')
        element.addEventListener('click', (e) => {
          e.preventDefault()
          if (element.classList.contains('active')) {
            element.classList.remove('active')
            element.previousElementSibling.classList.add('active')
            element.parentElement.parentElement.classList.remove('active')
          }
        })
      })
    })
  }

  modalPopUp() {
    this.modalTriggerOpen.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault()
        if (!this.modalWrapper.classList.contains('active')) {
          this.modalWrapper.classList.add('active')
          this.modalOverlay.classList.add('active')
          document.querySelector('html').classList.add('overflow-hidden')
        }
      })
    })
    if (this.modalTriggerClose) {
      this.modalTriggerClose.addEventListener('click', (e) => {
        e.preventDefault()
        if (this.modalWrapper.classList.contains('active')) {
          this.modalWrapper.classList.remove('active')
          this.modalOverlay.classList.remove('active')
          document.querySelector('html').classList.remove('overflow-hidden')
        }
      })
    }
  }
}

new Account().init()
