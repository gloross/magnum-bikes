import '../../styles/layout/_header.scss'

export default class Nav {
  constructor() {
    this.$nav = document.querySelector('.js-nav')
    this.nav = document.querySelector('.js-header')
    this.$hamburger = document.querySelector('.js-hamburger')
    this.$html = document.querySelector('html')
    this.scrollTop = 0
    this.scrolledDown = false
    this.height = 0
    this.navLinks = document.querySelectorAll('.js-nav-bar')
    this.$navMobile = document.querySelector('.js-nav-mobile')
    this.$announcment = document.querySelector('.js-announcment')
    this.$goBack = document.querySelectorAll('.js-go-back')
  }

  init() {
    this.onScrollStart()
    this.hideOnScroll()

    if (window.innerWidth > 991) {
      this.dropdownMenu()
    }

    if (window.innerWidth < 991) {
      this.toggleMenu()
      this.dropdownMenuMobile()
    }
  }

  onScrollStart() {
    window.removeEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    let self = this

    window.navHeight = this.nav.offsetHeight * 0.7

    setTimeout(() => {
      if (window.pageYOffset > 0) {
        self.nav.classList.add('scroll-start')
      }
    }, 0)

    function onScroll(e) {
      let s = window.pageYOffset

      if (s > 0) {
        self.nav.classList.add('scroll-start')
      } else {
        self.nav.classList.remove('scroll-start')
      }
    }
  }

  hideOnScroll() {
    this.scrollTop = 0
    this.scrolledDown = false

    window.removeEventListener('scroll', onScroll, {
      passive: true,
    })
    window.addEventListener('scroll', onScroll, {
      passive: true,
    })
    let self = this

    window.navHeight = 0
    this.nav.style.position = 'fixed'

    setTimeout(() => {
      if (window.pageYOffset > 0) {
        this.nav.classList.add('scrolled')
        this.nav.style.position = 'fixed'
        setTimeout(() => {
          this.nav.classList.add('scroll-start')
        }, 250)
      }
    }, 0)

    function onScroll(e) {
      let s = window.pageYOffset
      if ((window, innerWidth < 991)) {
        self.scrolledDown = self.scrollTop < s && s > 71
      } else {
        self.scrolledDown = self.scrollTop < s && s > 135
      }

      if (s === 0) {
        self.nav.style.position = 'fixed'
        self.nav.classList.remove('scroll-start')
      } else if (s > 0 && !self.nav.classList.contains('scroll-start')) {
        self.nav.style.position = 'fixed'
        setTimeout(() => {
          self.nav.classList.add('scroll-start')
        }, 0)
      }

      self.scrollTop = s

      if (!self.nav.classList.contains('scrolled') && self.scrolledDown) {
        self.nav.classList.add('scrolled')
      }

      if (self.nav.classList.contains('scrolled') && !self.scrolledDown) {
        self.nav.classList.remove('scrolled')
      }
    }
  }

  dropdownMenu() {
    this.navLinks.forEach((links) => {
      function mouseOver() {
        if (links.nextElementSibling) {
          links.classList.add('is-active')
          links.nextElementSibling.classList.add('is-active')

          if (links.nextElementSibling.classList.contains('is-active')) {
            links.classList.add('is-active')
            document.querySelector('html').style.overflow = 'hidden'
          } else {
            links.classList.remove('is-active')
          }
        } else {
          return
        }
      }

      function mouseLeave() {
        if (links.nextElementSibling) {
          links.classList.remove('is-active')

          if (links.nextElementSibling) {
            links.nextElementSibling.classList.remove('is-active')
            document.querySelector('html').style.overflow = 'unset'
          }
        } else {
          return
        }
      }

      if (links.nextElementSibling) {
        links.nextElementSibling.onmouseover = mouseOver
        links.nextElementSibling.onmouseleave = mouseLeave
      }

      links.onmouseover = mouseOver
      links.onmouseleave = mouseLeave
    })
  }

  dropdownMenuMobile() {
    this.navLinks.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (
          elem.nextElementSibling.classList.contains('header__nav-dropdown')
        ) {
          e.preventDefault()
        }
        elem.nextElementSibling.classList.add('is-active')
        if (!this.$announcment.classList.contains('hidden')) {
          this.$announcment.classList.add('hidden')
        }
      })
    })
    this.$goBack.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        item.parentElement.parentElement.classList.remove('is-active')
        this.$announcment.classList.remove('hidden')
      })
    })
  }

  toggleMenu() {
    let _self = this
    _self.$hamburger.addEventListener('click', (e) => {
      document.querySelector('html').style.overflow = 'hidden'

      if (_self.$hamburger.classList.contains('active')) {
        this.removeActiveClass()
        document.querySelector('html').style.overflow = 'unset'
      }
      e.target.closest('.js-hamburger').classList.toggle('active')
      _self.$navMobile.classList.toggle('active')
      _self.$announcment.classList.toggle('active')
    })
  }

  removeActiveClass() {
    this.$goBack.forEach((item) => {
      item.parentElement.parentElement.classList.remove('is-active')
      this.$announcment.classList.remove('hidden')
    })
  }
}

new Nav().init()
