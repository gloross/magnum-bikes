/**
 * Handle form validation
 */
export default class validateForm {
  constructor(element = null, customSubmit = false) {

    if (element) {
      this.selectors = {
        form: element,
        fields: element.querySelectorAll('input[required]'),
        selects: element.querySelectorAll('select[required]'),
        requiredFields: element.querySelectorAll('[required]')
      }

      this.classes = {
        valid: 'is-valid',
        notValid: 'is-not-valid',
        animating: 'animating'
      }

      this.customSubmit = customSubmit;
      this.isValid = false;
      this.animationDuration = 400;

      this.init();
    }
  }

  init() {
    this.handleFields(this.selectors.form);
    this.submit();
  }

  validateField(field) {
    // Email RegEx validation
    const validateEmail = (value) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    }

    switch (field.type) {
      case 'email':
        this.isValid = validateEmail(field.value)

        break;

      case 'password':
        if (field.value.length >= 8) {
          this.isValid = true;
        }

        break;

      default:
        if (field.value.length) {
          this.isValid = true;
        }
    }

    if (this.isValid) {
      field.classList.add(this.classes.animating);

      setTimeout(() => {
        field.classList.add(this.classes.valid);
        field.classList.remove(this.classes.notValid, this.classes.animating);
      }, this.animationDuration);
    } else {
      field.classList.add(this.classes.notValid);
      field.classList.remove(this.classes.valid);
    }
  }

  handleFields(form) {
    this.selectors.fields.forEach(field => {
      field.addEventListener('keyup', () => {
        this.validateField(field);
      });
    });

    this.selectors.selects.forEach(select => {
      select.addEventListener('change', () => {
        this.validateField(select);
      });
    });
  }

  validateFields(requiredFields) {
    requiredFields.forEach((field) => {
      let eventName = 'keyup';

      if (field.tagName.toLowerCase() === 'select') {
        eventName = 'change';
      }

      field.dispatchEvent(new Event(eventName));
    });
  }

  validateAndSubmitForm(form, requiredFields) {
    this.validateFields(requiredFields);

    return requiredFields.length === form.querySelectorAll('.is-valid').length;
  }

  submit() {
    this.selectors.form.addEventListener('submit', (event) => {
      // If has error fields
      if (this.validateAndSubmitForm(this.selectors.form, this.selectors.requiredFields)) {
        this.selectors.form.dispatchEvent(new Event('form-submit'));

        // Custom prevent submit
        if (this.customSubmit) {
          event.preventDefault();
        }
      } else {
        // Prevent submit
        event.preventDefault();
      }
    });
  }
}
