!function(){"use strict";class t{constructor(t,e,i){let n=document.querySelectorAll(t);if(n&&n.forEach((t=>{this.init(t,e)})),i){let t=document.querySelectorAll(i);this.accordion(t)}}init(t,e){let i=t.querySelectorAll(e);this.accordion(i)}accordion(t){t.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),e.target.classList.contains("active")?(e.target.classList.remove("active"),e.target.nextElementSibling.classList.remove("active"),e.target.nextElementSibling.style.maxHeight=null):(t.forEach((t=>{t.classList.remove("active"),t.nextElementSibling.classList.remove("active"),t.nextElementSibling.style.maxHeight=null,e.target.nextElementSibling.style.maxHeight=e.target.nextElementSibling.scrollHeight+"px"})),e.target.classList.add("active"),e.target.nextElementSibling.classList.add("active"),e.target.nextElementSibling.style.maxHeight=e.target.nextElementSibling.scrollHeight+"px")}))}))}}new t(".js-accordion",".js-accordion-trigger",".js-accordion-trigger-lvl-two"),new t(".js-accordion-top-question",".js-accordion-trigger"),window.innerWidth<768&&new t(".js-accordion-footer",".js-accordion-trigger-footer")}();