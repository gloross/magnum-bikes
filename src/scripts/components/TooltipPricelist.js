import tippy from 'tippy.js'

export default class TooltipPricelist {
  constructor() {}

  init() {
    tippy('.js-tooltip', { arrow: false, placement: 'bottom' })
  }
}
new TooltipPricelist().init()
