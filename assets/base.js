/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/base.js":
/*!*****************************!*\
  !*** ./src/scripts/base.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_CtaTapeHidden__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/CtaTapeHidden */ "./src/scripts/components/CtaTapeHidden.js");
/* harmony import */ var _components_CarouselSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/CarouselSlider */ "./src/scripts/components/CarouselSlider.js");
/* harmony import */ var _components_Gallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Gallery */ "./src/scripts/components/Gallery.js");

new _components_CtaTapeHidden__WEBPACK_IMPORTED_MODULE_0__["default"]().init();

new _components_CarouselSlider__WEBPACK_IMPORTED_MODULE_1__["default"]().init();

new _components_Gallery__WEBPACK_IMPORTED_MODULE_2__["default"]().init();

/***/ }),

/***/ "./src/scripts/components/CarouselSlider.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/CarouselSlider.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CarouselSliderInit; }
/* harmony export */ });
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/bundle */ "./node_modules/swiper/swiper-bundle.esm.js");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.min.css");
/* harmony import */ var swiper_scss_scrollbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/scss/scrollbar */ "./node_modules/swiper/modules/scrollbar/scrollbar.scss");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/**
 * Carousel Gallery Slider component
 * Slider for Carousel Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
 // swiper core styles

 // modules styles



class CarouselSliderInit {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{sliderCarousel: string, options: object}}
     */
    this.DOM = {
      sliderCarousel: '.js-carousel-slider'
    };
    this.options = {
      spaceBetween: false,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: true,
      centeredSlides: true,
      initialSlide: 1,
      slidesOffsetBefore: 700,
      scrollbar: {
        el: '.js-carousel-scrollbar',
        draggable: true,
        hide: false
      },
      breakpoints: {
        768: {
          spaceBetween: 32,
          slidesPerView: 2
        },
        360: {
          slidesOffsetBefore: 0,
          centeredSlides: true
        }
      }
    };
    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */

    this.swiperContainer = document.querySelector(this.DOM.sliderCarousel);
    this.init();
  }
  /**
   * Init
   */


  init() {
    if (this.DOM.sliderCarousel === null) {
      return;
    }

    this.sliderCarouselMethod();
  }
  /**
   * Slider method
   * Initialize Swiper slider
   */


  sliderCarouselMethod() {
    console.log('carousel initialized!');
    let carouselSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"](this.DOM.sliderCarousel, this.options);
  }

}
const carouselSliderGallery = new CarouselSliderInit();

/***/ }),

/***/ "./src/scripts/components/CtaTapeHidden.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/CtaTapeHidden.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CtaTapeHidden; }
/* harmony export */ });
class CtaTapeHidden {
  constructor() {}

  init() {
    const headerEl = document.querySelectorAll('.cta');
    const sentinalEl = document.querySelector('.js-select-class');
    const sentinalEl1 = document.querySelector('.js-off-cta');

    if (sentinalEl === null) {
      return;
    }

    const handler = entries => {
      if (entries[0].isIntersecting) {
        headerEl.forEach(element => {
          element.classList.add('enabled');
        });
      } else {
        headerEl.forEach(element => {
          element.classList.remove('enabled');
        });
      }
    }; // create the observer


    const observer = new window.IntersectionObserver(handler); // give the observer some dom nodes to keep an eye on

    observer.observe(sentinalEl);
    observer.observe(sentinalEl1);
  }

}

/***/ }),

/***/ "./src/scripts/components/Gallery.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/Gallery.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Gallery; }
/* harmony export */ });
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/bundle */ "./node_modules/swiper/swiper-bundle.esm.js");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.min.css");
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/navigation */ "./node_modules/swiper/modules/navigation/navigation.min.css");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/**
 * Carousel Gallery Slider component
 * Slider for Carousel Gallery type of section. Uses Swiper as a dependency.
 */
// swiper bundle styles
 // swiper core styles

 // modules styles



class Gallery {
  constructor() {
    /**
     * Carousel component DOM selectors
     * @type {{gallery: string, options: object}}
     */
    this.DOM = {
      gallery: '.js-gallery-slider'
    };
    this.options = {
      spaceBetween: false,
      slidesPerView: 1,
      direction: 'horizontal',
      slideToClickedSlide: false,
      loop: true,
      noSwiping: true,
      allowTouchMove: false,
      centeredSlides: true,
      navigation: {
        nextEl: '.js-arrow-right-gallery',
        prevEl: '.js-arrow-prev-gallery'
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
          slidesPerView: 2
        },
        1024: {
          spaceBetween: 24
        },
        1366: {
          spaceBetween: 32
        }
      }
    };
    /**
     * Fetch swiper container DOM element
     * @type {Element}
     */

    this.swiperContainer = document.querySelector(this.DOM.gallery); //this.init()
  }
  /**
   * Init
   */


  init() {
    if (this.DOM.gallery === null) {
      return;
    }

    this.galleryMethod();
  }
  /**
   * Slider method
   * Initialize Swiper slider
   */


  galleryMethod() {
    let gallery = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"](this.DOM.gallery, this.options);
  }

}
const gallery = new Gallery();

/***/ }),

/***/ "./src/styles/base.scss":
/*!******************************!*\
  !*** ./src/styles/base.scss ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"base": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkworkflow"] = self["webpackChunkworkflow"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/base.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/styles/base.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29ya2Zsb3cvLi9zcmMvc2NyaXB0cy9iYXNlLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9DYXJvdXNlbFNsaWRlci5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQ3RhVGFwZUhpZGRlbi5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL3NyYy9zdHlsZXMvYmFzZS5zY3NzPzZiZTUiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dvcmtmbG93L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdGFUYXBlSGlkZGVuIGZyb20gJy4vY29tcG9uZW50cy9DdGFUYXBlSGlkZGVuJ1xyXG5uZXcgQ3RhVGFwZUhpZGRlbigpLmluaXQoKVxyXG5cclxuaW1wb3J0IENhcm91c2VsU2xpZGVySW5pdCBmcm9tICcuL2NvbXBvbmVudHMvQ2Fyb3VzZWxTbGlkZXInXHJcbm5ldyBDYXJvdXNlbFNsaWRlckluaXQoKS5pbml0KClcclxuXHJcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4vY29tcG9uZW50cy9HYWxsZXJ5J1xyXG5uZXcgR2FsbGVyeSgpLmluaXQoKVxyXG4iLCIvKipcclxuICogQ2Fyb3VzZWwgR2FsbGVyeSBTbGlkZXIgY29tcG9uZW50XHJcbiAqIFNsaWRlciBmb3IgQ2Fyb3VzZWwgR2FsbGVyeSB0eXBlIG9mIHNlY3Rpb24uIFVzZXMgU3dpcGVyIGFzIGEgZGVwZW5kZW5jeS5cclxuICovXHJcbi8vIHN3aXBlciBidW5kbGUgc3R5bGVzXHJcbmltcG9ydCAnc3dpcGVyL2J1bmRsZSdcclxuXHJcbi8vIHN3aXBlciBjb3JlIHN0eWxlc1xyXG5pbXBvcnQgJ3N3aXBlci9jc3MnXHJcblxyXG4vLyBtb2R1bGVzIHN0eWxlc1xyXG5pbXBvcnQgJ3N3aXBlci9zY3NzL3Njcm9sbGJhcidcclxuaW1wb3J0IFN3aXBlciwgeyBOYXZpZ2F0aW9uLCBQYWdpbmF0aW9uIH0gZnJvbSAnc3dpcGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxTbGlkZXJJbml0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2Fyb3VzZWwgY29tcG9uZW50IERPTSBzZWxlY3RvcnNcclxuICAgICAqIEB0eXBlIHt7c2xpZGVyQ2Fyb3VzZWw6IHN0cmluZywgb3B0aW9uczogb2JqZWN0fX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ET00gPSB7XHJcbiAgICAgIHNsaWRlckNhcm91c2VsOiAnLmpzLWNhcm91c2VsLXNsaWRlcicsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBzcGFjZUJldHdlZW46IGZhbHNlLFxyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXHJcbiAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICBpbml0aWFsU2xpZGU6IDEsXHJcbiAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogNzAwLCBcclxuXHJcblxyXG4gICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICBlbDogJy5qcy1jYXJvdXNlbC1zY3JvbGxiYXInLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBoaWRlOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICA3Njg6IHtcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzIsXHJcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzYwOiB7XHJcbiAgICAgICAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsIFxyXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggc3dpcGVyIGNvbnRhaW5lciBET00gZWxlbWVudFxyXG4gICAgICogQHR5cGUge0VsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3dpcGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLkRPTS5zbGlkZXJDYXJvdXNlbClcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0XHJcbiAgICovXHJcbiAgaW5pdCgpIHtcclxuICAgIGlmICh0aGlzLkRPTS5zbGlkZXJDYXJvdXNlbCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsaWRlckNhcm91c2VsTWV0aG9kKClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNsaWRlciBtZXRob2RcclxuICAgKiBJbml0aWFsaXplIFN3aXBlciBzbGlkZXJcclxuICAgKi9cclxuICBzbGlkZXJDYXJvdXNlbE1ldGhvZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYXJvdXNlbCBpbml0aWFsaXplZCEnKVxyXG4gICAgbGV0IGNhcm91c2VsU2xpZGVyID0gbmV3IFN3aXBlcih0aGlzLkRPTS5zbGlkZXJDYXJvdXNlbCwgdGhpcy5vcHRpb25zKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY2Fyb3VzZWxTbGlkZXJHYWxsZXJ5ID0gbmV3IENhcm91c2VsU2xpZGVySW5pdCgpXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEN0YVRhcGVIaWRkZW4ge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnN0IGhlYWRlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN0YScpXHJcbiAgICBjb25zdCBzZW50aW5hbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNlbGVjdC1jbGFzcycpXHJcbiAgICBjb25zdCBzZW50aW5hbEVsMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1vZmYtY3RhJylcclxuXHJcbiAgICBpZiAoc2VudGluYWxFbCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVyID0gKGVudHJpZXMpID0+IHtcclxuICAgICAgaWYgKGVudHJpZXNbMF0uaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICBoZWFkZXJFbC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VuYWJsZWQnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGVhZGVyRWwuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdlbmFibGVkJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBjcmVhdGUgdGhlIG9ic2VydmVyXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyB3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlcilcclxuICAgIC8vIGdpdmUgdGhlIG9ic2VydmVyIHNvbWUgZG9tIG5vZGVzIHRvIGtlZXAgYW4gZXllIG9uXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHNlbnRpbmFsRWwpXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHNlbnRpbmFsRWwxKVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ2Fyb3VzZWwgR2FsbGVyeSBTbGlkZXIgY29tcG9uZW50XHJcbiAqIFNsaWRlciBmb3IgQ2Fyb3VzZWwgR2FsbGVyeSB0eXBlIG9mIHNlY3Rpb24uIFVzZXMgU3dpcGVyIGFzIGEgZGVwZW5kZW5jeS5cclxuICovXHJcbi8vIHN3aXBlciBidW5kbGUgc3R5bGVzXHJcbmltcG9ydCAnc3dpcGVyL2J1bmRsZSdcclxuXHJcbi8vIHN3aXBlciBjb3JlIHN0eWxlc1xyXG5pbXBvcnQgJ3N3aXBlci9jc3MnXHJcblxyXG4vLyBtb2R1bGVzIHN0eWxlc1xyXG5pbXBvcnQgJ3N3aXBlci9jc3MvbmF2aWdhdGlvbidcclxuXHJcbmltcG9ydCBTd2lwZXIsIHsgTmF2aWdhdGlvbiB9IGZyb20gJ3N3aXBlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbGxlcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYXJvdXNlbCBjb21wb25lbnQgRE9NIHNlbGVjdG9yc1xyXG4gICAgICogQHR5cGUge3tnYWxsZXJ5OiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdH19XHJcbiAgICAgKi9cclxuICAgIHRoaXMuRE9NID0ge1xyXG4gICAgICBnYWxsZXJ5OiAnLmpzLWdhbGxlcnktc2xpZGVyJyxcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIHNwYWNlQmV0d2VlbjogZmFsc2UsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcclxuICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgbm9Td2lwaW5nOiB0cnVlLFxyXG4gICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgbmV4dEVsOiAnLmpzLWFycm93LXJpZ2h0LWdhbGxlcnknLFxyXG4gICAgICAgIHByZXZFbDogJy5qcy1hcnJvdy1wcmV2LWdhbGxlcnknLFxyXG4gICAgICB9LFxyXG4gICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxMDI0OiB7XHJcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTM2Njoge1xyXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggc3dpcGVyIGNvbnRhaW5lciBET00gZWxlbWVudFxyXG4gICAgICogQHR5cGUge0VsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3dpcGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLkRPTS5nYWxsZXJ5KVxyXG4gICAgLy90aGlzLmluaXQoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdFxyXG4gICAqL1xyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5ET00uZ2FsbGVyeSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbGxlcnlNZXRob2QoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2xpZGVyIG1ldGhvZFxyXG4gICAqIEluaXRpYWxpemUgU3dpcGVyIHNsaWRlclxyXG4gICAqL1xyXG4gIGdhbGxlcnlNZXRob2QoKSB7XHJcbiAgICBsZXQgZ2FsbGVyeSA9IG5ldyBTd2lwZXIodGhpcy5ET00uZ2FsbGVyeSwgdGhpcy5vcHRpb25zKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2FsbGVyeSA9IG5ldyBHYWxsZXJ5KClcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJiYXNlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3b3JrZmxvd1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3b3JrZmxvd1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQ3RhVGFwZUhpZGRlbiIsImluaXQiLCJDYXJvdXNlbFNsaWRlckluaXQiLCJHYWxsZXJ5IiwiU3dpcGVyIiwiTmF2aWdhdGlvbiIsIlBhZ2luYXRpb24iLCJjb25zdHJ1Y3RvciIsIkRPTSIsInNsaWRlckNhcm91c2VsIiwib3B0aW9ucyIsInNwYWNlQmV0d2VlbiIsInNsaWRlc1BlclZpZXciLCJkaXJlY3Rpb24iLCJzbGlkZVRvQ2xpY2tlZFNsaWRlIiwibG9vcCIsImNlbnRlcmVkU2xpZGVzIiwiaW5pdGlhbFNsaWRlIiwic2xpZGVzT2Zmc2V0QmVmb3JlIiwic2Nyb2xsYmFyIiwiZWwiLCJkcmFnZ2FibGUiLCJoaWRlIiwiYnJlYWtwb2ludHMiLCJzd2lwZXJDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXJDYXJvdXNlbE1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJjYXJvdXNlbFNsaWRlciIsImNhcm91c2VsU2xpZGVyR2FsbGVyeSIsImhlYWRlckVsIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbnRpbmFsRWwiLCJzZW50aW5hbEVsMSIsImhhbmRsZXIiLCJlbnRyaWVzIiwiaXNJbnRlcnNlY3RpbmciLCJmb3JFYWNoIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9ic2VydmVyIiwid2luZG93IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiZ2FsbGVyeSIsIm5vU3dpcGluZyIsImFsbG93VG91Y2hNb3ZlIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsImdhbGxlcnlNZXRob2QiXSwic291cmNlUm9vdCI6IiJ9