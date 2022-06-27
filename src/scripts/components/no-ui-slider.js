import nouislider from 'nouislider/dist/nouislider'
let el = document.querySelector('#no-ui-slider')
nouislider.create(el, {
  start: [20, 80],
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
})
