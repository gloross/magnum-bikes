export default class MouseFollow {
  constructor() {}

  init() {
    function initMouseFollow(mouseTarget, cursor) {
      let $cursor = document.querySelectorAll(cursor)
      let $mouseTarget = document.querySelectorAll(mouseTarget)

      document.addEventListener('mousemove', function (e) {
        var x = e.clientX
        var y = e.clientY
        $cursor.forEach((item) => {
          item.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
        })
      })

      document.addEventListener('mousemove', function (e) {
        var x = e.clientX
        var y = e.clientY
      })

      $mouseTarget.forEach((item) => {
        item.addEventListener('mouseenter', (e) => {
          let c = item.querySelector('.js-cursor')
          if (c) {
            c.classList.add('active')
          }
        })

        item.addEventListener('mouseleave', (e) => {
          item.classList.remove('active')
          let c = item.querySelector('.js-cursor')
          if (c) {
            c.classList.remove('active')
          }
        })
      })
    }

    initMouseFollow('.js-carousel-slider-mouse-follow', ' .js-cursor')
    if (window.innerWidth > 991) {
      initMouseFollow('.js-header-mouse-follow', ' .js-cursor')
    }
  }
}

if (window.innerWidth > 768) {
  new MouseFollow().init()
}
