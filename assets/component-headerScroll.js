!function(){"use strict";(new class{constructor(){this.$nav=document.querySelector(".js-nav"),this.nav=document.querySelector(".js-header"),this.$hamburger=document.querySelector(".js-hamburger"),this.$html=document.querySelector("html"),this.scrollTop=0,this.scrolledDown=!1,this.height=0,this.navLinks=document.querySelectorAll(".js-nav-bar"),this.$navMobile=document.querySelector(".js-nav-mobile"),this.$announcment=document.querySelector(".js-announcment"),this.$goBack=document.querySelectorAll(".js-go-back")}init(){this.onScrollStart(),this.hideOnScroll(),window.innerWidth>991&&this.dropdownMenu(),window.innerWidth<991&&(this.toggleMenu(),this.dropdownMenuMobile())}onScrollStart(){window.removeEventListener("scroll",t,{passive:!0}),window.addEventListener("scroll",t,{passive:!0});let e=this;function t(t){window.pageYOffset>0?e.nav.classList.add("scroll-start"):e.nav.classList.remove("scroll-start")}window.navHeight=.7*this.nav.offsetHeight,setTimeout((()=>{window.pageYOffset>0&&e.nav.classList.add("scroll-start")}),0)}hideOnScroll(){this.scrollTop=0,this.scrolledDown=!1,window.removeEventListener("scroll",t,{passive:!0}),window.addEventListener("scroll",t,{passive:!0});let e=this;function t(t){let s=window.pageYOffset;window,innerWidth<991?e.scrolledDown=e.scrollTop<s&&s>71:e.scrolledDown=e.scrollTop<s&&s>135,0===s?(e.nav.style.position="fixed",e.nav.classList.remove("scroll-start")):s>0&&!e.nav.classList.contains("scroll-start")&&(e.nav.style.position="fixed",setTimeout((()=>{e.nav.classList.add("scroll-start")}),0)),e.scrollTop=s,!e.nav.classList.contains("scrolled")&&e.scrolledDown&&e.nav.classList.add("scrolled"),e.nav.classList.contains("scrolled")&&!e.scrolledDown&&e.nav.classList.remove("scrolled")}window.navHeight=0,this.nav.style.position="fixed",setTimeout((()=>{window.pageYOffset>0&&(this.nav.classList.add("scrolled"),this.nav.style.position="fixed",setTimeout((()=>{this.nav.classList.add("scroll-start")}),250))}),0)}dropdownMenu(){this.navLinks.forEach((e=>{function t(){e.nextElementSibling&&(e.classList.add("is-active"),e.nextElementSibling.classList.add("is-active"),e.nextElementSibling.classList.contains("is-active")?(e.classList.add("is-active"),document.querySelector("html").style.overflow="hidden"):e.classList.remove("is-active"))}function s(){e.nextElementSibling&&(e.classList.remove("is-active"),e.nextElementSibling&&(e.nextElementSibling.classList.remove("is-active"),document.querySelector("html").style.overflow="unset"))}e.nextElementSibling&&(e.nextElementSibling.onmouseover=t,e.nextElementSibling.onmouseleave=s),e.onmouseover=t,e.onmouseleave=s}))}dropdownMenuMobile(){this.navLinks.forEach((e=>{e.addEventListener("click",(t=>{e.nextElementSibling.classList.contains("header__nav-dropdown")&&t.preventDefault(),e.nextElementSibling.classList.add("is-active"),this.$announcment.classList.contains("hidden")||this.$announcment.classList.add("hidden")}))})),this.$goBack.forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),e.parentElement.parentElement.classList.remove("is-active"),this.$announcment.classList.remove("hidden")}))}))}toggleMenu(){let e=this;e.$hamburger.addEventListener("click",(t=>{document.querySelector("html").style.overflow="hidden",e.$hamburger.classList.contains("active")&&(this.removeActiveClass(),document.querySelector("html").style.overflow="unset"),t.target.closest(".js-hamburger").classList.toggle("active"),e.$navMobile.classList.toggle("active"),e.$announcment.classList.toggle("active")}))}removeActiveClass(){this.$goBack.forEach((e=>{e.parentElement.parentElement.classList.remove("is-active"),this.$announcment.classList.remove("hidden")}))}}).init()}();