!function(){"use strict";new class{constructor(){this.selectUrl=document.querySelectorAll(".js-select-url"),this.init()}init(){this.selectUrl.forEach((t=>{t.addEventListener("change",(t=>{const e=t.target.value;window.location.href=e}))}))}}}();