!function(){"use strict";var e,t={5833:function(e,t,r){var o=r(2561),s=r.n(o);const i=document.querySelector(".js-dashbord-orders-table");i&&new(s())(i,{perPage:5,labels:{placeholder:"Type to search....",perPage:" {select}",noRows:"No entries found",info:"Showing {start} to {end} of {rows} entries"},layout:{top:"<h2 class='table-title'>Orders</h2> {select}{search}",bottom:"{pager}"}}),(new class{constructor(){this.orderDetailsWrapper=document.querySelector(".js-dataTable-poput-custom"),this.orderDetailsOverlay=document.querySelector(".js-dataTable-poput-custom-overlay"),this.orderDetailsOpen=document.querySelectorAll(".js-dataTable-poput-custom-open"),this.orderDetailsClose=document.querySelector(".js-dataTable-poput-custom-close")}init(){this.orderDetailsWrapper&&this.orderDetailsPopup()}orderDetailsPopup(){this.orderDetailsOpen.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),this.orderDetailsWrapper.classList.contains("active")||(this.orderDetailsWrapper.classList.add("active"),this.orderDetailsOverlay.classList.add("active"),document.querySelector("html").classList.add("overflow-hidden"))}))})),this.orderDetailsOverlay.addEventListener("click",(()=>{this.orderDetailsWrapper.classList.contains("active")&&(this.orderDetailsWrapper.classList.remove("active"),this.orderDetailsOverlay.classList.remove("active"),document.querySelector("html").classList.remove("overflow-hidden"))})),this.orderDetailsClose.addEventListener("click",(e=>{e.preventDefault(),this.orderDetailsWrapper.classList.contains("active")&&(this.orderDetailsWrapper.classList.remove("active"),this.orderDetailsOverlay.classList.remove("active"),document.querySelector("html").classList.remove("overflow-hidden"))}))}}).init()}},r={};function o(e){var s=r[e];if(void 0!==s)return s.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,e=[],o.O=function(t,r,s,i){if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],s=e[u][1],i=e[u][2];for(var n=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(o.O).every((function(e){return o.O[e](r[l])}))?r.splice(l--,1):(n=!1,i<a&&(a=i));if(n){e.splice(u--,1);var c=s();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,s,i]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.j=3288,function(){var e={3288:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var s,i,a=r[0],n=r[1],l=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(s in n)o.o(n,s)&&(o.m[s]=n[s]);if(l)var u=l(o)}for(t&&t(r);c<a.length;c++)i=a[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},r=self.webpackChunkworkflow=self.webpackChunkworkflow||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var s=o.O(void 0,[1216],(function(){return o(5833)}));s=o.O(s)}();