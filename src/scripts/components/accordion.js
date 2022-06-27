// export default class Accordion {
//   constructor() {
//     /**
//      * Products component DOM selectors
//      * @type {{accordionContainer: string}}
//      */
//     this.DOM = {
//       accordionContainer: '.js-accordion',
//     }

//     this.$accordionBtn = document.querySelectorAll('.js-accordion-trigger')
//     this.$accordionBtnLvlTwo = document.querySelectorAll(
//       '.js-accordion-trigger-lvl-two'
//     )
//   }

//   init() {
//     if (this.accordionContainer === null) {
//       return
//     }
//     this.accordion()
//   }

//   accordion() {
//     let _self = this

//     _self.$accordionBtn.forEach((item) => {
//       item.addEventListener('click', (e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         // let parent = e.target.parentNode
//         // let child = parent.querySelector('.js-accordion-content')
//         // let h = child.getBoundingClientRect().height + 'px'
//         // child.style.height = h
//         if (e.target.classList.contains('active')) {
//           e.target.classList.remove('active')
//           e.target.nextElementSibling.classList.remove('active')
//           e.target.nextElementSibling.style.maxHeight = null
//         } else {
//           this.$accordionBtn.forEach((elem) => {
//             elem.classList.remove('active')
//             elem.nextElementSibling.classList.remove('active')
//             elem.nextElementSibling.style.maxHeight = null
//             e.target.nextElementSibling.style.maxHeight =
//               e.target.nextElementSibling.scrollHeight + 'px'
//           })
//           e.target.classList.add('active')
//           e.target.nextElementSibling.classList.add('active')
//           e.target.nextElementSibling.style.maxHeight =
//             e.target.nextElementSibling.scrollHeight + 'px'
//         }
//       })
//     })

//     _self.$accordionBtnLvlTwo.forEach((item) => {
//       item.addEventListener('click', (e) => {
//         e.preventDefault()
//         e.stopPropagation()

//         if (e.target.classList.contains('active')) {
//           e.target.classList.remove('active')
//           e.target.nextElementSibling.classList.remove('active')
//           e.target.nextElementSibling.style.maxHeight = null
//         } else {
//           this.$accordionBtnLvlTwo.forEach((elem) => {
//             elem.classList.remove('active')
//             elem.nextElementSibling.classList.remove('active')
//             elem.nextElementSibling.style.maxHeight = null
//             e.target.nextElementSibling.style.maxHeight =
//               e.target.nextElementSibling.scrollHeight + 'px'
//           })
//           e.target.classList.add('active')
//           e.target.nextElementSibling.classList.add('active')
//           e.target.nextElementSibling.style.maxHeight =
//             e.target.nextElementSibling.scrollHeight + 'px'
//         }
//       })
//     })
//   }
// }

// new Accordion().init()

// send baby as an argument only if its 3 LVLS ACCORDION
export default class Accordion {
  constructor($parentElement, $childElement, $babyElement) {
    let accordionWrapper = document.querySelectorAll($parentElement)

    if (accordionWrapper) {
      accordionWrapper.forEach((el) => {
        this.init(el, $childElement)
      })
    }
    if ($babyElement) {
      let babyTriggers = document.querySelectorAll($babyElement)
      this.accordion(babyTriggers)
    }
  }

  init(accordionWrapper, childTrigger) {
    let accordionTrigger = accordionWrapper.querySelectorAll(childTrigger)
    this.accordion(accordionTrigger)
  }

  accordion(accordionTrigger) {
    accordionTrigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target.classList.contains('active')) {
          e.target.classList.remove('active')
          e.target.nextElementSibling.classList.remove('active')
          e.target.nextElementSibling.style.maxHeight = null
        } else {
          accordionTrigger.forEach((elem) => {
            elem.classList.remove('active')
            elem.nextElementSibling.classList.remove('active')
            elem.nextElementSibling.style.maxHeight = null
            e.target.nextElementSibling.style.maxHeight =
              e.target.nextElementSibling.scrollHeight + 'px'
          })
          e.target.classList.add('active')
          e.target.nextElementSibling.classList.add('active')
          e.target.nextElementSibling.style.maxHeight =
            e.target.nextElementSibling.scrollHeight + 'px'
        }
      })
    })
  }
}

new Accordion(
  '.js-accordion',
  '.js-accordion-trigger',
  '.js-accordion-trigger-lvl-two'
)
new Accordion('.js-accordion-top-question', '.js-accordion-trigger')

if (window.innerWidth < 768) {
  new Accordion('.js-accordion-footer', '.js-accordion-trigger-footer')
}
