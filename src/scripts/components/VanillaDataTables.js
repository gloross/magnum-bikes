import vanillaDataTables from 'vanilla-datatables'

const table = document.querySelector('.js-dashbord-orders-table')
if (table) {
  new vanillaDataTables(table, {
    perPage: 5,
    labels: {
      placeholder: 'Type to search....', // The search input placeholder
      perPage: ' {select}', // per-page dropdown label
      noRows: 'No entries found', // Message shown when there are no search results
      info: 'Showing {start} to {end} of {rows} entries', //
    },
    layout: {
      top: "<h2 class='table-title'>Orders</h2> {select}{search}",
      bottom: '{pager}',
    },
  })
}

export default class dataTabelOrdersDetails {
  constructor() {
    this.orderDetailsWrapper = document.querySelector(
      '.js-dataTable-poput-custom'
    )
    this.orderDetailsOverlay = document.querySelector(
      '.js-dataTable-poput-custom-overlay'
    )
    this.orderDetailsOpen = document.querySelectorAll(
      '.js-dataTable-poput-custom-open'
    )
    this.orderDetailsClose = document.querySelector(
      '.js-dataTable-poput-custom-close'
    )
  }

  init() {
    if (this.orderDetailsWrapper) {
      this.orderDetailsPopup()
    }
  }

  orderDetailsPopup() {
    this.orderDetailsOpen.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault()
        if (!this.orderDetailsWrapper.classList.contains('active')) {
          this.orderDetailsWrapper.classList.add('active')
          this.orderDetailsOverlay.classList.add('active')
          document.querySelector('html').classList.add('overflow-hidden')
        }
      })
    })

    this.orderDetailsOverlay.addEventListener('click', () => {
      if (this.orderDetailsWrapper.classList.contains('active')) {
        this.orderDetailsWrapper.classList.remove('active')
        this.orderDetailsOverlay.classList.remove('active')
        document.querySelector('html').classList.remove('overflow-hidden')
      }
    })

    this.orderDetailsClose.addEventListener('click', (e) => {
      e.preventDefault()
      if (this.orderDetailsWrapper.classList.contains('active')) {
        this.orderDetailsWrapper.classList.remove('active')
        this.orderDetailsOverlay.classList.remove('active')
        document.querySelector('html').classList.remove('overflow-hidden')
      }
    })
  }
}

new dataTabelOrdersDetails().init()
