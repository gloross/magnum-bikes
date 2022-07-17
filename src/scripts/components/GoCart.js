import { formatMoney } from '@shopify/theme-currency/currency'
import 'whatwg-fetch'
import serialize from 'form-serialize'
import locales from '../utils/locales'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default class GoCart {
  constructor(options) {
    const defaults = {
      cartModalFail: '.js-go-cart-modal-fail',
      cartModalFailClose: '.js-go-cart-modal-fail-close',
      cartModal: '.js-go-cart-modal',
      cartModalClose: '.js-go-cart-modal-close',
      cartModalContent: '.js-go-cart-modal-content',
      cartDrawer: '.js-go-cart-drawer',
      cartDrawerContent: '.js-go-cart-drawer-content',
      cartDrawerSubTotal: '.js-go-cart-drawer-subtotal',
      cartDrawerFooter: '.js-go-cart-drawer-footer',
      cartDrawerClose: '.js-go-cart-drawer-close',
      cartMiniCart: '.js-go-cart-mini-cart',
      cartMiniCartContent: '.js-go-cart-mini-cart-content',
      cartMiniCartSubTotal: '.js-go-cart-mini-cart-subtotal',
      cartMiniCartFooter: '.js-go-cart-mini-cart-footer',
      cartTrigger: '.js-go-cart-trigger',
      cartOverlay: '.js-go-cart-overlay',
      cartCount: '.js-go-cart-counter',
      addToCart: '.js-go-cart-add-to-cart',
      removeFromCart: '.js-go-cart-remove-from-cart',
      removeFromCartNoDot: 'js-go-cart-remove-from-cart',
      itemQuantity: '.js-go-cart-quantity',
      itemQuantityPlus: '.js-go-cart-quantity-plus',
      itemQuantityMinus: '.js-go-cart-quantity-minus',
      showGoCart: '.js-show-go-cart',
      cartMode: 'drawer',
      drawerDirection: 'right',
      displayModal: false,
      moneyFormat: '${{amount}}',
    }

    this.defaults = Object.assign({}, defaults, options)

    this.cartModalFail = document.querySelector(this.defaults.cartModalFail)
    this.cartModalFailClose = document.querySelector(
      this.defaults.cartModalFailClose
    )

    this.cartModal = document.querySelector(this.defaults.cartModal)
    this.cartModalClose = document.querySelectorAll(
      this.defaults.cartModalClose
    )
    this.cartModalContent = document.querySelector(
      this.defaults.cartModalContent
    )
    this.cartDrawer = document.querySelector(this.defaults.cartDrawer)
    this.cartDrawerContent = document.querySelector(
      this.defaults.cartDrawerContent
    )
    this.cartDrawerSubTotal = document.querySelector(
      this.defaults.cartDrawerSubTotal
    )
    this.cartDrawerFooter = document.querySelector(
      this.defaults.cartDrawerFooter
    )
    this.cartDrawerClose = document.querySelector(this.defaults.cartDrawerClose)
    this.cartMiniCart = document.querySelector(this.defaults.cartMiniCart)
    this.cartMiniCartContent = document.querySelector(
      this.defaults.cartMiniCartContent
    )
    this.cartMiniCartSubTotal = document.querySelector(
      this.defaults.cartMiniCartSubTotal
    )
    this.cartMiniCartFooter = document.querySelector(
      this.defaults.cartMiniCartFooter
    )
    this.cartTrigger = document.querySelector(this.defaults.cartTrigger)
    this.cartOverlay = document.querySelector(this.defaults.cartOverlay)
    this.cartCount = document.querySelector(this.defaults.cartCount)
    this.addToCart = document.querySelectorAll(this.defaults.addToCart)
    this.removeFromCart = this.defaults.removeFromCart
    this.removeFromCartNoDot = this.defaults.removeFromCartNoDot
    this.itemQuantity = this.defaults.itemQuantity
    this.itemQuantityPlus = this.defaults.itemQuantityPlus
    this.itemQuantityMinus = this.defaults.itemQuantityMinus
    this.cartMode = this.defaults.cartMode
    this.drawerDirection = this.defaults.drawerDirection
    this.displayModal = this.defaults.displayModal
    this.moneyFormat = this.defaults.moneyFormat
    this.showGoCart = document.querySelector(this.defaults.showGoCart)

    this.init()
  }

  get isDrawerMode() {
    return this.cartMode === 'drawer'
  }

  init() {
    this.fetchCart()

    if (this.isDrawerMode) {
      this.setDrawerDirection()
    }

    this.addToCart.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        const formID = item.closest('form').getAttribute('id')
        this.addItemToCart(formID)
      })
    })

    this.cartTrigger.addEventListener('click', (e) => {
      e.preventDefault()
      if (this.isDrawerMode) {
        this.openCartDrawer()
        // document.querySelector('html').style.overflow = 'hidden'
      } else {
        this.openMiniCart()
      }
      this.openCartOverlay()
    })

    this.cartOverlay.addEventListener('click', () => {
      this.closeFailModal()
      this.closeCartModal()
      // document.querySelector('html').style.overflow = 'auto'
      if (this.isDrawerMode) {
        this.closeCartDrawer()
      } else {
        this.closeMiniCart()
      }
      this.closeCartOverlay()
    })

    if (this.isDrawerMode) {
      this.cartDrawerClose.addEventListener('click', () => {
        this.closeCartDrawer()
        this.closeCartOverlay()
        // document.querySelector('html').style.overflow = 'auto'
      })
    }

    if (this.displayModal) {
      this.cartModalClose.forEach((item) => {
        item.addEventListener('click', () => {
          this.closeFailModal()
          this.closeCartModal()
          if (this.isDrawerMode) {
            this.closeCartDrawer()
          } else {
            this.closeMiniCart()
          }
          this.closeCartOverlay()
        })
      })
    }

    this.cartModalFailClose.addEventListener('click', () => {
      this.closeFailModal()
      this.closeCartModal()
      if (this.isDrawerMode) {
        this.closeCartDrawer()
      } else {
        this.closeMiniCart()
      }
      this.closeCartOverlay()
    })

    this.showGoCart.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.isDrawerMode) {
        this.openCartDrawer()
      } else {
        this.openMiniCart()
      }
      this.openCartOverlay()
    });
  }

  fetchCart(callback) {
    window
      .fetch('/cart.js', {
        credentials: 'same-origin',
        method: 'GET',
      })
      .then((response) => response.json())
      .then((cart) => this.fetchHandler(cart, callback))
      .catch((error) => {
        this.ajaxRequestFail()
        throw new Error(error)
      })
  }

  addItemToCart(formID) {
    const form = document.querySelector(`#${formID}`)
    const formData = serialize(form, { hash: true })
    window
      .fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((product) => this.addItemToCartHandler(product))
      .catch((error) => {
        this.ajaxRequestFail()
        throw new Error(error)
      })
  }

  removeItem(line) {
    const quantity = 0
    window
      .fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ quantity, line }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then(() => this.fetchCart())
      .catch((error) => {
        this.ajaxRequestFail()
        throw new Error(error)
      })
  }

  changeItemQuantity(line, quantity) {
    window
      .fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ quantity, line }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then(() => this.fetchCart())
      .catch((error) => {
        this.ajaxRequestFail()
        throw new Error(error)
      })
  }

  cartItemCount(cart) {
    this.cartCount.innerHTML = cart.item_count
  }

  fetchAndOpenCart() {
    this.fetchCart(() => {
      if (this.isDrawerMode) {
        this.openCartDrawer()
      } else {
        this.openMiniCart()
      }
      this.openCartOverlay()
    })
  }

  fetchAndOpenModal(product) {
    this.fetchCart(() => {
      this.renderCartModal(product)
      this.openCartModal()
      this.openCartOverlay()
    })
  }

  fetchHandler(cart, callback) {
    this.cartItemCount(cart)
    if (this.isDrawerMode) {
      if (cart.item_count === 0) {
        this.renderBlankCartDrawer()
        this.cartDrawerFooter.classList.add('is-invisible')
      } else {
        this.renderDrawerCart(cart)
        this.cartDrawerFooter.classList.remove('is-invisible')
        if (typeof callback === 'function') {
          callback(cart)
        }
      }
    } else if (cart.item_count === 0) {
      this.renderBlankMiniCart()
      this.cartMiniCartFooter.classList.add('is-invisible')
    } else {
      this.renderMiniCart(cart)
      this.cartMiniCartFooter.classList.remove('is-invisible')
      if (typeof callback === 'function') {
        callback(cart)
      }
    }
  }

  addItemToCartHandler(product) {
    return this.displayModal
      ? this.fetchAndOpenModal(product)
      : this.fetchAndOpenCart()
  }

  ajaxRequestFail() {
    this.openFailModal()
    this.openCartOverlay()
  }

  renderCartModal(product) {
    this.clearCartModal()
    let productVariant = product.variant_title
    if (productVariant === null) {
      productVariant = ''
    } else {
      productVariant = `(${productVariant})`
    }
    const cartSingleProduct = `
        <div class="go-cart-modal-item">
            <div class="go-cart-item__image" style="background-image: url(${product.image});"></div>
            <div class="go-cart-item__info">
                <a href="${product.url}" class="go-cart-item__title">${product.product_title} ${productVariant}</a> was added to your cart.
            </div>
        </div>
      `
    this.cartModalContent.innerHTML += cartSingleProduct
  }

  renderDrawerCart(cart) {
    this.clearCartDrawer()
    cart.items.forEach((item, index) => {
      let itemVariant = item.variant_title
      if (itemVariant === null) {
        itemVariant = ''
      }

      let disabledClass = '';

      if (item.quantity == 1) {
        disabledClass = ' is-disabled';
      }

      let options = item.options_with_values
      let options_content = ''

      if (options) {
        options.forEach((line) => {
          let url = ''

          if (line.name.includes('olor')) {
            url =
              'https://cdn.shopify.com/s/files/1/0608/6072/7509/files/E_bike_Cart_page_Color_icon.svg'
          }

          if (line.name.includes('attery')) {
            url =
              'https://cdn.shopify.com/s/files/1/0608/6072/7509/files/E_bike_Cart_page_Battery_icon.svg'
          }

          if (line.value != 'Default Title') {
            options_content += `<p>
              ${line.name}: <strong>${line.value}</strong></p>`
          }
        })
      }

      let variant_content = options.length > 0 ? options_content : itemVariant

      const cartSingleProduct = `
        <div class="go-cart-item__single" data-line="${Number(index + 1)}">
            <div class="go-cart-item__info-wrapper">
                <div class="go-cart-item__info-header">
                    <a href="${item.url}" class="go-cart-item__title">${
                      item.product_title
                    }</a>

                    <a href="#" class="go-cart-item__remove ${
                      this.removeFromCartNoDot
                    }">Remove</a>
                </div>
                <a href="${item.url}" class="go-cart-item__image">
                    <div class="go-cart-item__image-inner" style="background-image: url(${
                      item.image
                    });"></div>
                </a>
                <div class="go-cart-item__info">
                    <div class="go-cart-item__variant">${variant_content}</div>
                    <div class="go-cart-item__quantity">
                        <span class="go-cart-item__quantity-label">${locales['sections.cart.quantity']}</span>
                        <div class="go-cart-item__quantity-field">
                            <span class="go-cart-item__quantity-button quantity-minus js-go-cart-quantity-minus${disabledClass}">
                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 0v2H0V0z"/></svg>
                            </span>
                            <input class="go-cart-item__quantity-number js-go-cart-quantity" type="number" value="${
                              item.quantity
                            }" disabled>
                            <span class="go-cart-item__quantity-button quantity-plus js-go-cart-quantity-plus">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4v2H0V4h10Z" fill="currentColor"/><path d="M6 10H4V0h2v10Z" fill="currentColor"/></svg>
                            </span>
                        </div>
                    </div>
                    <div class="go-cart-item__price">${formatMoney(
                      item.line_price,
                      this.moneyFormat
                    )}</div>
                </div>
            </div>
        </div>
      `
      this.cartDrawerContent.innerHTML += cartSingleProduct
    })
    this.cartDrawerSubTotal.innerHTML = formatMoney(
      cart.total_price,
      this.moneyFormat
    )
    this.cartDrawerSubTotal.parentNode.classList.remove('is-invisible')
    const removeFromCart = document.querySelectorAll(this.removeFromCart)
    removeFromCart.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        GoCart.removeItemAnimation(item.closest('[data-line]'))
        const line = item.closest('[data-line]').getAttribute('data-line')
        this.removeItem(line)
      })
    })
    const itemQuantityPlus = document.querySelectorAll(this.itemQuantityPlus)
    itemQuantityPlus.forEach((item) => {
      item.addEventListener('click', () => {
        item.closest('[data-line]').classList.add('is-loading');
        const line =
          item.closest('[data-line]').getAttribute(
            'data-line'
          )
        const quantity =
          Number(item.parentNode.querySelector(this.itemQuantity).value) + 1
        this.changeItemQuantity(line, quantity)
      })
    })
    const itemQuantityMinus = document.querySelectorAll(this.itemQuantityMinus)
    itemQuantityMinus.forEach((item) => {
      item.addEventListener('click', () => {
        item.closest('[data-line]').classList.add('is-loading');
        const line =
          item.closest('[data-line]').getAttribute(
            'data-line'
          )
        const quantity =
          Number(item.parentNode.querySelector(this.itemQuantity).value) - 1
        this.changeItemQuantity(line, quantity)
        if (
          Number(item.parentNode.querySelector(this.itemQuantity).value - 1) ===
          0
        ) {
          GoCart.removeItemAnimation(
            item.closest('[data-line]')
          )
        }
      })
    })
  }

  renderMiniCart(cart) {
    this.clearMiniCart()
    cart.items.forEach((item, index) => {
      let itemVariant = item.variant_title
      if (itemVariant === null) {
        itemVariant = ''
      }

      let disabledClass = '';

      if (item.quantity == 1) {
        disabledClass = ' is-disabled';
      }

      const cartSingleProduct = `
        <div class="go-cart-item__single" data-line="${Number(index + 1)}">
            <div class="go-cart-item__info-wrapper">
                <div class="go-cart-item__info-header">
                    <a href="${item.url}" class="go-cart-item__title">${
                      item.product_title
                    }</a>

                    <a href="#" class="go-cart-item__remove ${
                      this.removeFromCartNoDot
                    }">Remove</a>
                </div>
                <a href="${item.url}" class="go-cart-item__image">
                    <div class="go-cart-item__image-inner" style="background-image: url(${
                      item.image
                    });"></div>
                </a>
                <div class="go-cart-item__info">
                    <div class="go-cart-item__variant">${itemVariant}</div>
                    <div class="go-cart-item__quantity">
                        <span class="go-cart-item__quantity-label">${locales['sections.cart.quantity']}</span>
                        <div class="go-cart-item__quantity-field">
                            <span class="go-cart-item__quantity-button quantity-minus js-go-cart-quantity-minus${disabledClass}">
                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 0v2H0V0z"/></svg>
                            </span>
                            <input class="go-cart-item__quantity-number js-go-cart-quantity" type="number" value="${
                              item.quantity
                            }" disabled>
                            <span class="go-cart-item__quantity-button quantity-plus js-go-cart-quantity-plus">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4v2H0V4h10Z" fill="currentColor"/><path d="M6 10H4V0h2v10Z" fill="currentColor"/></svg>
                            </span>
                        </div>
                    </div>
                    <div class="go-cart-item__price">${formatMoney(
                      item.line_price,
                      this.moneyFormat
                    )}</div>
                </div>
            </div>
        </div>
      `
      this.cartMiniCartContent.innerHTML += cartSingleProduct
    })
    this.cartMiniCartSubTotal.innerHTML = formatMoney(
      cart.total_price,
      this.moneyFormat
    )
    this.cartMiniCartSubTotal.parentNode.classList.remove('is-invisible')
    const removeFromCart = document.querySelectorAll(this.removeFromCart)
    removeFromCart.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        GoCart.removeItemAnimation(item.closest('[data-line]'))
        const line = item.closest('[data-line]').getAttribute('data-line')
        this.removeItem(line)
      })
    })
    const itemQuantityPlus = document.querySelectorAll(this.itemQuantityPlus)
    itemQuantityPlus.forEach((item) => {
      item.addEventListener('click', () => {
        item.closest('[data-line]').classList.add('is-loading');
        const line =
          item.closest('[data-line]').getAttribute(
            'data-line'
          )
        const quantity =
          Number(item.parentNode.querySelector(this.itemQuantity).value) + 1
        this.changeItemQuantity(line, quantity)
      })
    })
    const itemQuantityMinus = document.querySelectorAll(this.itemQuantityMinus)
    itemQuantityMinus.forEach((item) => {
      item.addEventListener('click', () => {
        item.closest('[data-line]').classList.add('is-loading');
        const line =
          item.closest('[data-line]').getAttribute(
            'data-line'
          )
        const quantity =
          Number(item.parentNode.querySelector(this.itemQuantity).value) - 1
        this.changeItemQuantity(line, quantity)
        if (
          Number(item.parentNode.querySelector(this.itemQuantity).value - 1) ===
          0
        ) {
          GoCart.removeItemAnimation(
            item.closest('[data-line]')
          )
        }
      })
    })
  }

  renderBlankCartDrawer() {
    this.cartDrawerSubTotal.parentNode.classList.add('is-invisible')
    this.clearCartDrawer()
    this.cartDrawerContent.innerHTML =
      '<div class="go-cart__empty sub-h2">Your cart is empty!</div>'
  }

  renderBlankMiniCart() {
    this.cartMiniCartSubTotal.parentNode.classList.add('is-invisible')
    this.clearMiniCart()
    this.cartMiniCartContent.innerHTML =
      '<div class="go-cart__empty">Your cart is empty!</div>'
  }

  clearCartDrawer() {
    this.cartDrawerContent.innerHTML = ''
  }

  clearMiniCart() {
    this.cartMiniCartContent.innerHTML = ''
  }

  clearCartModal() {
    this.cartModalContent.innerHTML = ''
  }

  openCartDrawer() {
    this.cartDrawer.classList.add('is-open')
    disableBodyScroll('.js-go-cart-drawer-content', {
      allowTouchMove: (el) => el.tagName === 'TEXTAREA',
    });
  }

  closeCartDrawer() {
    this.cartDrawer.classList.remove('is-open')
    clearAllBodyScrollLocks();
  }

  openMiniCart() {
    this.cartMiniCart.classList.add('is-open')
    disableBodyScroll('.js-go-cart-drawer-content', {
      allowTouchMove: (el) => el.tagName === 'TEXTAREA',
    });
  }

  closeMiniCart() {
    this.cartMiniCart.classList.remove('is-open')
    clearAllBodyScrollLocks();
  }

  openFailModal() {
    this.cartModalFail.classList.add('is-open')
  }

  closeFailModal() {
    this.cartModalFail.classList.remove('is-open')
  }

  openCartModal() {
    this.cartModal.classList.add('is-open')
  }

  closeCartModal() {
    this.cartModal.classList.remove('is-open')
  }

  openCartOverlay() {
    this.cartOverlay.classList.add('is-open')
  }

  closeCartOverlay() {
    this.cartOverlay.classList.remove('is-open')
  }

  static removeItemAnimation(item) {
    item.classList.add('is-invisible')
  }

  setDrawerDirection() {
    this.cartDrawer.classList.add(`go-cart__drawer--${this.drawerDirection}`)
  }
}

new GoCart({
  cartMode: 'drawer', //drawer or mini-cart
  drawerDirection: 'right', //cart drawer from left or right
  displayModal: false, //display success modal when adding product to cart
  moneyFormat: '${{amount}}', //template for money format when displaying money
})
