!function(){"use strict";var e,o={9163:function(e,o,t){t(2223);var r=t(3220);(new class{constructor(){this.DOM={sliderExplore:".js-explore-slider",sliderThumb:".js-explore-thumb",explorePopupContainer:".js-explore-popup",clickToOpenPopup:".js-click-to-explore-shape",closeExplorePopup:".js-close-explore",popupModalEl:".js-popup-box",bodyEl:"body"},this.swiperContainer=document.querySelector(this.DOM.sliderExplore),this.swiperContainerThumb=document.querySelector(this.DOM.sliderThumb),this.clickToExploreContainer=document.querySelector(this.DOM.explorePopupContainer),this.explorePopupBtnOpen=document.querySelectorAll(this.DOM.clickToOpenPopup),this.explorePopupBtnClose=document.querySelectorAll(this.DOM.closeExplorePopup),this.popupModal=document.querySelectorAll(this.DOM.popupModalEl),this.body=document.querySelector(this.DOM.bodyEl),this.options={slidesPerView:1,navigation:{nextEl:".js-explore-arrow-next",prevEl:".js-explore-arrow-prev"},controller:{by:"slide"}},this.optionsThumb={slidesPerView:1,centeredSlides:!0,spaceBetween:60,slideToClickedSlide:!1,controller:{by:"slide"}}}init(){null!==this.swiperContainer&&null!==this.swiperContainerThumb&&this.clickToExploreMethod()}clickToExploreMethod(){this.explorePopupBtnOpen.forEach(((e,o)=>{e.addEventListener("click",(o=>{let t=e.id;console.log(t),this.DOM.indexEl=e.dataset.targetCarousel,this.clickToExploreContainer.classList.add("active");let r=this.clickToExploreContainer.querySelector('[data-target="'+t+'"');console.log("ad",r),r.classList.add("active")}))}));let e=document.querySelectorAll(".js-popup-box[data-target]");console.log(e,"carusles");let o=[],t=[];e.forEach(((l,i)=>{let n=l.querySelector(".js-explore-slider"),s=l.querySelector(".js-explore-thumb"),c=s.querySelector(".js-explore-arrow-prev"),p=s.querySelector(".js-explore-arrow-next");p.addEventListener("click",(o=>{if("true"===p.getAttribute("aria-disabled")){l.classList.remove("active"),e[i+1]&&e[i+1].classList.add("active"),console.log(e.length,"length carousel");let o=l.dataset.target.substr(l.dataset.target.length-1);console.log(o,"number"),e.length==o&&this.explorePopupBtnClose.forEach((e=>{e.click(),this.clickToExploreContainer.classList.remove("active"),this.body.classList.remove("active-explore"),l.classList.remove("active")}))}})),this.options.navigation.nextEl=p,this.options.navigation.prevEl=c,o[i]=new r.ZP(n,this.options),t[i]=new r.ZP(s,this.optionsThumb),o[i].controller.control=t[i],t[i].controller.control=o[i]})),this.explorePopupBtnClose.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),this.clickToExploreContainer.classList.remove("active"),this.body.classList.remove("active-explore"),this.popupModal.forEach((e=>{e.classList.remove("active")}))}))})),document.addEventListener("keydown",(function(e){let o=document.querySelector(".js-explore-popup"),t=document.querySelector("body"),r=document.querySelectorAll(".js-popup-box");"27"!=e.key&&"Escape"!=e.key||(o.classList.remove("active"),t.classList.remove("active-explore"),r.forEach((e=>{e.classList.remove("active")})))}))}}).init()}},t={};function r(e){var l=t[e];if(void 0!==l)return l.exports;var i=t[e]={exports:{}};return o[e].call(i.exports,i,i.exports,r),i.exports}r.m=o,e=[],r.O=function(o,t,l,i){if(!t){var n=1/0;for(a=0;a<e.length;a++){t=e[a][0],l=e[a][1],i=e[a][2];for(var s=!0,c=0;c<t.length;c++)(!1&i||n>=i)&&Object.keys(r.O).every((function(e){return r.O[e](t[c])}))?t.splice(c--,1):(s=!1,i<n&&(n=i));if(s){e.splice(a--,1);var p=l();void 0!==p&&(o=p)}}return o}i=i||0;for(var a=e.length;a>0&&e[a-1][2]>i;a--)e[a]=e[a-1];e[a]=[t,l,i]},r.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(o,{a:o}),o},r.d=function(e,o){for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},r.j=7076,function(){var e={7076:0};r.O.j=function(o){return 0===e[o]};var o=function(o,t){var l,i,n=t[0],s=t[1],c=t[2],p=0;if(n.some((function(o){return 0!==e[o]}))){for(l in s)r.o(s,l)&&(r.m[l]=s[l]);if(c)var a=c(r)}for(o&&o(t);p<n.length;p++)i=n[p],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(a)},t=self.webpackChunkworkflow=self.webpackChunkworkflow||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var l=r.O(void 0,[1216],(function(){return r(9163)}));l=r.O(l)}();