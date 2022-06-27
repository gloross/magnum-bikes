export default class PopupInit {
  constructor() {
    this.buttons = document.querySelectorAll('[data-popup-button]');

    this.classes = {
      isVisible: 'is-visible'
    }

    this.init()
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        const type = button.dataset.popupButton;

        if (type == 'close') {
          const popup = button.closest('[data-popup]');

          this.closePopup(popup);
        }

        if (type == 'open') {
          const popupId = button.getAttribute('href');
          const popup = document.querySelector(popupId);

          this.openPopup(popup);
        }
      });
    });
  }

  openPopup(popup) {
    popup.classList.add(this.classes.isVisible);
    popup.dispatchEvent(new Event('popup-open'));
  }

  closePopup(popup) {
    popup.classList.remove(this.classes.isVisible);
    popup.dispatchEvent(new Event('popup-close'));
  }
}

const popups = new PopupInit();
