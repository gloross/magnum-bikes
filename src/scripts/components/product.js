import locales from '../utils/locales';

export default class Product {
  constructor() {
    this.productContainer = document.querySelector('.js-product');
    this.productForm = this.productContainer.querySelector('.js-product-form');
    this.productTemplate = document.querySelector('.js-product-json').innerHTML || '{}';
    this.product = JSON.parse(this.productTemplate);
    this.gallery = this.productContainer.querySelector('.js-gallery');
    this.addToCart = this.productForm.querySelector('.js-go-cart-add-to-cart');
    this.backInStock = this.productForm.querySelector('.js-button-bis');
    this.variantTitle = this.productForm.querySelector('.js-public-title');
    this.productSelect = this.productForm.querySelector('#product-select');

    this.classes = {
      isVisible: 'is-visible',
      isHidden: 'is-hidden'
    }

    this.init();
  }

  init() {
    this.handleVariantChange();
  }

  getInventoryQuantity(variantId) {
    const variantOption = this.productSelect.querySelector(`option[value="${variantId}"]`);
    const quantity = variantOption.getAttribute('inventory-quantity') || 0;

    return quantity;
  }

  handleVariantChange() {
    const onVariantSelected = (variant, selector) => {
      const inventoryQuantity = this.getInventoryQuantity(variant.id);
      const hasInventoryManagement = this.productForm.dataset.inventoryManagement;

      this.handleGalleryImages(variant);
      this.refreshVariantTitle(variant);

      if (hasInventoryManagement && inventoryQuantity <= 0 && variant.available) { // Back in Stock
        this.showBackInStock();

      } else if (variant.available) { // Add to cart
        const buttonText = locales['products.buttons.add_to_cart'];
        this.showAddToCart(buttonText);
        this.addToCart.disabled = false;

      } else { // Sold Out
        const buttonText = locales['products.buttons.sold_out'];
        this.showAddToCart(buttonText);
        this.addToCart.disabled = true;
      }
    }

    new Shopify.OptionSelectors('product-select', {
      product: this.product,
      onVariantSelected: onVariantSelected,
      enableHistoryState: true
    });
  }

  handleGalleryImages(currentVariant) {
    if (!this.gallery) {
      return;
    }

    const items = this.gallery.querySelectorAll('li');

    if (items) {
      items.forEach((item) => {
        if (Number(item.dataset.variant) !== currentVariant.id) {
          item.style.display = 'none';
        } else {
          item.style.display = 'block';
        }
      });
    }
  }

  refreshVariantTitle(currentVariant) {
    if (!this.variantTitle) {
      return;
    }

    this.variantTitle.textContent = currentVariant.public_title;
  }

  showAddToCart(buttonText = null) {
    if (buttonText) {
      this.addToCart.querySelector('[data-add-to-cart-text]').innerHTML = buttonText;
    }

    this.addToCart.classList.add(this.classes.isVisible);
    this.addToCart.classList.remove(this.classes.isHidden);

    this.backInStock.classList.add(this.classes.isHidden);
    this.backInStock.classList.remove(this.classes.isVisible);
  }

  showBackInStock(buttonText = null) {
    if (buttonText) {
      this.addToCart.querySelector('[data-add-to-cart-text]').innerHTML = buttonText;
    }

    this.addToCart.classList.add(this.classes.isHidden);
    this.addToCart.classList.remove(this.classes.isVisible);

    this.backInStock.classList.add(this.classes.isVisible);
    this.backInStock.classList.remove(this.classes.isHidden);
  }
}

new Product();
