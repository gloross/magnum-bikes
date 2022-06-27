import {component} from "picoapp";
import {formatMoney} from "@shopify/theme-currency";
import filterRangeSlider from "./filterRangeSlider";
import {getSizedImageUrl} from '@shopify/theme-images';


export default component((node, ctx) => {
    // Main elements
    const results = node.querySelector(".js-results");
    const sorting = node.querySelector(".js-sorting");

    // price slider range elements
    const priceFilters = document.querySelector(".js-filter-price");
    const priceMin = priceFilters.querySelector(".js-filter-min");
    const priceMax = priceFilters.querySelector(".js-filter-max");

    // weight slider range elements
    const weightFilters = document.querySelector('.js-filter-weight')
    const weight   = weightFilters.querySelector('.js-filter-max');

    // range slider range elements

    const rangeFilters = document.querySelector('.js-filter-range')
    const range   = rangeFilters.querySelector('.js-filter-max');

    // height slider range elements

    const heightFilters = document.querySelector('.js-filter-height');
    const height   = heightFilters.querySelector('.js-filter-max');

    // magnum filters
    const categoryFilters       = document.querySelector('.js-category-filters');
    const shapeFilters          = document.querySelector('.js-shape-filters');
    const sitingPositionFilters = document.querySelector('.js-sitting-position');
    const terrainFilters        = document.querySelector('.js-terrain-filter');

    
    const showMoreBtn              = document.querySelector('.js-show-more-btn');
    const activeFiltersWrapper     = document.querySelector('.js-active-filters-wrapper');
    const collectionFiltersWrapper = document.querySelector('.js-collection-filter-wrapper');
    const clearAllFilters          = node.querySelectorAll('.js-clear-all-filters');

    //active filters
    const selectedFiltersWrapper = document.querySelectorAll('.js-selected-filters');
    const clearFilters = document.querySelectorAll('.js-clear-filter');

    // sorting
    const sortingButton  = document.querySelector('.js-select-sort');


    const mobileSorting = document.querySelector('.js-sort-filters-mobile');
    const mobileSortingClose = document.querySelector('.js-mobile-filter-close');
    const applied = document.querySelector('.js-applied');
    const renderedProducts = node.querySelector('.js-total-products');
    const noProducts = node.querySelector('.js-no-products');
    let   noFilteredProducts     = false;

    const clearFilterButtons = node.querySelectorAll('.js-clear-filter');

    const apiLimit = 250;
    const collection = node.dataset.collection;
    const productCount = parseInt(node.dataset.productCount);
    const pageSize = node.dataset.pageSize;
    const showMoreProducts = node.dataset.showMore;

    console.log(pageSize, "node page size")
    console.log(showMoreProducts, "node show more")
    // get strings generated in theme liquid file
    // const strings = window.theme.strings.collections;

    const tooltipBtns = node.querySelectorAll(".js-tooltip-btn");

    // price range slider inputs
    var input0 = document.querySelector(".js-filter-range-min");
    var input1 = document.querySelector(".js-filter-range-max");
    var inputs = [input0, input1];

    // weight slider inputs

    let allProducts = [];
    let filteredProducts = [];
    let productPages = [];
    let currentPage = 0;

    const templateDescription = document.querySelector('template[data-collection-content]');

    init();

    const icon_close = `<svg class="icon"  width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 .75 8.5 8.5M9.5.75 1 9.25" stroke="#312F30" stroke-width="1.5"/></svg>`;

    const allSelectedTags = [];

    //============================================ INITIALIZE MAIN ================================================//
    function init() {

        // if (window.innerWidth <= 1023) {
        //     $(".js-filters-wrapper").css("display", "none");
        //     $(".js-wrapper").css("display", "none");
        //     $(filterBtns).removeClass("btn--open");
        // }

        console.log(`AJDE SADA: POCETAK, pocetka`);

        if (!window.location.href.includes("sort=")) {
            const collectionSortOrder = node.dataset.sortOrder;
            let sortingValue = undefined;

            switch (collectionSortOrder) {
                case "manual":
                    sortingValue = "manual";
                    break;
                case "best-selling":
                    sortingValue = "best-selling";
                    break;
                case "price-ascending":
                    sortingValue = "price-ascending";
                    break;
                case "price-descending":
                    sortingValue = "price-descending";
                    break;
                case "created-descending":
                    sortingValue = "created-descending";
                    break;
                case "created-ascending":
                    sortingValue = "created-ascending";
                    break;
                case "title-descending":
                    sortingValue = "title-descending";
                    break;
                case "title-ascending":
                    sortingValue = "title-ascending";
                    break;
                default:
                    sortingValue = "best-selling";
                    break;
            }

            if(sortingValue !== 'manual') {
                window.history.pushState(null, null, `?sort=${sortingValue}`);
            }
        }

        const queryString = `?${window.location.href.split("?")[1]}`;
        fetchProducts();

        function fetchProducts() {
            let productsToReturn = [];
            const loops = Math.ceil(productCount / apiLimit);
            let counter = 0;

            for (let p = 1; p <= loops; p++) {
                fetch(
                        `/collections/${collection}/products.json`
                    )
                    .then((response) => response.json())
                    .then((json) => json.products)
                    .then((products) => {
                        const obj = {
                            index: p,
                            products,
                        };
                        counter += products.length;
                        productsToReturn.push(obj);



                        if (counter === productCount || counter > productCount) {
                            productsToReturn.sort((a, b) => a.index - b.index);
                            for (let i = 0; i < productsToReturn.length; i++) {
                                allProducts = [...allProducts, ...productsToReturn[i].products];
                            }

                            // Only get available products
                            allProducts = allProducts.filter((product) =>
                                product.variants.find((variant) => variant.available)
                            );

                            // TODO: createFilters!
                            createFilters(queryString, allProducts);
                            processProducts(queryString, allProducts, pageSize);
                        }


                    })
                    .catch((error) => console.error(error));
            }
        }

        // Init sorting
        if (queryString.includes("sort=")) {
            const sort = queryString.split("sort=")[1].split("&")[0];
            if (sorting) {
                sorting.querySelector("select").value = sort;
            }
        }

        // Init Tooltips
        tooltipBtns.forEach((btn) => {
            btn.addEventListener("mouseenter", (e) => {
                const button = e.currentTarget;
                const coords = button.getBoundingClientRect();
                const content = button.parentElement.querySelector(
                    ".js-tooltip-content"
                );

                content.classList.add("is-open");
                content.style.top = `${coords.y - 20}px`;
                content.style.left = `${coords.x + 30}px`;
            });

            btn.addEventListener("mouseout", (e) => {
                const button = e.currentTarget;
                const content = button.parentElement.querySelector(
                    ".js-tooltip-content"
                );

                content.classList.remove("is-open");
            });
        });
    }

    //============================================ INITIALIZE CLEAR FILTERS BUTTON ================================================//

    function initClearFiltersButton() {
        if (selectedFiltersWrapper) {
            let appliedFilters = selectedFiltersWrapper[0].querySelector('.filter-selected');

            if (!appliedFilters) {
                clearFilterButtons.forEach((clearFilter) => {
                    clearFilter.setAttribute('style', 'display:none');
                    applied.setAttribute('style', 'display:none');

                })

            } else {
                clearFilterButtons.forEach((clearFilter) => {
                    clearFilter.setAttribute('style', 'display:block');
                    applied.setAttribute('style', 'display:block');

                })

            }
        }
    }

    //============================================ PROCESS PRODUCTS ===============================================//
    function processProducts(queryString, products, pageSize) {
        filteredProducts = filterProducts(queryString, products);
        productPages = paginateProducts(filteredProducts, pageSize);

        if (queryString.includes("page=")) {
            currentPage =
                parseInt(
                    queryString.slice(
                        queryString.indexOf("page=") + 5,
                        queryString.length
                    )
                ) - 1;
            let productsToRender = [];
            for (let page = 0; page <= currentPage; page++) {
                productsToRender = [...productsToRender, ...productPages[page]];
            }
            renderProducts("all", productsToRender, filteredProducts);
        } else if (productPages[0]) {
            renderProducts("all", productPages[0], filteredProducts);
        } else {
            renderProducts("all", [], filteredProducts);
        }
        addEventListeners();
    }

    //============================================ CREATE FILTERS =================================================//
    function createFilters(queryString, products) {
        //createColorFilters();
        //createSizeFilters();
        //createTeamFilters();

        // let assignedFilters = window.collection_filters;

         getMaxPrice(products);

            createCategoryFilters();
            createShapeFilters();
            createSittingPositionFilters();
            createTerrainFilters();

        function createCategoryFilters() {
            //let allCategory = [];
            var productCategories = {};

            products.forEach((product) => {

                product.tags.forEach((tag) => {
                    if (tag.startsWith("PC_")) {
                        if (productCategories[tag]) {
                            productCategories[tag]++;
                        } else {
                            productCategories[tag] = 1;
                        }
                    }
                })

            });



            if (Object.keys(productCategories).length > 0) {

                let index = 1;
                for (const [key, value] of Object.entries(productCategories)) {

                    const el = document.createElement("li");

                    var prodCategory = key.replace("PC_", "");

                    // var mFilter = ` <div class="custom-check custom-check--checkbox d-flex align-center justify-between">
                    //                 <input id="${metal}" value="${metal}" type="checkbox" name="product-type">
                    //                 <label for="${metal}">${printedValue} <strong>${value}</strong></label>
                    //                </div>`;

                    var categoryFilter = `<a class="collection-side-filter__category-btn" data-value="${key}" href="#">${prodCategory}</a>`
                    el.innerHTML = categoryFilter;


                    //   categoryFilters.append(ul1, ul2, ul3, ul4);
                    categoryFilters.append(el);
                    index++;

                }
            } else {
                categoryFilters.parentNode.style.display = 'none'
            }

        }

        function createShapeFilters() {
            //let allCategory = [];
            var productShapes = {};

            products.forEach((product) => {

                product.tags.forEach((tag) => {
                    if (tag.startsWith("PFS_")) {
                        if (productShapes[tag]) {
                            productShapes[tag]++;
                        } else {
                            productShapes[tag] = 1;
                        }
                    }
                })

            });

            let lowStepBike  = `<svg class="icon low-step-bike" viewBox="0 0 55 31" width="55" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.289 30.919a10.075 10.075 0 0 1-8.49-4.628 10.058 10.058 0 0 1 1.133-12.336.947.947 0 0 1 1.342-.04c.38.357.403.961.04 1.341a8.158 8.158 0 0 0-.921 10.005c2.435 3.787 7.495 4.892 11.288 2.463a8.12 8.12 0 0 0 3.759-6.976.95.95 0 0 1 .938-.962h.011c.518 0 .944.42.95.939.04 3.5-1.692 6.711-4.628 8.6a9.983 9.983 0 0 1-5.422 1.594ZM51.954 16.88a.957.957 0 0 1-.8-.437 8.166 8.166 0 0 0-8.865-3.512.948.948 0 0 1-1.151-.69.948.948 0 0 1 .69-1.152 10.056 10.056 0 0 1 10.926 4.33.95.95 0 0 1-.8 1.461Z" fill="#312F30"/>
            <path d="M37.623 15.566a.952.952 0 0 1-.69-1.6 10.13 10.13 0 0 1 1.899-1.578 9.918 9.918 0 0 1 2.987-1.29.948.948 0 0 1 1.152.692.948.948 0 0 1-.691 1.15 8.25 8.25 0 0 0-2.424 1.049 8.242 8.242 0 0 0-1.542 1.283.968.968 0 0 1-.69.294ZM17.167 15.245a.927.927 0 0 1-.656-.264 7.289 7.289 0 0 0-.472-.415.95.95 0 0 1 1.209-1.462c.213.178.403.345.576.512a.946.946 0 0 1-.656 1.629Z" fill="#312F30"/><path d="M16.646 14.782a.932.932 0 0 1-.604-.219 8.187 8.187 0 0 0-5.204-1.876c-1.888 0-3.66.627-5.129 1.807a.95.95 0 0 1-1.335-.144.944.944 0 0 1 .144-1.33 10.086 10.086 0 0 1 6.32-2.227c2.331 0 4.61.823 6.412 2.314a.95.95 0 0 1 .127 1.335.967.967 0 0 1-.731.34ZM10.837 30.924C5.288 30.924.77 26.405.77 20.85c0-1.18.201-2.342.604-3.442a.952.952 0 1 1 1.79.65 8.19 8.19 0 0 0-.49 2.792c0 4.508 3.667 8.168 8.169 8.168 4.45 0 8.11-3.62 8.168-8.064a.958.958 0 0 1 .961-.938.95.95 0 0 1 .938.961c-.075 5.486-4.587 9.947-10.073 9.947Z" fill="#312F30"/>
            <path d="M19.952 21.907h-.012a.945.945 0 0 1-.944-.944V20.751a.95.95 0 0 1 .938-.962h.012c.518 0 .944.42.95.938l.005.121v.098a.96.96 0 0 1-.95.961Z" fill="#312F30"/><path d="M19.957 21.692a.952.952 0 0 1-.95-.938 8.128 8.128 0 0 0-2.498-5.779.947.947 0 0 1-.023-1.341.947.947 0 0 1 1.341-.023 9.98 9.98 0 0 1 3.074 7.12.95.95 0 0 1-.939.961h-.005ZM42.055 12.96a.94.94 0 0 1-.909-.69.95.95 0 0 1 .65-1.175.953.953 0 0 1 1.175.65.95.95 0 0 1-.65 1.175.87.87 0 0 1-.266.04Z" fill="#312F30"/>
            <path d="M44.273 21.043a.952.952 0 0 1-.915-.697l-2.222-8.081a.949.949 0 1 1 1.83-.507l2.222 8.082a.949.949 0 0 1-.915 1.203Z" fill="#312F30"/><path d="M42.052 12.959a.952.952 0 0 1-.915-.697L39.99 8.09a.949.949 0 1 1 1.83-.506l1.146 4.173a.949.949 0 0 1-.915 1.203Z" fill="#312F30"/><path d="M40.907 8.788a.953.953 0 0 1-.91-.668l-1.484-4.783-5.503-.513a.95.95 0 0 1-.858-1.036.94.94 0 0 1 1.036-.858l6.136.576c.38.035.708.3.818.662l1.675 5.388a.954.954 0 0 1-.628 1.191.955.955 0 0 1-.282.04ZM21.901 8.398a.952.952 0 0 1-.892-.628l-1.49-4.116a.946.946 0 0 1 .569-1.214.946.946 0 0 1 1.214.57l1.491 4.115a.946.946 0 0 1-.892 1.273Z" fill="#312F30"/><path d="M25.259 4.846c-.047 0-.098-.006-.144-.011l-9.458-1.44a.95.95 0 1 1 .288-1.876l9.457 1.445a.95.95 0 0 1 .795 1.082.951.951 0 0 1-.938.8Z" fill="#312F30"/><path class="color-path" d="M27.457 21.34a.947.947 0 0 1-.662-.27.947.947 0 0 1-.017-1.341L39.942 6.242a.952.952 0 0 1 1.341-.017.947.947 0 0 1 .017 1.341L28.136 21.053a.923.923 0 0 1-.679.287Z" fill="#26BBEE"/><path d="M16.644 14.782a.95.95 0 0 1-.731-1.554l5.255-6.384a.95.95 0 0 1 1.462 1.209l-5.255 6.383a.945.945 0 0 1-.731.346Z" fill="#312F30"/>
            <path d="M10.832 22.12a.944.944 0 0 1-.84-.512.949.949 0 0 1 .086-1.02l3.35-4.35 2.476-3.011a.95.95 0 0 1 1.462 1.208l-2.458 2.982-2.084 2.706 7.069-.329a.945.945 0 0 1 .995.904.955.955 0 0 1-.903.996l-9.118.426h-.035Z" fill="#312F30"/><path d="M19.955 21.693a.95.95 0 0 1-.046-1.9l7.5-.35a.96.96 0 0 1 .996.903.956.956 0 0 1-.904.996l-7.5.351h-.046Z" fill="#312F30"/><path class="color-path" d="M27.456 21.341a.958.958 0 0 1-.875-.575l-5.64-13.182a.95.95 0 1 1 1.75-.748l5.64 13.181a.951.951 0 0 1-.875 1.324Z" fill="#26BBEE"/></svg>`;
            let midStepBike  = `<svg class="icon mid-step-bike" viewBox="0 0 54 31" width="54" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.746 30.927a9.887 9.887 0 0 1-2.169-.237 9.99 9.99 0 0 1-6.326-4.4 10.053 10.053 0 0 1 1.133-12.335.95.95 0 0 1 1.382 1.3 8.152 8.152 0 0 0-.92 10.005 8.096 8.096 0 0 0 5.136 3.568 8.14 8.14 0 0 0 6.153-1.105 8.126 8.126 0 0 0 3.759-6.98.949.949 0 0 1 .937-.96h.011c.52 0 .943.417.948.937a10.01 10.01 0 0 1-4.632 8.6 9.89 9.89 0 0 1-5.412 1.607ZM51.395 16.872a.944.944 0 0 1-.798-.44 8.162 8.162 0 0 0-8.865-3.51.947.947 0 1 1-.462-1.838 10.055 10.055 0 0 1 10.929 4.325.952.952 0 0 1-.283 1.313.98.98 0 0 1-.52.15Z" fill="#fff"/>
            <path d="M37.075 15.561a.95.95 0 0 1-.694-1.602 10.065 10.065 0 0 1 4.886-2.868.947.947 0 1 1 .463 1.839 8.058 8.058 0 0 0-2.423 1.047 8.208 8.208 0 0 0-1.544 1.284.953.953 0 0 1-.688.3ZM16.608 15.243a.941.941 0 0 1-.66-.266 9.09 9.09 0 0 0-.468-.417.947.947 0 0 1-.127-1.336.947.947 0 0 1 1.336-.127c.214.18.405.347.578.515a.95.95 0 0 1-.66 1.63Z" fill="#fff"/>
            <path d="M16.085 14.773a.936.936 0 0 1-.607-.22 8.18 8.18 0 0 0-5.199-1.873c-1.885 0-3.66.624-5.129 1.81a.948.948 0 0 1-1.336-.145.948.948 0 0 1 .145-1.336 10.082 10.082 0 0 1 6.32-2.232c2.337 0 4.615.822 6.413 2.313a.947.947 0 0 1 .128 1.336.948.948 0 0 1-.735.347ZM10.277 30.922C4.725 30.922.209 26.405.209 20.854c0-1.185.202-2.342.601-3.44a.952.952 0 0 1 1.787.653 8.162 8.162 0 0 0-.491 2.793c0 4.505 3.666 8.17 8.17 8.17 4.448 0 8.114-3.62 8.166-8.066a.95.95 0 0 1 .948-.937h.012c.526.006.942.44.937.96-.058 5.476-4.574 9.935-10.062 9.935Z" fill="#fff"/>
            <path d="M19.396 21.906h-.018a.935.935 0 0 1-.93-.954v-.191a.95.95 0 0 1 .93-.972.942.942 0 0 1 .966.931l.006.133v.104a.973.973 0 0 1-.954.949Z" fill="#fff"/>
            <path d="M19.398 21.688a.947.947 0 0 1-.948-.936 8.113 8.113 0 0 0-2.499-5.777.95.95 0 0 1 1.319-1.365 10.018 10.018 0 0 1 3.076 7.124.95.95 0 0 1-.936.96c-.006-.006-.006-.006-.012-.006ZM41.5 12.955a.948.948 0 0 1-.902-.648.951.951 0 1 1 1.203.601 1.085 1.085 0 0 1-.3.047Z" fill="#fff"/><path d="M43.721 21.041a.95.95 0 0 1-.913-.7l-2.221-8.084a.947.947 0 0 1 .665-1.168.947.947 0 0 1 1.168.665l2.22 8.084a.947.947 0 0 1-.919 1.203Z" fill="#fff"/><path d="M41.497 12.958a.95.95 0 0 1-.913-.7L39.439 8.09a.947.947 0 0 1 .665-1.168.947.947 0 0 1 1.168.665l1.145 4.17a.947.947 0 0 1-.92 1.202Z" fill="#fff"/><path d="M40.355 8.783a.95.95 0 0 1-.907-.67L37.96 3.33l-5.505-.509a.945.945 0 0 1-.856-1.035.942.942 0 0 1 1.035-.856l6.136.573a.95.95 0 0 1 .821.665l1.677 5.39a.95.95 0 0 1-.624 1.19 1.312 1.312 0 0 1-.29.035ZM22.915 12.757a.965.965 0 0 1-.896-.625l-3.065-8.477a.944.944 0 0 1 .572-1.215.946.946 0 0 1 1.215.573l3.065 8.477a.944.944 0 0 1-.573 1.215 1.22 1.22 0 0 1-.318.052Z" fill="#fff"/><path d="M24.704 4.841c-.046 0-.098-.006-.144-.012L15.1 3.39a.952.952 0 0 1-.799-1.08.955.955 0 0 1 1.082-.799l9.46 1.446c.52.08.873.56.798 1.081a.954.954 0 0 1-.937.804Z" fill="#fff"/><path class="color-path" d="M26.895 21.336a.95.95 0 0 1-.682-1.613L36.899 8.77l-13.768 3.869a.952.952 0 0 1-.515-1.833l17.18-4.83a.95.95 0 0 1 1.076.429c.22.37.162.838-.139 1.15L27.578 21.053a.945.945 0 0 1-.683.284Z" fill="#26BBEE"/><path d="M16.093 14.775a.947.947 0 0 1-.729-1.55l5.257-6.383a.947.947 0 0 1 1.336-.128.947.947 0 0 1 .127 1.336l-5.256 6.384a.96.96 0 0 1-.735.341Z" fill="#fff"/><path d="M10.276 22.12a.96.96 0 0 1-.844-.509.943.943 0 0 1 .087-1.017l3.348-4.355 2.475-3.007a.947.947 0 0 1 1.336-.127.947.947 0 0 1 .127 1.336l-2.458 2.984-2.082 2.706 7.073-.33a.957.957 0 0 1 .994.902.95.95 0 0 1-.902.995l-9.119.428c0-.006-.017-.006-.035-.006Z" fill="#fff"/><path d="M19.397 21.69a.953.953 0 0 1-.047-1.902l7.5-.353a.95.95 0 0 1 .093 1.897l-7.5.352c-.018.006-.03.006-.046.006Z" fill="#fff"/><path class="color-path" d="M26.9 21.336a.949.949 0 0 1-.862-.55L22.02 12.13a.952.952 0 0 1 .463-1.26.952.952 0 0 1 1.26.463l4.02 8.656a.952.952 0 0 1-.862 1.348Z" fill="#26BBEE"/></svg>`;
            let highStepBike = `<svg class="icon high-step-bike" viewBox="0 0 54 31" width="54" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.827 30.928a9.937 9.937 0 0 1-2.17-.236 10.029 10.029 0 0 1-6.338-4.402 10.039 10.039 0 0 1 1.137-12.337.956.956 0 0 1 1.344-.04.952.952 0 0 1 .04 1.343 8.145 8.145 0 0 0-.917 10.008 8.112 8.112 0 0 0 5.143 3.567 8.15 8.15 0 0 0 6.164-1.107 8.13 8.13 0 0 0 3.764-6.977.953.953 0 0 1 .94-.963h.012c.52 0 .947.421.953.94a10.018 10.018 0 0 1-4.641 8.602 9.993 9.993 0 0 1-5.431 1.602ZM51.495 16.869a.96.96 0 0 1-.802-.438 8.18 8.18 0 0 0-8.883-3.51.95.95 0 1 1-.462-1.843 10.092 10.092 0 0 1 10.95 4.327.949.949 0 0 1-.803 1.464Z" fill="#312F30"/>
            <path d="M37.145 15.559a.947.947 0 0 1-.652-.26.947.947 0 0 1-.04-1.342c.566-.6 1.206-1.135 1.905-1.58a9.987 9.987 0 0 1 2.99-1.29.95.95 0 1 1 .461 1.844 8.25 8.25 0 0 0-2.424 1.049 8.253 8.253 0 0 0-1.547 1.285.972.972 0 0 1-.693.293ZM16.65 15.24a.93.93 0 0 1-.658-.265 7.362 7.362 0 0 0-.473-.415.949.949 0 1 1 1.212-1.464c.22.179.404.346.577.513a.947.947 0 0 1-.658 1.63Z" fill="#312F30"/>
            <path d="M16.12 14.774a.935.935 0 0 1-.606-.219 8.197 8.197 0 0 0-5.212-1.872 8.12 8.12 0 0 0-5.137 1.809.95.95 0 1 1-1.195-1.48 10.109 10.109 0 0 1 6.332-2.23c2.337 0 4.617.817 6.424 2.31a.95.95 0 0 1-.606 1.682ZM10.302 30.92c-5.564 0-10.09-4.517-10.09-10.066 0-1.18.203-2.339.607-3.445a.951.951 0 0 1 1.79.645 8.185 8.185 0 0 0-.491 2.795c0 4.506 3.67 8.17 8.184 8.17 4.456 0 8.127-3.618 8.185-8.067a.954.954 0 0 1 .952-.939h.012a.953.953 0 0 1 .94.962c-.074 5.486-4.6 9.945-10.089 9.945Z" fill="#312F30"/
            <path d="M19.427 21.902h-.011a.938.938 0 0 1-.941-.945V20.744a.953.953 0 0 1 .94-.963.96.96 0 0 1 .964.94l.006.12v.098a.971.971 0 0 1-.958.963Z" fill="#312F30"/><path d="M19.436 21.691a.95.95 0 0 1-.953-.94 8.125 8.125 0 0 0-2.499-5.778.95.95 0 0 1 1.322-1.365 9.99 9.99 0 0 1 3.082 7.12.952.952 0 0 1-.94.963h-.012ZM41.577 12.956a.954.954 0 1 1 .906-1.256.954.954 0 0 1-.906 1.255Z" fill="#312F30"/>
            <path d="M43.807 21.047a.954.954 0 0 1-.918-.697l-2.228-8.084a.952.952 0 0 1 1.835-.507l2.229 8.084a.95.95 0 0 1-.918 1.204Z" fill="#312F30"/><path d="M41.575 12.955a.954.954 0 0 1-.918-.697l-1.149-4.172a.954.954 0 0 1 .664-1.17.956.956 0 0 1 1.172.663l1.148 4.172a.95.95 0 0 1-.917 1.204Z" fill="#312F30"/><path d="M40.43 8.783a.949.949 0 0 1-.907-.668l-1.489-4.783-5.512-.513a.95.95 0 1 1 .173-1.89l6.147.571c.381.035.705.3.82.663l1.68 5.387a.949.949 0 0 1-.63 1.187.809.809 0 0 1-.282.046ZM21.585 8.385a.942.942 0 0 1-.878-.588l-1.702-4.114a.95.95 0 0 1 1.755-.726l1.702 4.114a.945.945 0 0 1-.514 1.239.914.914 0 0 1-.363.075Z" fill="#312F30"/><path d="M24.744 4.842c-.046 0-.098-.006-.144-.012l-9.478-1.44a.95.95 0 1 1 .289-1.879l9.478 1.44a.95.95 0 0 1 .796 1.084.958.958 0 0 1-.94.807Z" fill="#312F30"/><path class="color-path" d="M26.945 21.34a.95.95 0 0 1-.681-1.614L37.808 7.92l-16.398.472a.953.953 0 0 1-.982-.922.953.953 0 0 1 .924-.979l18.753-.542a.95.95 0 0 1 .71 1.614l-13.19 13.494a.944.944 0 0 1-.68.282Z" fill="#26BBEE"/><path d="M16.125 14.776a.95.95 0 0 1-.733-1.556l5.264-6.384a.953.953 0 0 1 1.339-.126.95.95 0 0 1 .127 1.336l-5.264 6.385a.965.965 0 0 1-.733.345Z" fill="#312F30"/><path d="M10.302 22.116a.947.947 0 0 1-.843-.513.948.948 0 0 1 .087-1.02l3.353-4.356 2.482-3.008a.95.95 0 1 1 1.466 1.21l-2.464 2.985-2.084 2.708 7.082-.328c.543-.024.97.38.993.904a.948.948 0 0 1-.906.991l-9.132.427h-.034Z" fill="#312F30"/><path d="M19.428 21.69a.955.955 0 0 1-.952-.905.948.948 0 0 1 .906-.991l7.515-.352a.948.948 0 1 1 .087 1.896l-7.516.351h-.04Z" fill="#312F30"/><path class="color-path" d="M26.947 21.339a.952.952 0 0 1-.878-.576L20.505 7.816a.954.954 0 0 1 1.755-.75l5.564 12.948a.951.951 0 0 1-.877 1.325Z" fill="#26BBEE"/></svg>`;




            if (Object.keys(productShapes).length > 0) {

                let index = 1;
                for (const [key, value] of Object.entries(productShapes)) {

                    const el = document.createElement("li");

                    var shapeCategory = key.replace("PFS_", "");


                    // var categoryFilter = `<a class="collection-side-filter__category-btn" data-value="${key}" href="#">${prodCategory}</a>`
                    var shapeFilter = `<a class="collection-side-filter__cta-btn " data-value="${key}" href="">
                                            ${key.includes('Low') ? lowStepBike : key.includes('Mid') ? midStepBike : highStepBike}
                                            <span>${shapeCategory}</span>
                                        </a>`


                    el.innerHTML = shapeFilter;


                    //   categoryFilters.append(ul1, ul2, ul3, ul4);
                    shapeFilters.append(el);
                    index++;
                    // metalFilters.parentNode.style.display = '';

                    //el.classList.add("js-category");
                    //el.setAttribute("data-title", category.toLowerCase());
                }
            } else {
                shapeFilters.style.display = 'none'
            }

        }

        function createSittingPositionFilters() {
            //let allCategory = [];
            var sittingPositions = {};

            products.forEach((product) => {

                product.tags.forEach((tag) => {
                    if (tag.startsWith("PSP_")) {
                        if (sittingPositions[tag]) {
                            sittingPositions[tag]++;
                        } else {
                            sittingPositions[tag] = 1;
                        }
                    }
                })

            });

            let laidBack   = `<svg class="icon" viewBox="0 0 44 41" width="44" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="color-path" d="M41.697 37.652c-12.757-3.939-26.382-4.019-39.207-.328-1.662.478-.954 3.005.717 2.523 12.396-3.563 25.45-3.474 37.773.332 1.657.509 2.37-2.014.717-2.527Z" fill="#26BBEE"/><path d="M36.21 25.436a7 7 0 0 0-1.174.097l-2.12-7.364a.568.568 0 0 0-.543-.407l-4.987-.128a.556.556 0 0 0-.411.142.558.558 0 0 0-.192.402.57.57 0 0 0 .562.575l4.567.116.251.876-9.514-.2a.568.568 0 0 0-.406.138.568.568 0 0 0-.192.407.542.542 0 0 0 .16.398.595.595 0 0 0 .406.173l9.87.208 1.416 4.939c-2.877.947-4.8 3.54-4.8 6.5 0 3.789 3.183 6.873 7.093 6.873 2.462 0 4.71-1.208 6.015-3.23a.548.548 0 0 0-.182-.77.592.592 0 0 0-.8.177c-1.096 1.695-2.978 2.704-5.037 2.704-3.275 0-5.938-2.58-5.938-5.753 0-2.452 1.58-4.607 3.946-5.417l1.43 5.04c.082.293.415.47.712.394a.549.549 0 0 0 .348-.265.534.534 0 0 0 .054-.425l-1.42-5.005c.32-.049.598-.071.863-.071 3.275 0 5.938 2.58 5.938 5.753 0 .31.26.562.58.562.32 0 .58-.252.58-.562.018-3.793-3.165-6.877-7.075-6.877ZM17.588 4.622c1.247 0 2.257-.982 2.257-2.186 0-1.208-1.014-2.186-2.257-2.186-1.247 0-2.256.982-2.256 2.186s1.014 2.186 2.256 2.186Zm-1.1-2.19c0-.589.493-1.067 1.1-1.067.608 0 1.101.478 1.101 1.067 0 .588-.493 1.066-1.1 1.066-.608 0-1.101-.478-1.101-1.066Z" fill="#312F30"/>
            <path d="m26.329 23.81-6.344-3.55.324-7.302 1.092 1.164.388.363 4.005 2.045c.836.628 2.051.57 2.768-.133.407-.398.621-.951.59-1.51a1.983 1.983 0 0 0-.782-1.45l-3.996-2.058-4.32-4.603a3.139 3.139 0 0 0-1.718-1.328 2.937 2.937 0 0 0-.881-.159c-1.731 0-3.202 1.363-3.275 3.04l-.553 12.343c-.014.34.027.677.128.991a2.583 2.583 0 0 0 1.292 1.793l5.545 3.102-3.672 2.372c-1.005.646-1.393 1.88-.986 2.903a.534.534 0 0 0-.188-.027l-.982.022a6.619 6.619 0 0 0-1.758-4.049l2.284-2.403a.552.552 0 0 0-.032-.792.59.59 0 0 0-.818.035l-2.265 2.386a7.252 7.252 0 0 0-8.93-.031.556.556 0 0 0-.087.788.592.592 0 0 0 .814.084 6.065 6.065 0 0 1 7.417-.018L7.274 32.16a.55.55 0 0 0-.1.611c.09.2.283.34.538.332l5.874-.124c-.343 2.872-2.891 5.098-5.887 5.098-3.275 0-5.938-2.58-5.938-5.753 0-.677.119-1.336.356-1.965a.554.554 0 0 0-.343-.717.613.613 0 0 0-.442.018.545.545 0 0 0-.297.319 6.473 6.473 0 0 0-.43 2.34c0 3.789 3.184 6.873 7.094 6.873 3.649 0 6.718-2.73 7.052-6.244l1.027-.022a.561.561 0 0 0 .544-.465 2.454 2.454 0 0 0 1.904.881 2.48 2.48 0 0 0 1.361-.403l7.445-4.806c1.183-.765 1.224-2.164.658-3.15-.27-.47-.996-1.014-1.361-1.173Zm-3.54 2.681-7.157-4.005a1.468 1.468 0 0 1-.735-1.04l-.018-.066a1.918 1.918 0 0 1-.092-.66l.553-12.342c.05-1.084.99-1.965 2.096-1.97.16.01.32.032.47.076.375.12.672.394 1.248.987l4.434 4.73.046.05 4.056 2.084a.867.867 0 0 1 .306.606.842.842 0 0 1-.26.66c-.32.314-.868.322-1.28.004l-3.973-2.036-.251-.23-2.964-3.164-.48 10.7 7.07 3.948c.142.07.672.451.813.7.252.433.38 1.238-.287 1.668l-7.445 4.806c-.297.19-.653.256-1 .185a1.298 1.298 0 0 1-.836-.57c-.37-.576-.17-1.368.452-1.766l5.234-3.355Zm-9.18 5.36-4.563.097 3.174-3.341a5.546 5.546 0 0 1 1.389 3.244Z" fill="#312F30"/></svg>`;
            let upright    = `<svg class="icon" viewBox="0 0 47 41" width="47" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="color-path" d="M41.957 37.563c-12.65-4.078-26.164-4.158-38.888-.343-1.65.495-.948 3.11.714 2.614 12.293-3.69 25.242-3.596 37.464.344 1.64.53 2.346-2.084.71-2.615Z" fill="#26BBEE"/><path d="M29.262 5.173a2.459 2.459 0 0 0 2.448-2.464A2.46 2.46 0 0 0 29.262.25a2.459 2.459 0 0 0-2.45 2.464c0 1.356 1.101 2.459 2.45 2.459Zm-1.198-2.46c0-.663.538-1.204 1.198-1.204.659 0 1.197.541 1.197 1.205 0 .663-.538 1.205-1.197 1.205-.66 0-1.198-.542-1.198-1.205ZM29.667 23.835l-6.202-3.806L27 13.067l.34 1.664c.014.083.436 2.044 2.24 2.327l5.01.703c1.241.117 2.351-.756 2.497-1.942a2.25 2.25 0 0 0-.47-1.678 2.191 2.191 0 0 0-1.513-.825l-3.322-.536-2.231-5.865c-.407-.902-.955-1.415-1.96-1.824a2.75 2.75 0 0 0-.945-.161c-1.265 0-2.652.824-3.365 2l-6.979 11.485a3.53 3.53 0 0 0-.436 1.122 2.88 2.88 0 0 0 .601 2.78c.272.371.602.679.994.918l6.004 3.527-4.447 2.869c-1.212.736-1.659 2.303-.99 3.498a2.55 2.55 0 0 0 2.222 1.307c.46 0 .916-.127 1.314-.37l8.409-5.284c1.304-1.151 1.154-2.552.946-3.284a2.845 2.845 0 0 0-1.252-1.663Zm-9.975 6.854 4.7-3.034a1.078 1.078 0 0 0-.04-1.83l-6.246-3.673a2.224 2.224 0 0 1-.625-.58c-.025-.03-.049-.064-.073-.089a1.626 1.626 0 0 1-.344-1.57l.029-.113c.053-.263.145-.512.281-.732l6.969-11.484c.49-.81 1.46-1.4 2.303-1.4.18 0 .35.029.5.078.766.312 1.033.644 1.256 1.136l2.255 5.928c.135.356.45.615.829.673l3.428.552.068.01a.96.96 0 0 1 .67.36c.164.21.237.469.208.737-.058.478-.514.849-1.038.849-.029 0-.058 0-.077-.005l-4.98-.688c-.932-.151-1.194-1.298-1.203-1.341l-.447-2.171a1.07 1.07 0 0 0-.901-.845 1.05 1.05 0 0 0-1.092.576l-3.845 7.577a1.085 1.085 0 0 0 .393 1.405l6.343 3.893c.344.21.591.542.703.932.218.78.053 1.415-.51 1.947l-8.287 5.2a1.3 1.3 0 0 1-1.804-.483c-.335-.6-.092-1.414.577-1.815Z" fill="#fff"/>
            <path d="M39.079 23.65c-.417 0-.844.04-1.276.113l-1.324-4.835a.629.629 0 0 0-.543-.458l-4.757-.444a.627.627 0 0 0-.116 1.249l4.325.405.243.878-8.52-.556a.625.625 0 0 0-.66.585.627.627 0 0 0 .582.669l8.947.585.61 2.23a7.708 7.708 0 0 0-5.207 7.322c0 4.27 3.453 7.743 7.696 7.743a7.644 7.644 0 0 0 6.527-3.64.631.631 0 0 0-.199-.864.614.614 0 0 0-.47-.077.628.628 0 0 0-.388.278 6.41 6.41 0 0 1-5.47 3.054c-3.555 0-6.45-2.908-6.45-6.484a6.47 6.47 0 0 1 4.292-6.113l1.551 5.684a.631.631 0 0 0 .767.439.63.63 0 0 0 .436-.77l-1.542-5.655a6.4 6.4 0 0 1 .94-.073c3.556 0 6.446 2.907 6.446 6.488 0 .347.281.63.625.63a.629.629 0 0 0 .626-.63c.005-4.278-3.448-7.752-7.691-7.752ZM16.88 30.818l-1.072.024a7.768 7.768 0 0 0-1.91-4.571l2.483-2.713a.63.63 0 0 0-.485-1.054.61.61 0 0 0-.432.2l-2.463 2.688a7.648 7.648 0 0 0-4.86-1.751c-1.75 0-3.467.61-4.83 1.712a.63.63 0 0 0 .33 1.113c.165.02.33-.03.456-.137a6.424 6.424 0 0 1 4.044-1.434c1.455 0 2.876.502 4.016 1.42l-4.471 4.888a.632.632 0 0 0-.112.683c.102.225.325.37.582.37l6.387-.14c-.364 3.244-3.138 5.751-6.402 5.751-3.554 0-6.45-2.907-6.45-6.483 0-.762.132-1.508.389-2.22a.628.628 0 0 0-.374-.805.618.618 0 0 0-.475.02.633.633 0 0 0-.325.355 7.883 7.883 0 0 0-.46 2.66c0 4.268 3.452 7.742 7.695 7.742 3.967 0 7.299-3.079 7.658-7.035l1.115-.025a.626.626 0 0 0 .436-.195.637.637 0 0 0-.034-.912.587.587 0 0 0-.436-.151Zm-2.323.048-4.966.108 3.458-3.776a6.529 6.529 0 0 1 1.508 3.668Z" fill="#fff"/></svg>`;
            let adrenaline = `<svg class="icon" viewBox="0 0 50 41" width="50" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)">
            <path class="color-path" d="M47.15 37.176c-14.874-4.67-30.759-4.765-45.712-.394-1.938.567-1.113 3.563.836 2.991 14.453-4.224 29.672-4.12 44.04.393 1.932.614 2.763-2.382.835-2.99Z" fill="#26BBEE"/><path d="M36.184 5.419c1.444 0 2.62-1.16 2.62-2.582S37.633.25 36.184.25c-1.443 0-2.62 1.16-2.62 2.582s1.177 2.587 2.62 2.587Zm-1.272-2.587c0-.693.575-1.26 1.278-1.26.703 0 1.278.567 1.278 1.26 0 .692-.575 1.259-1.278 1.259a1.27 1.27 0 0 1-1.278-1.26ZM41.377 21.618a8.35 8.35 0 0 0-1.353.116l-.777-2.792-.575-1.915a.676.676 0 0 0-.586-.483l-5.102-.782a.665.665 0 0 0-.73.593.662.662 0 0 0 .602.719l4.639.74.452 1.474.772 2.766c-3.29 1.102-5.532 4.15-5.532 7.63 0 4.444 3.669 8.059 8.179 8.059 2.838 0 5.432-1.417 6.939-3.794a.65.65 0 0 0-.213-.908.684.684 0 0 0-.506-.084.66.66 0 0 0-.416.294 6.83 6.83 0 0 1-5.804 3.175c-3.776 0-6.843-3.028-6.843-6.743 0-2.88 1.843-5.405 4.548-6.354l1.65 5.908c.08.283.347.483.645.483a.68.68 0 0 0 .176-.026.659.659 0 0 0 .468-.808l-1.64-5.872c.33-.047.66-.079.99-.079 3.776 0 6.843 3.023 6.843 6.743 0 .362.299.661.671.661a.663.663 0 0 0 .671-.661c.016-4.445-3.653-8.06-8.168-8.06Z" fill="#312F30"/>
            <path d="m31.093 20.372-1.06-.656-5.165-2.939 4.319-3.227a2.33 2.33 0 0 0 1.486 1.06l4.409 1.029c1.63.377 2.87-.247 3.243-1.627a.605.605 0 0 0 .021-.168c0-1.076-.26-2.151-2.167-2.744l-2.125-.499.277-1.306c.064-.263.101-.551.133-1.013.075-1.133-.138-1.931-.703-2.666-1.214-1.58-3.509-1.889-5.112-.692l-12.072 9.02a3.264 3.264 0 0 0-1.32 2.492 3.24 3.24 0 0 0 1.091 2.566c.666.593 1.06.75 2.104 1.123.031.01.063.026.09.042l4.846 2.755-4.234 2.78c-1.155.762-1.608 2.205-1.14 3.406a.57.57 0 0 0-.207-.031l-1.134.026a7.909 7.909 0 0 0-2.024-4.749l2.63-2.817a.633.633 0 0 0 .177-.473.64.64 0 0 0-.213-.456.68.68 0 0 0-.948.037l-2.61 2.791A8.195 8.195 0 0 0 8.52 21.62c-1.864 0-3.69.635-5.133 1.785a.658.658 0 0 0 .346 1.17.662.662 0 0 0 .49-.142 6.938 6.938 0 0 1 4.292-1.495c1.56 0 3.051.52 4.26 1.469l-4.75 5.084a.652.652 0 0 0-.117.72.668.668 0 0 0 .612.388l6.795-.147c-.389 3.353-3.307 5.971-6.795 5.971-3.775 0-6.843-3.028-6.843-6.743 0-.792.139-1.569.41-2.303a.657.657 0 0 0-.399-.845.672.672 0 0 0-.857.393 7.671 7.671 0 0 0-.5 2.75c0 4.445 3.668 8.06 8.178 8.06 4.234 0 7.754-3.232 8.137-7.32l1.182-.026a.675.675 0 0 0 .469-.205.638.638 0 0 0 .16-.336 2.829 2.829 0 0 0 2.194 1.034c.559 0 1.102-.163 1.57-.472l8.665-5.688c1.118-.735 1.544-1.874 1.16-3.123a2.168 2.168 0 0 0-.953-1.227Zm-6.07 3.054a.663.663 0 0 0 .298-.572.65.65 0 0 0-.336-.551l-5.777-3.285a1.977 1.977 0 0 0-.304-.137c-.958-.34-1.177-.43-1.667-.86a1.922 1.922 0 0 1-.65-1.527 1.967 1.967 0 0 1 .794-1.496l12.072-9.025a2.294 2.294 0 0 1 1.395-.462 2.3 2.3 0 0 1 1.843.898c.362.472.484.97.431 1.778a4.945 4.945 0 0 1-.106.814l-.416 1.952a.656.656 0 0 0 .5.776l2.68.625c1.134.357 1.208.766 1.219 1.39-.197.604-.74.808-1.619.604l-4.41-1.029a1.021 1.021 0 0 1-.793-.908.668.668 0 0 0-1.07-.472l-5.858 4.377a.664.664 0 0 0-.266.566c.016.22.139.42.336.53l6.028 3.427 1.033.64c.192.12.33.294.394.498.207.683 0 1.233-.623 1.643l-8.67 5.698c-.34.226-.75.3-1.15.215-.4-.084-.74-.32-.958-.666-.426-.672-.192-1.6.516-2.067l5.134-3.374Zm-9.697 5.703-5.262.11 3.664-3.92a6.551 6.551 0 0 1 1.598 3.81ZM14.207 7.045h9.277c.32 0 .58-.294.58-.661 0-.368-.26-.661-.58-.661h-9.277c-.32 0-.58.293-.58.66 0 .368.26.662.58.662ZM10.582 9.354h10.14c.319 0 .58-.294.58-.662 0-.367-.261-.66-.58-.66h-10.14c-.32 0-.58.293-.58.66 0 .368.26.662.58.662ZM6.368 11.662h11.081c.32 0 .58-.294.58-.661 0-.367-.26-.661-.58-.661H6.368c-.32 0-.58.294-.58.661 0 .367.26.661.58.661Z" fill="#312F30"/></g><defs><clipPath id="a">
            <path fill="#fff" transform="translate(.33 .25)" d="M0 0h49.231v40H0z"/></clipPath></defs></svg>`;
        



            if (Object.keys(sittingPositions).length > 0) {

                let index = 1;
                for (const [key, value] of Object.entries(sittingPositions)) {

                    const el = document.createElement("li");

                    var sittingPos = key.replace("PSP_", "");


                    // var categoryFilter = `<a class="collection-side-filter__category-btn" data-value="${key}" href="#">${prodCategory}</a>`
                    var sittingFilter = `<a class="collection-side-filter__cta-btn " data-value="${key}" href="">
                                            ${key.includes('Relaxed') ? laidBack : key.includes('Upright') ? upright : adrenaline}
                                            <span>${sittingPos}</span>
                                        </a>`


                    el.innerHTML = sittingFilter;


                    //   categoryFilters.append(ul1, ul2, ul3, ul4);
                    sitingPositionFilters.append(el);
                    index++;
                    // metalFilters.parentNode.style.display = '';

                    //el.classList.add("js-category");
                    //el.setAttribute("data-title", category.toLowerCase());
                }
            } else {
                sitingPositionFilters.style.display = 'none'
            }

        }

        function createTerrainFilters() {
            var terrain = {};
            products.forEach((product) => {

                product.tags.forEach((tag) => {
                    if (tag.startsWith("PT_")) {
                        if (terrain[tag]) {
                            terrain[tag]++;
                        } else {
                            terrain[tag] = 1;
                        }
                    }
                })

            });

            let gravel   = `<svg class="icon"  fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0.44 0.5 54.67 30"><g clip-path="url(#a)"><path d="M4.988 6.39c-3.073 0-3.073 4.764 0 4.764s3.073-4.763 0-4.763ZM12.965 2.875c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM22.328.496c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM31.574.496c-3.073 0-3.073 4.763 0 4.763s3.067-4.763 0-4.763ZM40.941 2.313c-3.073 0-3.073 4.763 0 4.763s3.067-4.763 0-4.763ZM50.41 6.39c-3.073 0-3.073 4.764 0 4.764 3.073-.006 3.073-4.763 0-4.763Z" fill="#231F20"></path><path d="M10.887 12.43c-3.073 0-3.073 4.763 0 4.763 3.072 0 3.072-4.763 0-4.763ZM18.523 18.777c-3.072 0-3.072 4.763 0 4.763 3.073 0 3.073-4.763 0-4.763ZM22.164 8.453c-3.073 0-3.073 4.763 0 4.763 3.073-.005 3.073-4.763 0-4.763ZM29.05 16.227c-3.072 0-3.072 4.763 0 4.763 3.073 0 3.073-4.763 0-4.763ZM28.496 25.684c-3.073 0-3.073 4.763 0 4.763 3.073-.006 3.073-4.763 0-4.763ZM33.758 8.887c-3.073 0-3.073 4.763 0 4.763 3.067 0 3.067-4.763 0-4.763ZM37.945 18.969c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM44.664 12.32c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763Z" fill="#43BCE9"></path></g><defs><clipPath id="a"><path fill="#fff" transform="translate(.445 .496)" d="M0 0h54.672v30H0z"></path></clipPath></defs></svg>`;
            let paved    = `<svg class="icon" viewBox="0 0 56 33" width="56" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.445 9.238s21.977-15.17 51.411 0" stroke="#26BBEE" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.88 12.125c-3.382 0-3.382 5.245 0 5.245 3.388 0 3.388-5.245 0-5.245ZM17.67 19.727c-3.383 0-3.383 5.244 0 5.244 3.387.006 3.387-5.244 0-5.244ZM21.689 8.973c-3.382 0-3.382 5.244 0 5.244s3.382-5.244 0-5.244ZM28.26 17.813c-3.383 0-3.383 5.244 0 5.244 3.381 0 3.381-5.244 0-5.244ZM33.228 8.625c-3.382 0-3.382 5.245 0 5.245s3.382-5.245 0-5.245ZM38.376 19.633c-3.382 0-3.382 5.244 0 5.244s3.382-5.244 0-5.244ZM43.962 10.89c-3.382 0-3.382 5.245 0 5.245s3.382-5.244 0-5.244ZM28.769 27.281c-3.364 0-3.364 5.214 0 5.214 3.357 0 3.357-5.214 0-5.214Z" fill="#fff"/></svg>`;
            let snow     = `<svg class="icon"  fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0.44 0.5 54.67 30"><g clip-path="url(#a)"><path d="M4.988 6.39c-3.073 0-3.073 4.764 0 4.764s3.073-4.763 0-4.763ZM12.965 2.875c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM22.328.496c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM31.574.496c-3.073 0-3.073 4.763 0 4.763s3.067-4.763 0-4.763ZM40.941 2.313c-3.073 0-3.073 4.763 0 4.763s3.067-4.763 0-4.763ZM50.41 6.39c-3.073 0-3.073 4.764 0 4.764 3.073-.006 3.073-4.763 0-4.763Z" fill="#231F20"></path><path d="M10.887 12.43c-3.073 0-3.073 4.763 0 4.763 3.072 0 3.072-4.763 0-4.763ZM18.523 18.777c-3.072 0-3.072 4.763 0 4.763 3.073 0 3.073-4.763 0-4.763ZM22.164 8.453c-3.073 0-3.073 4.763 0 4.763 3.073-.005 3.073-4.763 0-4.763ZM29.05 16.227c-3.072 0-3.072 4.763 0 4.763 3.073 0 3.073-4.763 0-4.763ZM28.496 25.684c-3.073 0-3.073 4.763 0 4.763 3.073-.006 3.073-4.763 0-4.763ZM33.758 8.887c-3.073 0-3.073 4.763 0 4.763 3.067 0 3.067-4.763 0-4.763ZM37.945 18.969c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763ZM44.664 12.32c-3.073 0-3.073 4.763 0 4.763s3.073-4.763 0-4.763Z" fill="#43BCE9"></path></g><defs><clipPath id="a"><path fill="#fff" transform="translate(.445 .496)" d="M0 0h54.672v30H0z"></path></clipPath></defs></svg>`;
        



            if (Object.keys(terrain).length > 0) {

                let index = 1;
                for (const [key, value] of Object.entries(terrain)) {

                    const el = document.createElement("li");

                    var terr = key.replace("PT_", "");


                    // var categoryFilter = `<a class="collection-side-filter__category-btn" data-value="${key}" href="#">${prodCategory}</a>`
                    var terrFilter = `<a class="collection-side-filter__cta-btn " data-value="${key}" href="">
                                            ${key.includes('Gravel') ? gravel : key.includes('Paved') ? paved : snow}
                                            <span>${terr}</span>
                                        </a>`


                    el.innerHTML = terrFilter;

                    terrainFilters.append(el);
                    index++;

                    //el.classList.add("js-category");
                    //el.setAttribute("data-title", category.toLowerCase());
                }
            } else {
                createTerrainFilters.style.display = 'none'
            }

        }

        initFilters(queryString);
    }

    function getMaxPrice(products){

        let maxPrice = 0;
        let minPrice = Number(products[0].variants[0].price);
        let maxWeight = 0;
        let maxRange = 0;
        let maxHeight = 0;
        let heightCount = 0;
        let rangeCount  = 0;
        let weightCount = 0;


        products.forEach((product, index) => {
            product.tags.forEach((tag) => {
                if (tag.includes('weight_')) {
                    weightCount++;
                    let weight =  Math.ceil(tag.split('_')[1].trim());
                    maxWeight = (maxWeight < weight) ? Number(weight): Number(maxWeight);
                }

                if (tag.includes('range_')) {
                    rangeCount++;
                    let range = Math.ceil(tag.split('_')[1].trim());
                    maxRange =  (maxRange < range) ? Number(range): Number(maxRange);
                }

                if (tag.includes('height_')) {
                    heightCount++;
                    let height = Math.ceil(tag.split('_')[1].trim());
                    maxHeight =  (maxHeight < height) ? Number(height): Number(maxHeight);
                }

            })


        product.variants.forEach((variant) => {
            maxPrice = (maxPrice < Number(variant.price)) ? Number(variant.price) : Number(maxPrice);
            if (Number(variant.price) > 0) {
                minPrice = (minPrice > Number(variant.price)) ? Number(variant.price) : minPrice;
            }
        })

        });

        var inputMin = document.querySelector('.js-filter-range-min');
        var inputMax = document.querySelector('.js-filter-range-max');


        if (inputMin) inputMin.setAttribute('data-min-price', minPrice);
        if (inputMax) inputMax.setAttribute('data-max-price', maxPrice);

        // if (inputWeight) inputWeight.setAttribute('data-max-weight', maxWeight)

        console.log(`AJDE SADA: POCETAK`);
        let priceSliderRange = new filterRangeSlider('.js-filter-range-slider', '.js-filter-range-value', '.js-filter-range-min', '.js-filter-range-max', [minPrice, maxPrice]);
        console.log(`AJDE SADA: ${priceSliderRange}`);
        if (weightCount > 0) {
            let weightSlider = new filterRangeSlider('.js-filter-weight-slider', '.js-filter-weight-value', '', 
            '.js-filter-range-max', [maxWeight]);
        } else {
            weightFilters.style.display = none;
        }

        if (rangeCount > 0) {
            let rangeSlider = new filterRangeSlider('.js-filter-max-range-slider', '.js-filter-range-value', '', '.js-filter-range-max', [maxRange]);
        } else {
            weightCount.style.display = 'none'
        }

        if (heightCount > 0) {
            let heightSlideer = new filterRangeSlider('.js-filter-height-slider', '.js-filter-height-value', '', '.js-filter-range-max', [maxHeight])
        } else {
            heightFilters.style.display = 'none';
        }

    }

    //============================================ INITIALIZE FILTERS =============================================//
    function initFilters(queryString) {

        initPrice(queryString);


        function initSizes(queryString) {
            if (queryString.includes("size=")) {
                const sizes = queryString
                    .slice(queryString.indexOf("size=") + 5, queryString.length)
                    .split("&")[0]
                    .split("+");
                sizeFilters.querySelectorAll("input").forEach((filter) => {
                    if (sizes.includes(filter.value.toLowerCase())) {
                        filter.checked = true;
                    }
                });
            }
        }

        function initWeight(queryString) {
        }

        function initPrice(queryString) {
            if (queryString.includes("ranges=")) {
                const ranges = queryString
                    .slice(queryString.indexOf("ranges=") + 7, queryString.length)
                    .split("&")[0]
                    .split("+");
                priceFilters
                    .querySelectorAll("input[type=checkbox]")
                    .forEach((filter) => {
                        if (ranges.includes(filter.value)) {
                            filter.checked = true;
                        }
                    });
            }

            if (queryString.includes("min=")) {
                const min = queryString
                    .slice(queryString.indexOf("min=") + 4, queryString.length)
                    .split("&")[0];
                priceMin.value = min;
            }

            if (queryString.includes("max=")) {
                const max = queryString
                    .slice(queryString.indexOf("max=") + 4, queryString.length)
                    .split("&")[0];
                priceMax.value = max;
            }
        }
    }

        function appliedFilters(tags, inputs) {
            console.log('applied filters function run');
            tags.forEach((tag) => {
                inputs.forEach((input) => {
                    if (input.tagName.toLowerCase() === 'input') {
                        if (input.value.toLowerCase() === tag.toLowerCase()) {
                            input.click();
                        }
                    }
                })
            })
        }

    //============================================ FILTER PRODUCTS ================================================//
    function filterProducts(queryString, products) {
        console.log('filter products')
        // temporary return products
        let outputProducts = filterAvailable(products);
        outputProducts = filterSort(queryString, outputProducts);        
        outputProducts = filterPrice(queryString, outputProducts);

        // magnum filtering
        outputProducts = filterProductCategory(queryString, outputProducts);
        outputProducts = filterProductShapes(queryString, outputProducts);
        outputProducts = filterProductSittingPosition(queryString, outputProducts);
        outputProducts = filterTerrain(queryString, outputProducts);
        outputProducts = filterWeight(queryString, outputProducts);
        outputProducts = filterRange(queryString, outputProducts);
        outputProducts = filterHeight(queryString, outputProducts);

        //outputProducts = filterBirthstone(queryString, outputProducts);


        return outputProducts;

        function filterAvailable(inputProducts) {

            let outputProducts = inputProducts.filter((product) => {

                product.variants.find((variant) => {
                })

                return product.variants.find((variant) => variant.available);
            });


            return outputProducts;
        }

        // magnum
        function filterPrice(queryString, inputProducts) {
            let outputProducts = [];
            let slider = document.querySelector('.js-filter-range-slider');

            if (queryString.includes("ranges=")) {
                const ranges = queryString
                    .slice(queryString.indexOf("ranges=") + 7, queryString.length)
                    .split("&")[0]
                    .split("+");
                outputProducts = inputProducts.filter((product) => {
                    let matching = false;

                    ranges.forEach((range) => {
                        if (range.endsWith("minus")) {
                            const max = parseInt(range.replace("minus", ""));
                            if (parseFloat(product.variants[0].price) <= max) {
                                matching = true;
                            }
                        } else if (range.endsWith("plus")) {
                            const min = parseInt(range.replace("plus", ""));
                            if (parseFloat(product.variants[0].price) >= min) {
                                matching = true;
                            }
                        } else {
                            const min = parseInt(range.split("-")[0]);
                            const max = parseInt(range.split("-")[1]);
                            if (
                                parseFloat(product.variants[0].price) >= min &&
                                parseFloat(product.variants[0].price) <= max
                            ) {
                                matching = true;
                            }
                        }
                    });

                    if (matching) {
                        return product;
                    }
                });
                return outputProducts;
            } else if (queryString.includes("min=") || queryString.includes("max=")) {
                const min = queryString
                    .slice(queryString.indexOf("min=") + 4, queryString.length)
                    .split("&")[0];
                const max = queryString
                    .slice(queryString.indexOf("max=") + 4, queryString.length)
                    .split("&")[0];

                if (queryString.includes("min=") && queryString.includes("max=")) {
                    inputProducts.forEach((product) => {
                        if (
                            parseFloat(product.variants[0].price) >= parseFloat(min) &&
                            parseFloat(product.variants[0].price) <= parseFloat(max)
                        ) {
                            outputProducts.push(product);
                        }
                    });
                    slider.noUiSlider.set([Number(min), Number(max)]);
                    inputs[0].value = `$ ${Number(min)}`;
                    inputs[1].value = `$ ${Number(max)}`;

                } else if (queryString.includes("min=")) {
                    inputProducts.forEach((product) => {
                        if (parseFloat(product.variants[0].price) >= parseFloat(min)) {
                            outputProducts.push(product);
                        }
                    });
                    slider.noUiSlider.set([Number(min), null]);
                    inputs[0].value = `$ ${Number(min)}`;

                } else {
                    inputProducts.forEach((product) => {
                        if (parseFloat(product.variants[0].price) <= parseFloat(max)) {
                            outputProducts.push(product);
                        }
                    });
                    slider.noUiSlider.set([null, Number(max)]);
                    inputs[1].value =`$ ${Number(max)}`;
                }

                return outputProducts;
            } else {
                var minSliderPrice = Number(input0.getAttribute('data-min-price'));
                var maxSliderPrice = Number(input1.getAttribute('data-max-price'));
                inputs[0].value = `$ ${Number(minSliderPrice)}`;
                inputs[1].value = `$ ${Number(maxSliderPrice)}`;
                return inputProducts;
            }
        }

        function filterWeight(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("weight=")) {
                let weight = queryString
                    .slice(queryString.indexOf("weight=") + 7, queryString.length)
                    .split("&")[0];
                weight = Number(weight);
                inputProducts.forEach((product) => {
                    let productWeight = 0;
                    let bool = false;
                    product.tags.forEach((tag) => {
                        if (tag.includes("weight_")) {
                            productWeight = Number(tag.replace('weight_', ''));
                            bool = true;
                        }
                    })
                    if (bool) {
                        if (productWeight <= weight) {
                            outputProducts.push(product);
                        }
                    }
                })
                return outputProducts;
            } else {
                return inputProducts;
            }
        }

        function filterRange(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("range=")) {
                let range = queryString
                    .slice(queryString.indexOf("range=") + 6, queryString.length)
                    .split("&")[0];
                range = Number(range);
                inputProducts.forEach((product) => {
                    let productRange = 0;
                    let bool = false;
                    product.tags.forEach((tag) => {
                        if (tag.includes("range_")) {
                            productRange = Number(tag.replace('range_', ''));
                            bool = true;
                        }
                    })
                    if (bool) {
                        if (productRange <= range) {
                            outputProducts.push(product);
                        }
                    }
                })
                return outputProducts;
            } else {
                return inputProducts;
            }
        }

        function filterHeight(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("height=")) {
                let height = queryString
                    .slice(queryString.indexOf("height=") + 7, queryString.length)
                    .split("&")[0];
                height = Number(height);
                inputProducts.forEach((product) => {
                    let productHeight = 0;
                    let bool = false;
                    product.tags.forEach((tag) => {
                        if (tag.includes("height_")) {
                            productHeight = Number(tag.replace('height_', ''));
                            bool = true;
                        }
                    })

                    if (bool) {
                        console.log(productHeight, 'prod height test')
                        console.log(height, 'prod height')
                        if (productHeight <= height) {
                            outputProducts.push(product);
                        }
                    }
                })
                return outputProducts;
            } else {
                return inputProducts;
            }
        }

        // magnum filterProductCategoryMethod
        function filterProductCategory(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("product_category=")) {
                const categories = queryString
                    .slice(queryString.indexOf("product_category=") + 17, queryString.length)
                    .split("&")[0]
                    .split("+")
                    .map((c) => decodeURI(c));

                const matches = inputProducts.filter((product) => {
                    const tags = product.tags.filter((tag) => {
                        if (categories.includes(tag)) {
                            if (!allSelectedTags.includes(tag.replace("PC_", ""))) {
                                allSelectedTags.push(tag.replace("PC_", ""));
                            }
                            return tag;
                        }
                    })

                    if (tags.length > 0) {
                        return product;
                    }
                });

                outputProducts = [...outputProducts, ...matches];
                return outputProducts
            } else {
                return inputProducts;
            }
        }

        // magnum filter productShapes 
        function filterProductShapes(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("product_shape=")) {
                const shapes = queryString
                    .slice(queryString.indexOf("product_shape=") + 14, queryString.length)
                    .split("&")[0]
                    .split("+")
                    .map((c) => decodeURI(c));


                const matches = inputProducts.filter((product) => {
                    const tags = product.tags.filter((tag) => {
                        if (shapes.includes(tag)) {
                            if (!allSelectedTags.includes(tag.replace("PFS_", ""))) {
                                allSelectedTags.push(tag.replace("PFS_", ""));
                            }
                            return tag;
                        }
                    })

                    if (tags.length > 0) {
                        return product;
                    }
                });



                outputProducts = [...outputProducts, ...matches];
                return outputProducts
            } else {
                return inputProducts;
            }
        }

        // magnum filter productShapes 
        function filterProductSittingPosition(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("sitting_position=")) {
                const sittingPositions = queryString
                    .slice(queryString.indexOf("sitting_position=") + 17, queryString.length)
                    .split("&")[0]
                    .split("+")
                    .map((c) => decodeURI(c));

                const matches = inputProducts.filter((product) => {
                    const tags = product.tags.filter((tag) => {
                        if (sittingPositions.includes(tag)) {
                            if (!allSelectedTags.includes(tag.replace("PSP_", ""))) {
                                allSelectedTags.push(tag.replace("PSP", ""));
                            }
                            return tag;
                        }
                    })

                    if (tags.length > 0) {
                        return product;
                    }
                });



                outputProducts = [...outputProducts, ...matches];
                return outputProducts
            } else {
                return inputProducts;
            }
        }

        // magnum filter 
        function filterTerrain(queryString, inputProducts) {
            let outputProducts = [];
            if (queryString.includes("terrain=")) {
                const terrain = queryString
                    .slice(queryString.indexOf("terrain=") + 8, queryString.length)
                    .split("&")[0]
                    .split("+")
                    .map((c) => decodeURI(c));

                const matches = inputProducts.filter((product) => {
                    const tags = product.tags.filter((tag) => {
                        if (terrain.includes(tag)) {
                            if (!allSelectedTags.includes(tag.replace("PT_", ""))) {
                                allSelectedTags.push(tag.replace("PT_", ""));
                            }
                            return tag;
                        }
                    })

                    if (tags.length > 0) {
                        return product;
                    }
                });



                outputProducts = [...outputProducts, ...matches];
                return outputProducts
            } else {
                return inputProducts;
            }
        }

        function filterSort(queryString, inputProducts) {
            let outputProducts = [];
            let mode = "asc";

            if (queryString.includes("sort=")) {
                const sorting = queryString
                    .slice(queryString.indexOf("sort=") + 5, queryString.length)
                    .split("&")[0];
                switch (sorting) {
                    case "price-ascending":
                        outputProducts = inputProducts.sort(comparePrice);
                        break;
                    case "price-descending":
                        mode = "desc";
                        outputProducts = inputProducts.sort(comparePrice);
                        break;
                    case "title-ascending":
                        outputProducts = inputProducts.sort(compareTitle);
                        break;
                    case "title-descending":
                        mode = "desc";
                        outputProducts = inputProducts.sort(compareTitle);
                        break;
                    case "created-ascending":
                        outputProducts = inputProducts.sort(compareDate);
                        break;
                    case "created-descending":
                        mode = "desc";
                        outputProducts = inputProducts.sort(compareDate);
                        break;
                    case "manual":
                        outputProducts = allProducts;
                        break;
                    default:
                        outputProducts = inputProducts;
                }
                return outputProducts;
            } else {
                return inputProducts;
            }

            function comparePrice(a, b) {
                let comparison = 0;
                if (parseFloat(a.variants[0].price) > parseFloat(b.variants[0].price)) {
                    if (mode === "asc") {
                        comparison = 1;
                    } else if (mode === "desc") {
                        comparison = -1;
                    }
                } else if (
                    parseFloat(a.variants[0].price) < parseFloat(b.variants[0].price)
                ) {
                    if (mode === "asc") {
                        comparison = -1;
                    } else if (mode === "desc") {
                        comparison = 1;
                    }
                }
                return comparison;
            }

            function compareTitle(a, b) {
                let comparison = 0;
                if (a.title > b.title) {
                    if (mode === "asc") {
                        comparison = 1;
                    } else if (mode === "desc") {
                        comparison = -1;
                    }
                } else if (a.title < b.title) {
                    if (mode === "asc") {
                        comparison = -1;
                    } else if (mode === "desc") {
                        comparison = 1;
                    }
                }
                return comparison;
            }

            function compareDate(a, b) {
                let comparison = 0;
                if (a.created_at.split("T")[0] > b.created_at.split("T")[0]) {
                    if (mode === "asc") {
                        comparison = 1;
                    } else if (mode === "desc") {
                        comparison = -1;
                    }
                } else if (a.created_at.split("T")[0] < b.created_at.split("T")[0]) {
                    if (mode === "asc") {
                        comparison = -1;
                    } else if (mode === "desc") {
                        comparison = 1;
                    }
                }
                return comparison;
            }
        }
    }

    //============================================ PAGINATE PRODUCTS ==============================================//
    function paginateProducts(products, pageSize) {
        let productPages = [];
        const clone = [...products];
        let pageSizeNew = showMoreProducts;

        var i = 0;
        while (clone[0]) {
            if (i === 0) {
                productPages.push(clone.splice(0, pageSize));
            } else {
                productPages.push(clone.splice(0, pageSizeNew));

            }
            i = i + 1;
        }

        return productPages;
    }

    //============================================ RENDER PRODUCTS ================================================//
    function renderProducts(method, productsToRender, totalProducts) {

        let offset = 0;
        if (currentPage != 0 && method === "page") {
            offset = currentPage * pageSize;
        }

        if (renderedProducts) {
            renderedProducts.innerHTML = productsToRender.length + offset;
        }

        console.log(offset + productsToRender.length, 'calc test 1');
        console.log(totalProducts.length, 'total length');

        if (productsToRender.length > 0) {
            if (offset + productsToRender.length === totalProducts.length) {
                 showMoreBtn.style.display = "none";
            } else {
                 showMoreBtn.style.display = "";
            }
        }

        if (method === "all") {
            clearAll();
            if (productsToRender) {
                startRendering();
            }
        } else if (method === "page" && productsToRender) {
            startRendering();
        }

        function clearAll() {
            if (results.childNodes.length > 0) {
                while (results.firstChild) {
                    results.removeChild(results.firstChild);
                }
            }
        }

        function startRendering() {
            // loading.style.display = "none";
            if (productsToRender.length > 0) {
                productsToRender.forEach((product, index) => {
                    if (product.variants[0].price > 0) {

                    const allSizes = [
                        ...new Set(product.variants.map((variant) => variant.option1)),
                    ];
                    const sizesWithInfo = allSizes.map((size) => {
                        const available =
                            product.variants.find(
                                (variant) => variant.option1 == size && variant.available
                            ) != undefined;
                        return {
                            name: size,
                            available: available,
                        };
                    });
                    // const availableSizes = allSizes.filter(size => product.variants.find(variant => variant.option1 == size && variant.available))
                    // const unavailableSizes = allSizes.filter(size => !availableSizes.includes(size))

                    const element = document.createElement("div");
                    let tags = [];

                    product.tags.forEach((tag) => {
                        if (tag.toLowerCase() == 'new') {
                            tags.push(tag);
                        }

                        if (tag.toLowerCase() == "on sale") {
                            tags.push(tag);
                        }

                        if (tag.toLowerCase() == "sold out" ) {
                            tags.push(tag);
                        }
                    })

                    function getLabelColor(label){
                            label = label.toLowerCase();
                            let color = '';

                            if (label.includes('personalized')) {
                                color = window.theme.product.tags.color3;
                            } else if (label.includes('shop')) {
                                color = window.theme.product.tags.color4;
                            } else if(label.includes('stock')) {
                                color = window.theme.product.tags.color1;
                            } else if(label.includes('made')) {
                                color = window.theme.product.tags.color2;
                            }else{
                                color = "#828282";
                            }

                            return color;
                        }

                    let img = getSizedImageUrl(product.images[0].src, '600x');

                    element.classList.add('collection-card');
                    

                    let productItem = `
                    <div class="collection-card">
                    <div class="collection-card__inner">
                    <div class="collection-card__content">
                      <ul class="collection-card__tags">
                        ${
                            tags.map((tag) => {
                                return "<li>" + tag + "</li>" 
                            }).join(" ")
                        }
                      </ul>
                      <a href="" class="h3">${product.title}</a>
                        <ul class="choose-color" style="display: none;">
                        <li>
                            <div class="radio-field">
                                <input type="radio" id="color-1" name="color" checked="checked">
                                    <span class="radio-field__circle"></span>
                                <label for="color-1"> </label>
                            </div>
                        </li>
                        <li>
                            <div class="radio-field">
                                <input type="radio" id="color-2" name="color">
                                    <span class="radio-field__circle"></span>
                                <label for="color-2"> </label>
                            </div>
                        </li>
                       </ul>
                       <div class="collection-card__cta">
                         <a href="" class="btn btn--fill-grey">
                           VIEW DETAILS
                         </a>
                         <a href="" class="u-uppercase" style="display: none!important">
                           Compare
                           {% render 'icon', icon: 'arrow-up-right' %}
                          </a>
                       </div>
                    </div>
                    <div class="collection-card__image">
                      <div class="media-wrapper">
                          <img src="${img}" loading="lazy" width="" height=""/>
                          <div class="collection-card__grid-cta">
                            <a href="/products/${product.handle}" class="btn btn--black-fill">VIEW DETAILS </a>
                            <a href="" class="btn btn--blue-fill" style="display: none!important;">Compare</a>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>
                    `
                    results.innerHTML += productItem;
                 }
                });   
            } else {

        }
    } 
}


    function closeFiltersModal() {
        showModal.classList.remove('active');
    }

    function closeModalOverlay() {
        showModalOverlay.classList.remove('is-open')
    }

    function displayModal() {
        showModal.classList.add('active');
        showModalOverlay.classList.add('is-open')

        var resetFilters = showModal.querySelector('.js-search-info-modal-cta');

        resetFilters.addEventListener('click', () => {
            var minSliderPrice = Number(document.querySelector('.js-input-keypress-0').getAttribute('data-min-price'));
            var maxSliderPrice = Number(document.querySelector('.js-input-keypress-1').getAttribute('data-max-price'));


            var slider = document.querySelector('.js-slider-range');
            slider.noUiSlider.set([minSliderPrice, maxSliderPrice]);
            inputs[0].value = `$ ${minSliderPrice}`;
            inputs[1].value = `$ ${maxSliderPrice}`;
            priceMin.value = minSliderPrice;
            priceMax.value = maxSliderPrice;

            clearFilters[0].click();
            closeFiltersModal();
            closeModalOverlay();
        })
    }

    function addActiveFiletrs(element) {
        console.log('addActiveFilters()')
        let li   = document.createElement('li');
        let span = document.createElement('span');
        let a    = document.createElement('a');
        li.setAttribute('data-value', element.getAttribute('data-value'));
        let textEl  = element.querySelector('span');
        if (textEl != null) {
            span.innerText = textEl.innerText;
        } else {
            span.innerText = element.innerText;
        }
        a.insertAdjacentHTML('afterbegin', icon_close);
        a.addEventListener('click', (event) => {
            event.preventDefault();
            element.click();
        })
        li.insertAdjacentElement('beforeend', span);
        li.insertAdjacentElement('beforeend', a)
        activeFiltersWrapper.insertAdjacentElement('afterbegin', li);
        if (activeFiltersWrapper.querySelectorAll('li').length > 1) {
            activeFiltersWrapper.style.display = "";
        }
    }

    function removeActiveFilters(element) {
        let li = activeFiltersWrapper.querySelector(`li[data-value="${element.getAttribute('data-value')}"]`);
        let parent = li.parentNode;
        if (li) li.remove();
        if (parent.querySelectorAll('li').length === 1) {
            parent.style.display = "none"
        }
    }

    function cleaarAllSelectedFilters(filters) {
        filters.forEach((el) => {
            if (el.classList.contains('is-active')) {
                el.click();
            }
        })
    }

    //============================================ ADD EVENT LISTENERS ============================================//
    function addEventListeners() {
        // magnum filters
        const filterTriggers = [
            ...categoryFilters.querySelectorAll('a'),
            ...shapeFilters.querySelectorAll('a'),
            ...sitingPositionFilters.querySelectorAll('a'),
            ...terrainFilters.querySelectorAll('a'),
        ]

        const rangeFilters = [
            ...document.querySelectorAll('.js-range-filter'),
        ]

        clearAllFilters.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                cleaarAllSelectedFilters(filterTriggers);
            })
        })

        let sortTr = node.querySelectorAll('.js-sort-items .item');
        var sortElement;

        const sortTrigers = [
            sortTr,
        ];

        if (clearFilters) {
            clearFilters.forEach((clear) => {
                clear.addEventListener('click', (e) => {
                    e.preventDefault();
                    inputs.forEach((input) => {
                        if (input.tagName.toLowerCase() === 'input') {
                            if (input.checked) {
                                input.click();
                            }
                        }

                        selectedFiltersWrapper.forEach((selectedFilter) => {
                            var allEl = selectedFilter.querySelectorAll('span');

                            allEl.forEach((inp) => {
                                if (inp.classList.contains('filter-selected')) {
                                    inp.remove();
                                }
                            });
                        })

                    })
                })
            })
        }

        if (sortingButton) {
            sortingButton.addEventListener('change', (evt) => {
                evt.preventDefault();
                processChanges(allProducts);
            })
        }

        // TODO add single clear listener , and fix on refresh bug !!!

        const clearIcon = `<svg class="u-icon icon-print-test-stefan" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.607.706L.415 9.9M9.607 9.899L.415.706" stroke="#908B82" /></svg>`;

        function generateSelectedFilters(el, lbl) {
            if (el.checked) {
                //const selectedWrapper = selectedFiltersWrapper.querySelector('.js-clear-filter');
                selectedFiltersWrapper.forEach((sw) => {
                    var selectedWrapper = sw.querySelector('.js-clear-filter');
                    let span2 = document.createElement('span');
                    let a2    = document.createElement('a');

                    var bool = false;
                    var filterName = ''
                    if (el.value.includes('LC_')) {
                        bool = true;
                        filterName = el.value.replace('LC_', '');
                        if (filterName.toString() === '1') {
                            filterName = filterName + ' letter';
                        } else {
                            filterName = filterName + ' letters';
                        }
                        filterName = filterName.replace('plus', '+')


                    } else if (el.value.includes('SC_')) {

                        bool = true;
                        filterName = el.value.replace('SC_', '');
                        if (filterName.toString() === '1') {
                            filterName = filterName + ' stone';
                        } else {
                            filterName = filterName + ' stones';
                        }
                            filterName = filterName.replace('plus', '+');

                    } else {
                        filterName = el.value.replaceAll('_', ' ');
                    }


                    a2.insertAdjacentHTML('afterbegin', clearIcon);

                    // month replace
                    filterName = filterName.replace('SBM ', '');

                    // CAPLITALISE FIRST

                    var capitaliseFirst = (filterName) => {
                        const strArr = filterName.split(' ');
                       const newArr = strArr.map(word => {
                          const newWord = word[0].toUpperCase() + word.substr(1, word.length - 1);
                          return newWord;
                       });
                       return newArr.join(' ');
                    };

                    var filterCapitalize = capitaliseFirst(filterName);

                    span2.append(filterCapitalize);

                    span2.append(a2);
                    span2.classList.add('filter-selected');

                    a2.addEventListener('click', (event) => {
                        event.preventDefault();
                        el.click();
                        a2.parentNode.remove();
                    })

                    el.addEventListener('click', (event) => {
                        a2.parentNode.remove();
                    })

                        sw.insertBefore(span2, selectedWrapper);
                })
            }
        }

        if (sortTrigers)[
            sortTr.forEach((triger) => {
                triger.addEventListener('click', () => {
                    processChanges(allProducts);
                })
            })
        ]

        if (filterTriggers.length > 0) {
            filterTriggers.forEach((el) => {
                    el.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (el.classList.contains('is-active')) {
                            removeActiveFilters(el);
                        } else {
                            addActiveFiletrs(el);
                        }
                        el.classList.toggle('is-active')
                        processChanges(allProducts);
                    })
            })
        }

        if (rangeFilters.length > 0) {
            rangeFilters.forEach((el) => {
                el.addEventListener('change', (e) => {
                    e.preventDefault();
                    processChanges(allProducts);
                })
            })
        }


        appliedFilters(allSelectedTags, inputs);

        showMoreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showMore(filteredProducts)
        });
    }

    //============================================ PROCESS CHANGES ================================================//
    function processChanges(products) {
        currentPage = 0;
        const queryString = createQueryString();
        window.history.pushState(null, null, queryString);
        filteredProducts = filterProducts(queryString, products);
        productPages = paginateProducts(filteredProducts, pageSize);
        if (filteredProducts.length > 0  && noFilteredProducts) {
            noFilteredProducts = false;
            noProducts.classList.add('is-hide');
            setTimeout(() => {
                if (productPages[0]) {
                    renderProducts("all", productPages[0], filteredProducts);
                } else {
                    renderProducts("all", [], filteredProducts);
                }
            },180)

        } else {
            if (productPages[0]) {
                renderProducts("all", productPages[0], filteredProducts);
            } else {
                renderProducts("all", [], filteredProducts);
            }
        }
    }

    //============================================ CREATE QUERY STRING ============================================//
    function createQueryString() {
        
        const priceMinVal = priceMin.value;
        const priceMaxVal = priceMax.value;

        const maxWeight   =  Number(weight.value);
        const maxRange    = Number(range.value);
        const maxHeight   = Number(height.value);

        let queryString = "";
        
        queryString = queryPrice(
            queryString,
            priceMinVal,
            priceMaxVal
        );

        queryString = queryWeight(queryString, maxWeight);

        queryString = queryRange(queryString, maxRange);


        queryString = queryHeight(queryString, maxHeight);


        // magnum query string
        queryString = queryProductCategory(
            queryString,
            categoryFilters.querySelectorAll("a")
        );

        //magnum
        queryString = queryProductShape(
            queryString,
            shapeFilters.querySelectorAll("a")
        );

        //magnum
        queryString = querySittingPosition(
            queryString,
            sitingPositionFilters.querySelectorAll("a")
        );

        //magnum
        queryString = queryTerrainCondition(
            queryString,
            terrainFilters.querySelectorAll("a")
        );


        queryString = querySorting(queryString, sortingButton);

        if (queryString === "") {
            queryString = window.location.href.split("?")[0];
        }

        return queryString;

        function querySizes(queryString, filters) {
            let activeFilters = [];

            filters.forEach((filter) => {
                if (filter.checked) {
                    activeFilters.push(filter.value);
                }
            });

            if (activeFilters.length > 0) {
                if (queryString === "") {
                    queryString = "?size=";
                } else {
                    queryString += "&size=";
                }

                activeFilters.forEach((filter, index) => {
                    if (index === 0) {
                        queryString += filter.toLowerCase();
                    } else {
                        queryString += `+${filter.toLowerCase()}`;
                    }
                });
                return queryString;
            } else {
                return queryString;
            }
        }

        function queryWeight(queryString, weight) {
            if (weight) {
                if (queryString === "") {
                    queryString = `?weight=${weight}`
                } else {
                    queryString += `&weight=${weight}`
                }
            }

            return queryString;
        }

        function queryRange(queryString, range) {
            if (range) {
                if (queryString === "") {
                    queryString = `?range=${range}`
                } else {
                    queryString += `&range=${range}`
                }
            }

            return queryString;
        }


        function queryHeight(queryString, height) {
            if (height) {
                if (queryString === "") {
                    queryString = `?height=${height}`
                } else {
                    queryString += `&height=${height}`
                }
            }

            return queryString;
        }

        function queryPrice(queryString, min, max) {
            //const activeFilters = [...filters].filter((filter) => filter.checked);
            if (min != "" && max != "") {
                if (parseFloat(min) < parseFloat(max)) {
                    if (queryString === "") {
                        queryString = `?min=${min}&max=${max}`;
                    } else {
                        queryString += `&min=${min}&max=${max}`;
                    }
                } else if (parseFloat(min) === parseFloat(max)) {
                    if (queryString === "") {
                        queryString = `?min=${min}&max=${max}`;
                    } else {
                        queryString += `&min=${min}&max=${max}`;
                    }
                }
            } else if (min != "") {
                if (queryString === "") {
                    queryString = `?min=${min}`;
                } else {
                    queryString += `&min=${min}`;
                }
            } else if (max != "") {
                if (queryString === "") {
                    queryString = `?max=${max}`;
                } else {
                    queryString += `&max=${max}`;
                }
            }


            return queryString;
        }

        // magnum
        function queryProductCategory(queryString, filters) {
            let activeFilters = [];

            filters.forEach((filter) => {
                if (filter.classList.contains('is-active')) {
                    activeFilters.push(filter.dataset.value);
                }
            });

            if (activeFilters.length > 0) {
                if (queryString === "") {
                    queryString = "?product_category="
                } else {
                    queryString += "&product_category="
                }

                activeFilters.forEach((filter, index) => {
                    if (index === 0) {
                        queryString += filter;
                    } else {
                        queryString += `+${filter}`;
                    }
                });
                return queryString;
            } else {
                return queryString;
            }
        }

        //magnum
        function queryProductShape(queryString, filters) {
            let activeFilters = [];

            filters.forEach((filter) => {
                if (filter.classList.contains('is-active')) {
                    activeFilters.push(filter.dataset.value);
                }
            });

            if (activeFilters.length > 0) {
                if (queryString === "") {
                    queryString = "?product_shape="
                } else {
                    queryString += "&product_shape="
                }

                activeFilters.forEach((filter, index) => {
                    if (index === 0) {
                        queryString += filter;
                    } else {
                        queryString += `+${filter}`;
                    }
                });
                return queryString;
            } else {
                return queryString;
            }
        }

        //magnum
        function querySittingPosition(queryString, filters) {
            let activeFilters = [];

            filters.forEach((filter) => {
                if (filter.classList.contains('is-active')) {
                    activeFilters.push(filter.dataset.value);
                }
            });

            if (activeFilters.length > 0) {
                if (queryString === "") {
                    queryString = "?sitting_position="
                } else {
                    queryString += "&sitting_position="
                }

                activeFilters.forEach((filter, index) => {
                    if (index === 0) {
                        queryString += filter;
                    } else {
                        queryString += `+${filter}`;
                    }
                });
                return queryString;
            } else {
                return queryString;
            }
        }

        //magnum
        function queryTerrainCondition(queryString, filters) {
            let activeFilters = [];

            filters.forEach((filter) => {
                if (filter.classList.contains('is-active')) {
                    activeFilters.push(filter.dataset.value);
                }
            });

            if (activeFilters.length > 0) {
                if (queryString === "") {
                    queryString = "?terrain="
                } else {
                    queryString += "&terrain="
                }

                activeFilters.forEach((filter, index) => {
                    if (index === 0) {
                        queryString += filter;
                    } else {
                        queryString += `+${filter}`;
                    }
                });
                return queryString;
            } else {
                return queryString;
            }
        }


        function querySorting(queryString, select) {
            if (queryString === "") {
                queryString = "?sort=";
            } else {
                queryString += "&sort=";
            }

            queryString += select.value;
            return queryString;
        }
    }

    //============================================ SHOW MORE ======================================================//
    function showMore(totalProducts) {

        if (productPages.length - 1 > currentPage) {
            currentPage++;
            renderProducts("page", productPages[currentPage], totalProducts);

            const location = window.location.href;
            if (location.includes("page=")) {
                if (location.includes("?")) {
                    window.history.pushState(
                        null,
                        null,
                        `${window.location.href.split("page=")[0]}page=${currentPage + 1}`
                    );
                } else {
                    window.history.pushState(
                        null,
                        null,
                        `${window.location.href}&page=${currentPage + 1}`
                    );
                }
            } else {
                if (location.includes("?")) {
                    window.history.pushState(
                        null,
                        null,
                        `${window.location.href}&page=${currentPage + 1}`
                    );
                } else {
                    window.history.pushState(
                        null,
                        null,
                        `${window.location.href}?page=${currentPage + 1}`
                    );
                }
            }
        }
    }
});