!function(){"use strict";var e,t={5946:function(e,t,r){var n=r(8832),o=r.n(n),i=r(8411),a=r.n(i);new class{constructor(){this.DOM={sliderProduct:".js-product-slider",productColorVariation:".js-color-variation",productBatteryVariation:".js-battery-variation"},this.swiperContainer=document.querySelector(this.DOM.sliderProduct),this.colorVariation=document.querySelector(this.DOM.productColorVariation),this.batteryVariation=document.querySelector(this.DOM.productBatteryVariation),this.init()}init(){if(null===this.swiperContainer||null===this.colorVariation)return;!function(r){for(var n=function e(t,r){return t&&(r(t)?t:e(t.parentNode,r))},i=function(e){(e=e||window.event).preventDefault?e.preventDefault():e.returnValue=!1;var t=e.target||e.srcElement,r=n(t,(function(e){return e.tagName&&"FIGURE"===e.tagName.toUpperCase()}));if(r){for(var o,i=r.parentNode,a=r.parentNode.childNodes,l=a.length,c=0,u=0;u<l;u++)if(1===a[u].nodeType){if(a[u]===r){o=c;break}c++}return o>=0&&s(o,i),!1}},s=function(r,n,i,s){var l,c,u,d=document.querySelectorAll(".pswp")[0];if(u=function(e){for(var t,r,n,o,i=e.childNodes,a=i.length,s=[],l=0;l<a;l++)1===(t=i[l]).nodeType&&(n=(r=t.children[0]).getAttribute("data-size").split("x"),o={src:r.getAttribute("href"),w:"auto",h:parseInt(n[1],10)},t.children.length>1&&(o.title=t.children[1].innerHTML),r.children.length>0&&(o.msrc=r.children[0].getAttribute("src")),o.el=t,s.push(o));return s}(n),c={closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,arrowEl:!0,preloaderEl:!0,clickToCloseNonZoomable:!1,galleryUID:n.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(e){var t=u[e].el.getElementsByTagName("img")[0],r=window.pageYOffset||document.documentElement.scrollTop,n=t.getBoundingClientRect();return{x:n.left,y:n.top+r,w:n.width}}},s)if(c.galleryPIDs){for(var p=0;p<u.length;p++)if(u[p].pid==r){c.index=p;break}}else c.index=parseInt(r,10)-1;else c.index=parseInt(r,10);if(isNaN(c.index))return;i&&(c.showAnimationDuration=0),(l=new(o())(d,a(),u,c)).init(),document.querySelector(".js-custom-close").addEventListener("click",(e=>{l.close()}));const f=document.querySelector(".js-zoom-out"),v=document.querySelector(".js-zoom-in");f.addEventListener("click",(e=>{e.preventDefault(),f.classList.contains("is-active")||(v.classList.remove("is-active"),f.classList.add("is-active"),l.scrollWrap.classList.remove("is-draggable"),l.applyZoomPan(1,0,0))})),v.addEventListener("click",(e=>{e.preventDefault(),v.classList.contains("is-active")||(f.classList.remove("is-active"),v.classList.add("is-active"),l.scrollWrap.classList.add("is-draggable"),setTimeout((()=>{l.zoomTo(2,{x:l.viewportSize.x/2,y:l.viewportSize.y/2},0,!1,(function(e){}))})))})),l.listen("beforeChange",(function(){l.scrollWrap.classList.remove("show-items")})),l.listen("afterChange",(function(){f.classList.add("is-active"),l.scrollWrap.classList.remove("is-draggable"),l.zoomTo(1,{x:0,y:0},0,!1,(function(e){1==e&&(l.applyZoomPan(1,0,0),setTimeout((()=>{document.querySelectorAll(".pswp__zoom-wrap").forEach((e=>e.setAttribute("style","transform: translate3d(0px, 0px, 0px) scale(1);"))),l.scrollWrap.classList.add("show-items")})))}))})),l.listen("initialZoomInEnd",(function(){v.classList.remove("is-active"),f.classList.add("is-active"),l.scrollWrap.classList.remove("is-draggable"),l.applyZoomPan(1,0,0),setTimeout((()=>{document.querySelectorAll(".pswp__zoom-wrap").forEach((e=>e.setAttribute("style","transform: translate3d(0px, 0px, 0px) scale(1);"))),l.scrollWrap.classList.add("show-items")}))})),l.listen("afterChange",(function(){t.textContent="Image "+e.textContent})),l.listen("imageLoadComplete",(function(r,n){t.textContent="Image "+e.textContent}))},l=document.querySelectorAll(".js-gallery"),c=0,u=l.length;c<u;c++)l[c].setAttribute("data-pswp-uid",c+1),l[c].onclick=i;var d=function(){var e=window.location.hash.substring(1),t={};if(e.length<5)return t;for(var r=e.split("&"),n=0;n<r.length;n++)if(r[n]){var o=r[n];o.length<2||(t[o[0]]=o[1])}return t.gid&&(t.gid=parseInt(t.gid,10)),t}();d.pid&&d.gid&&s(d.pid,l[d.gid-1],!0,!0)}(),document.querySelector(".js-product-resize").addEventListener("click",(()=>{document.querySelector(".swiper-slide-active figure").click(),t.textContent="Image "+e.textContent}));let e=document.querySelector(".pswp__top-bar .pswp__counter"),t=document.querySelector(".pswp__bottom-bar .pswp__counter");this.setEventListeners()}setEventListeners(){var e;let t=this.colorVariation.querySelectorAll("li"),r=null===(e=this.batteryVariation)||void 0===e?void 0:e.querySelectorAll('input[type="radio"]'),n=document.querySelector(".js-product-select-wrapper");t.forEach(((e,t)=>{e.addEventListener("click",(()=>{let t=this.colorVariation.dataset.option,r=e.dataset.value,o=n.querySelector('[data-option="'+t+'"]');if(o.options.length>0)for(let e=0;e<o.options.length;e++)if(o.options[e].value===r){o.options[e].selected=!0,o.dispatchEvent(new Event("change"));break}}))})),r&&r.forEach((e=>{e.addEventListener("click",(()=>{let t=this.batteryVariation.dataset.option,r=e.value,o=n.querySelector('[data-option="'+t+'"]');if(o.options.length>0)for(let e=0;e<o.options.length;e++)if(o.options[e].value===r){o.options[e].selected=!0,o.dispatchEvent(new Event("change"));break}}))}))}}}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=function(t,r,o,i){if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],i=e[u][2];for(var s=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,o,i]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.j=385,function(){var e={385:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],s=r[1],l=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var u=l(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},r=self.webpackChunkworkflow=self.webpackChunkworkflow||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[1216],(function(){return n(5946)}));o=n.O(o)}();