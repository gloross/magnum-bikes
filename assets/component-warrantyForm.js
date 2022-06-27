!function(){"use strict";var t,e={8543:function(t,e,s){s.d(e,{Z:function(){return i}});class i{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.element=t,t&&(this.steps=[...this.element.querySelectorAll(".js-step")],this.formControls=[...this.element.querySelectorAll(".js-form-control")],this.btnPrev=this.element.querySelector(".js-btn-prev"),this.btnNext=this.element.querySelector(".js-btn-next"),this.currentStep=this.element.querySelector(".js-step-current"),this.totalSteps=this.element.querySelector(".js-total-steps"),this.progressBar=this.element.querySelector(".js-progress-bar"),this.currentStepIdx=e,this.btnReload=document.querySelectorAll(".js-btn-start-over"),this.quiz=document.querySelector(".js-quiz"),this.btnStepAgree=document.querySelector(".js-step-agree"),this.init())}init(){this.showStep(this.currentStepIdx),this.addEvents(),0==this.currentStepIdx&&this.btnNext.classList.contains("js-quiz-btn")&&(this.btnNext.innerText=this.btnNext.getAttribute("data-step-first"))}showStep(){const t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.steps[t].classList.add("is-active"),this.btnPrev.classList[0===t?"remove":"add"]("is-active"),this.btnNext.innerText=this.btnNext.dataset[t===this.steps.length-1?"finalStepText":"stepText"]}prevNext(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.btnNext.classList.add("submit-btn");const e=t;return!(1===e&&!this.validate())&&(this.steps[this.currentStepIdx].classList.remove("is-active"),this.currentStepIdx+=e,this.currentStepIdx>=this.steps.length?(this.element.submit(),!1):void this.showStep(this.currentStepIdx))}validate(){const t=[...this.steps[this.currentStepIdx].querySelectorAll("[required]")];let e=!0;for(let s of t)null!==s.value&&""!==s.value.trim()||(s.closest(".js-input-group").classList.add("has-error"),e=!1);return e}clearErrors(t){t.target.closest(".js-input-group").classList.remove("has-error")}updateProgressBar(){const t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0)/this.steps.length;this.progressBar.style.transform="scaleX(".concat(0===t?"0.01":t,")")}addEvents(){for(let t of this.formControls)t.addEventListener("keyup",this.clearErrors.bind(this)),t.addEventListener("change",this.clearErrors.bind(this));this.btnPrev.addEventListener("click",this.prevNext.bind(this,-1)),this.btnNext.addEventListener("click",this.prevNext.bind(this,1)),this.btnNext.addEventListener("click",(t=>{4==this.currentStepIdx||5==this.currentStepIdx?this.btnNext.classList.add("is-hidden"):this.btnNext.classList.remove("is-hidden"),1==this.currentStepIdx?this.btnNext.closest(".quiz").classList.add("first-step"):2==this.currentStepIdx?(this.btnNext.closest(".quiz").classList.add("second-step"),this.btnNext.closest(".quiz").classList.remove("first-step")):3==this.currentStepIdx?(this.btnNext.closest(".quiz").classList.add("third-step"),this.btnNext.closest(".quiz").classList.remove("second-step")):4==this.currentStepIdx?(this.btnNext.closest(".quiz").classList.add("five-step"),this.btnNext.closest(".quiz").classList.remove("third-step")):this.quiz.classList.remove("first-step","second-step","third-step","five-step")})),this.btnReload.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),this.currentStepIdx=0,this.btnNext.innerText=this.btnNext.getAttribute("data-step-first"),this.quiz.classList.remove("first-step","second-step","third-step"),this.btnNext.classList.remove("is-hidden")}))})),this.btnStepAgree.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),document.querySelector(".js-btn-next").click()}))}}}},s={};function i(t){var r=s[t];if(void 0!==r)return r.exports;var n=s[t]={exports:{}};return e[t](n,n.exports,i),n.exports}i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},t=i(8543),new class{constructor(){this.DOM={warrantyFormEl:".js-warranty-form",inputPopupEl:".js-input-popup",inputPopupOpenEl:".js-open-popup",inputPopupCloseEl:".js-close-popup"},this.warrantyForm=document.querySelector(this.DOM.warrantyFormEl),this.inputPopup=document.querySelector(this.DOM.inputPopupEl),this.inputPopupOpen=document.querySelector(this.DOM.inputPopupOpenEl),this.inputPopupClose=document.querySelector(this.DOM.inputPopupCloseEl),this.init()}init(){null!==this.DOM.warrantyForm&&this.inputPopupMethod()}warrantyFormMethod(){new t.Z(document.querySelector("#warranty-form-id"),0)}inputPopupMethod(){this.inputPopupOpen&&this.inputPopupOpen.addEventListener("click",(()=>{this.inputPopup.classList.toggle("is-active")})),this.inputPopupClose&&this.inputPopupClose.addEventListener("click",(()=>{this.inputPopup.classList.remove("is-active")}))}},new t.Z(document.querySelector("#warranty-form-id"),0)}();