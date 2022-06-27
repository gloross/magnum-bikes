export default class contactFormBuilder {
  constructor(prop_element = null, prop_currentStepIdx = 0) {
    this.element = prop_element
    if (prop_element) {
      this.steps = [...this.element.querySelectorAll('.js-step')]
      this.formControls = [...this.element.querySelectorAll('.js-form-control')]
      this.btnPrev = this.element.querySelector('.js-btn-prev')
      this.btnNext = this.element.querySelector('.js-btn-next')

      this.currentStep = this.element.querySelector('.js-step-current')
      this.totalSteps = this.element.querySelector('.js-total-steps')

      this.progressBar = this.element.querySelector('.js-progress-bar')
      this.currentStepIdx = prop_currentStepIdx
      this.btnReload = document.querySelectorAll('.js-btn-start-over')
      this.quiz = document.querySelector('.js-quiz')
      this.btnStepAgree = document.querySelector('.js-step-agree')

      this.init()
    }
  }

  init() {
    this.showStep(this.currentStepIdx)
    this.addEvents()

    if (
      this.currentStepIdx == 0 &&
      this.btnNext.classList.contains('js-quiz-btn')
    ) {
      this.btnNext.innerText = this.btnNext.getAttribute('data-step-first')
    }
  }

  showStep(prop_stepIdx = 0) {
    const stepIdx = prop_stepIdx

    this.steps[stepIdx].classList.add('is-active')

    this.btnPrev.classList[stepIdx === 0 ? 'remove' : 'add']('is-active')
    this.btnNext.innerText =
      this.btnNext.dataset[
        stepIdx === this.steps.length - 1 ? 'finalStepText' : 'stepText'
      ]

    //this.currentStep.innerHTML = stepIdx + 1;
    //this.totalSteps.innerHTML  = this.steps.length;

    //this.updateProgressBar(stepIdx)
  }

  prevNext(prop_value = 0) {
    this.btnNext.classList.add('submit-btn')
    const value = prop_value

    if (value === 1 && !this.validate()) {
      return false
    }

    this.steps[this.currentStepIdx].classList.remove('is-active')
    this.currentStepIdx += value

    if (this.currentStepIdx >= this.steps.length) {
      this.element.submit()
      return false
    }

    this.showStep(this.currentStepIdx)
  }

  validate() {
    const currentStepRequiredElements = [
      ...this.steps[this.currentStepIdx].querySelectorAll('[required]'),
    ]
    let valid = true

    for (let element of currentStepRequiredElements) {
      if (element.value === null || element.value.trim() === '') {
        element.closest('.js-input-group').classList.add('has-error')
        valid = false
      }
    }

    return valid
  }

  clearErrors(e) {
    e.target.closest('.js-input-group').classList.remove('has-error')
  }

  updateProgressBar(prop_stepIdx = 0) {
    const percentage = prop_stepIdx / this.steps.length

    this.progressBar.style.transform = `scaleX(${
      percentage === 0 ? '0.01' : percentage
    })`
  }

  addEvents() {
    for (let formControl of this.formControls) {
      formControl.addEventListener('keyup', this.clearErrors.bind(this))
      formControl.addEventListener('change', this.clearErrors.bind(this))
    }
    this.btnPrev.addEventListener('click', this.prevNext.bind(this, -1))
    this.btnNext.addEventListener('click', this.prevNext.bind(this, 1))

    this.btnNext.addEventListener('click', (e) => {
      if (this.currentStepIdx == 4 || this.currentStepIdx == 5) {
        this.btnNext.classList.add('is-hidden')
      } else {
        this.btnNext.classList.remove('is-hidden')
      }

      if (this.currentStepIdx == 1) {
        this.btnNext.closest('.quiz').classList.add('first-step')
      } else if (this.currentStepIdx == 2) {
        this.btnNext.closest('.quiz').classList.add('second-step')
        this.btnNext.closest('.quiz').classList.remove('first-step')
      } else if (this.currentStepIdx == 3) {
        this.btnNext.closest('.quiz').classList.add('third-step')
        this.btnNext.closest('.quiz').classList.remove('second-step')
      } else if (this.currentStepIdx == 4) {
        this.btnNext.closest('.quiz').classList.add('five-step')
        this.btnNext.closest('.quiz').classList.remove('third-step')
      } else {
        this.quiz.classList.remove(
          'first-step',
          'second-step',
          'third-step',
          'five-step'
        )
      }
    })

    this.btnReload.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentStepIdx = 0
        this.btnNext.innerText = this.btnNext.getAttribute('data-step-first')
        this.quiz.classList.remove('first-step', 'second-step', 'third-step')
        this.btnNext.classList.remove('is-hidden')
      })
    })

    this.btnStepAgree.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let btnTrigger = document.querySelector('.js-btn-next')
      btnTrigger.click()
    })
  }
}
