!function(){"use strict";new class{constructor(){this.DOM={},this.DOM.collectionGrid=".js-grid-trigger",this.collectionGrid=document.querySelector(this.DOM.collectionGrid),this.colectionFilterTrigger=document.querySelectorAll(".js-filter-trigger"),this.collectionFilterWrapper=document.querySelector(".js-collection-filter-wrapper"),this.collectionFilterOverlay=document.querySelector(".js-collection-filter-overlay"),this.html=document.querySelector("html"),this.infoPopupTrigger=document.querySelectorAll(".js-info-popup-trigger"),this.init()}init(){console.log("CollectionFilter is initialized"),this.collectionGrid&&this.collectionDeploy(),this.collectionFilterSideBar(),this.infoPopup(),this.clickFilter()}collectionDeploy(){let e=document.querySelector(".js-list-trigger"),i=document.querySelector(".js-grid-list-wrapper");this.collectionGrid.addEventListener("click",(e=>{e.preventDefault(),i.classList.contains("collection-grid")||i.classList.add("collection-grid")})),e.addEventListener("click",(e=>{e.preventDefault(),i.classList.contains("collection-grid")&&i.classList.remove("collection-grid")}))}collectionFilterSideBar(){console.log("collectionFIlterSideBar() function start"),this.colectionFilterTrigger.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),this.collectionFilterWrapper.classList.contains("is-active")?(this.collectionFilterWrapper.classList.remove("is-active"),this.collectionFilterOverlay.classList.remove("is-active"),this.html.classList.remove("overflow-hidden")):(this.collectionFilterWrapper.classList.add("is-active"),this.collectionFilterOverlay.classList.add("is-active"),this.html.classList.add("overflow-hidden"))})),this.collectionFilterOverlay.addEventListener("click",(()=>{this.collectionFilterOverlay.classList.contains("is-active")&&(this.collectionFilterWrapper.classList.remove("is-active"),this.collectionFilterOverlay.classList.remove("is-active"),this.html.classList.remove("overflow-hidden"))}))}))}infoPopup(){this.infoPopupTrigger.forEach((e=>{window.innerWidth>991?(e.addEventListener("mouseover",(()=>{e.nextElementSibling.classList.add("is-active")})),e.addEventListener("mouseout",(()=>{e.nextElementSibling.classList.remove("is-active")}))):e.addEventListener("click",(i=>{i.preventDefault(),e.nextElementSibling.classList.toggle("is-active")}))}))}clickFilter(){const e=document.querySelectorAll(".filter-group-display__list-item input[type=checkbox]");Array.from(e).forEach((function(e){e.addEventListener("change",(function(){this.checked?this.previousElementSibling.classList.add("active"):this.previousElementSibling.classList.remove("active")}))}))}}}();