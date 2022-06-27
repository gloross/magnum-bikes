import validateForm from '../utils/validateForm';

export default class formBisInit {
  constructor() {
    this.form = document.querySelector('.js-form-bis');

    if (!this.form) return;

    this.email = this.form.querySelector('[type="email"]');
    this.subscribeCheckbox = this.form.querySelector('#form-bis-subscribe');
    this.button = this.form.querySelector('[type="submit"]');
    this.variantSelect = document.getElementById('product-select');
    this.currentVariantOption = this.variantSelect.options[this.variantSelect.selectedIndex];
    this.variantId = Number(this.currentVariantOption.value);
    this.variantText = this.currentVariantOption.text;
    this.classes = {
      loading: 'is-loading',
      isSubmitted: 'is-submitted',
      jsPopupBis: 'js-popup-bis'
    }
    this.formPopup = this.form.closest(`.${this.classes.jsPopupBis}`);
    this.product = JSON.parse(document.querySelector('.js-product-json').textContent);

    this.init();
  }

  init() {
    new validateForm(this.form, true);

    this.submitForm();
    this.clearForm();
  }

  submitForm() {
    this.form.addEventListener('form-submit', () => {
      this.currentVariantOption = this.variantSelect.options[this.variantSelect.selectedIndex];
      this.variantId = this.currentVariantOption.value;
      this.ajaxKlaviyo();
    });
  }

  clearForm() {
    if (!this.formPopup) {
      return;
    }

    this.formPopup.addEventListener('popup-close', () => {
      if (this.form.classList.contains(this.classes.isSubmitted)) {
        this.email.value = '';

        setTimeout(() => {
          this.form.classList.remove(this.classes.isSubmitted);
        }, 400);
      }
    });
  }

  ajaxKlaviyo() {
    this.button.classList.add(this.classes.loading);

    fetch('https://a.klaviyo.com/onsite/components/back-in-stock/subscribe', {
      'headers': {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      'body': new URLSearchParams({
        a: Shopify.klaviyoPublicApiKey,
        email: this.email.value,
        platform: 'shopify',
        variant: this.variantId,
        product: this.product.id,
        subscribe_for_newsletter: this.subscribeCheckbox.checked,  // Optional with "g". Defaults to false if omitted.
        g: Shopify.bisListId || ''  // Optional with "subscribe_for_newsletter".
      }),
      'method': "POST",
    })
    .then(response => {
      // Success
      setTimeout(() => {
        this.button.classList.remove(this.classes.loading);
        this.form.classList.add(this.classes.isSubmitted);
      }, 400);

      console.log(response)
    })
    .catch(err => {
      // Error
      console.error(err);

      setTimeout(() => {
        this.button.classList.remove(this.classes.loading);
      }, 400);
    });
  }
}

new formBisInit();
