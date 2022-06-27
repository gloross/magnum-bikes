export default class Select {
  constructor() {
    this.selectUrl = document.querySelectorAll('.js-select-url');

    this.init();
  }

  /**
   * Init
   */
  init() {
    this.selectUrl.forEach(select => {
      select.addEventListener('change', (event) => {
        const url = event.target.value;
        window.location.href = url;
      });
    });
  }
}

new Select();
