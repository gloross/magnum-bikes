!function(){"use strict";new class{constructor(){this.DOM={singleGalleryBtnEl:".js-single-gallery-open",singleProductGalleryPopupEl:".js-single-gallery-popup",closeSingleGalleryEl:".js-close-single-gallery",bodyEl:"body"},this.singleGalleryBtn=document.querySelectorAll(this.DOM.singleGalleryBtnEl),this.closeSingleGallery=document.querySelectorAll(this.DOM.closeSingleGalleryEl),this.singleProductGalleryPopup=document.querySelector(this.DOM.singleProductGalleryPopupEl),this.body=document.querySelector(this.DOM.bodyEl),this.init()}init(){this.singleGalleryBtn.forEach((l=>{l.addEventListener("click",(l=>{let e=l.target.parentElement.querySelector(this.DOM.singleProductGalleryPopupEl);e&&(e.classList.add("active"),this.body.classList.add("active-gallery"))}))})),this.closeSingleGallery.forEach((l=>{l.addEventListener("click",(l=>{l.preventDefault(),l.target.closest(this.DOM.singleProductGalleryPopupEl).classList.remove("active"),this.body.classList.remove("active-gallery")}))}))}}}();