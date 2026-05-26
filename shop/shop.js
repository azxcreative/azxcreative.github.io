(function () {
    'use strict';

    var LETMICRO_URL = 'https://www.letmicro.com';
    var GRID_RESIZE_MS = 420;

    // Mobile navigation
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('.nav__link, .btn').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Category filter + price sort
    var filterButtons = document.querySelectorAll('[data-shop-filter]');
    var sortButtons = document.querySelectorAll('[data-shop-sort]');
    var shopGrid = document.getElementById('shop-grid');
    var shopEmpty = document.getElementById('shop-empty');
    var productCards = shopGrid ? Array.from(shopGrid.querySelectorAll('[data-shop-category]')) : [];

    var currentFilter = 'all';
    var currentSort = null;

    productCards.forEach(function (card, index) {
        card.setAttribute('data-shop-order', String(index));
    });

    function getCardPrice(card) {
        return parseInt(card.getAttribute('data-shop-price'), 10) || 0;
    }

    function getSortedCards() {
        var cards = productCards.slice();

        if (currentSort === 'asc') {
            cards.sort(function (a, b) {
                return getCardPrice(a) - getCardPrice(b);
            });
        } else if (currentSort === 'desc') {
            cards.sort(function (a, b) {
                return getCardPrice(b) - getCardPrice(a);
            });
        } else {
            cards.sort(function (a, b) {
                return parseInt(a.getAttribute('data-shop-order'), 10) - parseInt(b.getAttribute('data-shop-order'), 10);
            });
        }

        return cards;
    }

    function reorderGrid() {
        if (!shopGrid) return;

        getSortedCards().forEach(function (card) {
            shopGrid.appendChild(card);
        });
    }

    function animateGridUpdate(updateFn) {
        if (!shopGrid) {
            if (updateFn) updateFn();
            return;
        }

        var startHeight = shopGrid.offsetHeight;
        shopGrid.style.minHeight = startHeight + 'px';
        shopGrid.classList.add('is-updating');

        if (updateFn) updateFn();

        requestAnimationFrame(function () {
            var endHeight = shopGrid.offsetHeight;
            shopGrid.style.minHeight = endHeight + 'px';

            window.setTimeout(function () {
                shopGrid.style.minHeight = '';
                shopGrid.classList.remove('is-updating');
            }, GRID_RESIZE_MS);
        });
    }

    function applyView() {
        animateGridUpdate(function () {
            reorderGrid();

            productCards.forEach(function (card) {
                var category = card.getAttribute('data-shop-category');
                var show = currentFilter === 'all' || category === currentFilter;
                card.classList.toggle('is-hidden', !show);
            });

            if (shopEmpty) {
                shopEmpty.hidden = currentFilter !== 'handmade';
            }
        });
    }

    function setFilter(filter) {
        currentFilter = filter;

        filterButtons.forEach(function (b) {
            var isActive = b.getAttribute('data-shop-filter') === filter;
            b.classList.toggle('is-active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        applyView();
    }

    function setSort(sort) {
        if (currentSort === sort) {
            currentSort = null;
        } else {
            currentSort = sort;
        }

        sortButtons.forEach(function (b) {
            var sortValue = b.getAttribute('data-shop-sort');
            var isActive = sortValue === currentSort;
            b.classList.toggle('is-active', isActive);
            b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        applyView();
    }

    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = btn.getAttribute('data-shop-filter');
                if (btn.classList.contains('is-active')) {
                    return;
                }
                setFilter(filter);
            });
        });
    }

    if (sortButtons.length && productCards.length) {
        sortButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var sort = btn.getAttribute('data-shop-sort');
                setSort(sort);
            });
        });
    }

    // Hero merch slider
    var heroSlides = document.querySelectorAll('.shop-hero__slide');
    var heroDots = document.querySelectorAll('.shop-hero__dot');
    var heroProduct = document.querySelector('.shop-hero__product');
    var heroProgress = document.querySelector('.shop-hero__progress-fill');
    var heroTitle = document.getElementById('shop-hero-title');
    var heroDescription = document.getElementById('shop-hero-description');
    var heroBuy = document.getElementById('shop-hero-buy');
    var heroSlideIndex = 0;
    var heroSlideDuration = 4500;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function restartHeroProgress() {
        if (!heroProgress) {
            return;
        }

        if (prefersReducedMotion) {
            heroProgress.style.width = '100%';
            heroProgress.style.animation = 'none';
            return;
        }

        heroProgress.style.animation = 'none';
        heroProgress.style.width = '0';
        heroProgress.offsetHeight;
        heroProgress.style.animation = 'shopHeroProgress ' + heroSlideDuration + 'ms linear forwards';
    }

    function updateHeroProduct(slide) {
        if (!slide || !heroTitle || !heroDescription || !heroBuy) {
            return;
        }

        var title = slide.getAttribute('data-title') || '';
        var description = slide.getAttribute('data-description') || '';
        var buyUrl = slide.getAttribute('data-buy-url') || '#';

        heroTitle.textContent = title;
        heroDescription.textContent = description;
        heroBuy.href = buyUrl;
        heroBuy.setAttribute('aria-label', title ? title + ' vásárlása' : 'Termék vásárlása');
    }

    function setHeroSlide(index) {
        var activeSlide = heroSlides[index];

        heroSlides.forEach(function (slide, slideIndex) {
            slide.classList.toggle('is-active', slideIndex === index);
        });

        heroDots.forEach(function (dot, dotIndex) {
            dot.classList.toggle('is-active', dotIndex === index);
        });

        if (heroProduct && !prefersReducedMotion) {
            heroProduct.classList.add('is-changing');
            window.setTimeout(function () {
                updateHeroProduct(activeSlide);
                heroProduct.classList.remove('is-changing');
            }, 180);
        } else {
            updateHeroProduct(activeSlide);
        }

        restartHeroProgress();
    }

    if (heroSlides.length) {
        setHeroSlide(heroSlideIndex);
    }

    if (heroSlides.length > 1 && !prefersReducedMotion) {
        window.setInterval(function () {
            heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
            setHeroSlide(heroSlideIndex);
        }, heroSlideDuration);
    }

    // Shared product detail page
    var productDetailRoot = document.getElementById('product-detail-root');
    var tshirtColors = [
        ['Black', '#050505'], ['Royal Blue', '#1d4f9a'], ['Red', '#c51f2c'], ['Kelly Green', '#2f9a42'],
        ['Navy', '#071c3a'], ['Sport Grey', '#b8b8b8', true], ['Sapphire', '#0089c7'], ['Orange', '#f47b20'],
        ['Light Blue', '#8ed5f0', true], ['Charcoal', '#353535'], ['Burgundy', '#6e1f2d'], ['Brown Savana', '#8a6a4f'],
        ['Mustard', '#d8a41e'], ['Magenta', '#d61f8c'], ['Daisy', '#ffd739', true], ['Paragon', '#56684d'],
        ['Sage', '#9caf88'], ['Sand', '#d4c5a5', true], ['Stone Blue', '#6b7f92'], ['Violet', '#6f4aa8']
    ];
    var hoodieColors = [
        ['Black', '#050505'], ['Royal Blue', '#1d4f9a'], ['Navy', '#071c3a'], ['Sport Grey', '#b8b8b8', true],
        ['Charcoal', '#353535'], ['Red', '#c51f2c'], ['Light Pink', '#f5b6c8', true], ['Sky Blue', '#8ed5f0', true],
        ['Burgundy', '#6e1f2d'], ['Forest green', '#244b32'], ['Cement', '#b8b6ad', true], ['Cocoa', '#6f4a35'],
        ['Daisy', '#ffd739', true], ['Military Green', '#5f6a43'], ['Mustard', '#d8a41e'], ['Paragon', '#56684d'],
        ['Pink Lemonade', '#f7a3b8', true], ['Pistachio', '#bed08d', true], ['Purple', '#6f4aa8'], ['Sand', '#d4c5a5', true],
        ['Stone Blue', '#6b7f92'], ['Tangerine', '#f06f2f'], ['Yellow Haze', '#f5db55', true], ['Aquatic', '#0097a9'],
        ['Blue Dusk', '#446a83'], ['Brown Savana', '#8a6a4f'], ['Cardinal Red', '#9f1f2f'], ['Cobalt', '#2250a8'],
        ['Off White', '#eee7d8', true], ['Sage', '#9caf88'], ['Dusty Rose', '#c9838f'], ['Ash Grey', '#c9c9c2', true],
        ['Carolina Blue', '#86b8df', true], ['Smoke', '#6f7370'], ['Texas Orange', '#c85f28']
    ];
    var capColors = [
        ['Black', '#050505'], ['Royal Blue', '#1d4f9a'], ['Navy', '#071c3a'], ['Red', '#c51f2c'],
        ['Bottle Green', '#123f2f'], ['Aqua', '#2ec5d3'], ['Army/Beige', '#626b43'], ['Beige/White', '#d6c5a7', true],
        ['Dark Grey', '#333333'], ['Dark Grey/Light Grey', '#545454'], ['Navy/White', '#071c3a'], ['Gold', '#d7a31c'],
        ['Kelly Green', '#2f9a42'], ['Orange', '#f47b20'], ['Red/White', '#c51f2c'], ['Royal Blue/White', '#1d4f9a'],
        ['Sky Blue', '#8ed5f0', true]
    ];
    var tshirtSizeGuide = {
        headers: ['Méret', 'A (cm)', 'B (cm)'],
        rows: [['S', '44', '70'], ['M', '49', '73'], ['L', '56', '76'], ['XL', '61', '79'], ['XXL', '66', '81'], ['3XL', '71', '83'], ['4XL', '76', '86'], ['5XL', '81', '88']]
    };
    var hoodieSizeGuide = {
        headers: ['Méret', 'A (cm)', 'B (cm)'],
        rows: [['S', '50', '68'], ['M', '56', '70'], ['L', '60', '72'], ['XL', '64', '74'], ['XXL', '68', '76'], ['3XL', '73', '80'], ['4XL', '78', '80'], ['5XL', '83', '82']]
    };
    var productDescriptions = {
        tshirt: 'Prémium környakas póló, enyhén lazább szabással. Finom szövésű, 100% pamutból*, 185 g/m² vastagságával pedig tökéletes viselet lesz, legyen szó bármilyen alkalomról! *Kivéve: Sport Grey, 90% pamut, 10% poliészter.',
        hoodie: 'Gildan kapucnis pulóver kenguru zsebbel. A picit lazább szabásnak köszönhetően szabad mozgást biztosít, míg a kellemes, puha anyag meleget és megfelelő komfortot nyújt. A két rétegű, jersey bélésű kapucni tökéletesen harmonizál a pulóver színével. Nagyméretű kenguruzseb a kezek melegen tartásához és a fontos apróságok tárolásához. A bordázott mandzsetta és alsó szegély elasztánnal van megerősítve, így hosszú távon is megtartja alakját. Ideális választás szabadidős tevékenységekhez, munkába vagy csapatruházatként. 285 g/m² vastag, 80% pamut, 20% poliészterből készült, hogy a hideg napokon is kedvenc egyedi mintás ruhában lehess!',
        cap: '5 paneles, 100% pamutból készült, állítható méretű baseball sapka. Kedvenc grafikád a homlokodon és még a nap sem tűz a szemedbe!',
        pin: '38 mm átmérőjű kör alakú kitűző. Fém hátlappal és tűzővel, műanyag előlappal. Egyedi kiegészítő bármilyen ruhához vagy táskához.',
        classicMug: '3 dl-es klasszikus fehér bögre. Indítsd kedvenc grafikáddal a napod, hogy vidámabb legyen! Mosogatógépben mosogatható és mikrózható.',
        colorMug: '3 dl-es bögre, fülnél és belül eltérő színnel, hogy feldobd a reggeli kávézást! Mosogatógépben mosogatható és mikrózható.'
    };
    var shopProducts = {
        'good-game-polo': {
            name: 'Good Game',
            category: 'Póló',
            price: '7 990 Ft',
            subtitle: 'Gildan prémium póló színes',
            description: productDescriptions.tshirt,
            summary: 'Good Game grafikás fekete póló WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488104/7126980/azx',
            gallery: [['img/items/good-game-t-shirt-men-front.jpg', 'Good Game póló modellen'], ['img/items/good-game-t-shirt-front-black-just-shirt.jpg', 'Good Game póló termékfotó']],
            colors: tshirtColors,
            recommended: 'Black',
            sizeGuide: tshirtSizeGuide
        },
        'wortex-wave-polo': {
            name: 'WORTEX Wave',
            category: 'Póló',
            price: '6 990 Ft',
            subtitle: 'Gildan prémium póló színes',
            description: productDescriptions.tshirt,
            summary: 'WORTEX Wave grafikás fekete póló WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488108/7126980/azx',
            gallery: [['img/items/wortex-wave-t-shirt-men-front.jpg', 'WORTEX Wave póló modellen'], ['img/items/wortex-wave-t-shirt-front-black-just-shirt.jpg', 'WORTEX Wave póló termékfotó']],
            colors: tshirtColors,
            recommended: 'Black',
            sizeGuide: tshirtSizeGuide
        },
        'legacy-polo': {
            name: 'Legacy 2026',
            category: 'Póló',
            price: '8 490 Ft',
            subtitle: 'Gildan prémium póló színes',
            description: productDescriptions.tshirt,
            summary: 'Legacy 2026 grafikás fekete póló WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488109/7126980/azx',
            gallery: [['img/items/legacy-t-shirt-men-back-main-art.jpg', 'Legacy 2026 póló modellen'], ['img/items/legacy-t-shirt-front-black-just-shirt.jpg', 'Legacy 2026 póló termékfotó']],
            colors: tshirtColors,
            recommended: 'Black',
            sizeGuide: tshirtSizeGuide
        },
        'wortex-2025-polo': {
            name: 'WORTEX 2025',
            category: 'Póló',
            price: '5 990 Ft',
            subtitle: 'Gildan prémium póló színes',
            description: productDescriptions.tshirt,
            summary: 'WORTEX 2025 logós fekete póló WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/detail/1488392',
            gallery: [['img/items/wortex-2025-logo-t-shirt-men-front.jpg', 'WORTEX 2025 póló modellen'], ['img/items/wortex-2025-t-shirt-front-black-just-shirt.jpg', 'WORTEX 2025 póló termékfotó']],
            colors: tshirtColors,
            recommended: 'Black',
            sizeGuide: tshirtSizeGuide
        },
        'my-playstyle-polo': {
            name: 'My Playstyle (narancs)',
            category: 'Póló',
            price: '7 990 Ft',
            subtitle: 'Gildan prémium póló színes',
            description: productDescriptions.tshirt,
            summary: 'My Playstyle mintás fekete póló cheese hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488106/7126980/azx',
            gallery: [['img/items/cheese--t-shirt-men-front.jpg', 'My Playstyle póló modellen'], ['img/items/cheese--t-shirt-front-black-just-shirt.jpg', 'My Playstyle póló termékfotó']],
            colors: tshirtColors,
            recommended: 'Black',
            sizeGuide: tshirtSizeGuide
        },
        'good-game-hoodie': {
            name: 'Good Game',
            category: 'Pulóver',
            price: '11 990 Ft',
            subtitle: 'Gildan kapucnis pulóver színes',
            description: productDescriptions.hoodie,
            summary: 'Good Game grafikás pulóver WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488122/7126980/azx',
            gallery: [['img/items/good-game-hoodie.jpg', 'Good Game pulóver']],
            colors: hoodieColors,
            recommended: 'Black',
            sizeGuide: hoodieSizeGuide
        },
        'wortex-wave-hoodie': {
            name: 'WORTEX Wave',
            category: 'Pulóver',
            price: '11 990 Ft',
            subtitle: 'Gildan kapucnis pulóver színes',
            description: productDescriptions.hoodie,
            summary: 'WORTEX Wave grafikás pulóver WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488124/7126980/azx',
            gallery: [['img/items/wortex-wave-hoodie.jpg', 'WORTEX Wave pulóver']],
            colors: hoodieColors,
            recommended: 'Black',
            sizeGuide: hoodieSizeGuide
        },
        'wortex-cap': {
            name: 'WORTEX',
            category: 'Kiegészítő',
            price: '4 990 Ft',
            subtitle: 'Baseball sapka színes',
            description: productDescriptions.cap,
            summary: 'WORTEX grafikás baseball sapka közösségi hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488110/7126980/azx',
            gallery: [['img/items/wortex-2025-cap.jpg', 'WORTEX sapka']],
            colors: capColors,
            recommended: 'Black',
            sizeGuide: { headers: ['Méret', 'Leírás'], rows: [['fix', 'Állítható méret']] }
        },
        'wortex-wave-pin': {
            name: 'WORTEX Wave 38mm',
            category: 'Kiegészítő',
            price: '990 Ft',
            subtitle: 'Kitűző 38 mm',
            description: productDescriptions.pin,
            summary: 'WORTEX Wave grafikás kitűző közösségi hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488112/7126980/azx',
            gallery: [['img/items/wortex-wave-pin-single.jpg', 'WORTEX Wave kitűző 38mm']],
            colors: [['Basic', '#d9d9d9', true]],
            recommended: 'Basic',
            sizeGuide: { headers: ['Méret', 'Átmérő'], rows: [['38', '38 mm']] }
        },
        'good-game-mug': {
            name: 'Good Game',
            category: 'Bögre',
            price: '3 990 Ft',
            subtitle: 'Klasszikus fehér bögre',
            description: productDescriptions.classicMug,
            summary: 'Good Game mintás fehér bögre WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488114/7126980/azx',
            gallery: [['img/items/good-game-mug.jpg', 'Good Game bögre']],
            colors: [['White', '#ffffff', true]],
            recommended: 'White',
            sizeGuide: { headers: ['Méret', 'Űrtartalom'], rows: [['3dl', '3 dl']] }
        },
        'my-playstyle-mug': {
            name: 'My Playstyle',
            category: 'Bögre',
            price: '4 790 Ft',
            subtitle: 'Színes fülű és belsejű bögre',
            description: productDescriptions.colorMug,
            summary: 'My Playstyle mintás narancs belsős bögre cheese hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488119/7126980/azx',
            gallery: [['img/items/cheese-mug.jpg', 'My Playstyle bögre']],
            colors: [['Orange', '#f47b20']],
            recommended: 'Orange',
            sizeGuide: { headers: ['Méret', 'Űrtartalom'], rows: [['3dl', '3 dl']] }
        },
        'legacy-mug': {
            name: 'Legacy 2026 (fekete)',
            category: 'Bögre',
            price: '4 790 Ft',
            subtitle: 'Színes fülű és belsejű bögre',
            description: productDescriptions.colorMug,
            summary: 'Legacy 2026 mintás fekete belsős bögre WORTEX hangulattal.',
            buyUrl: 'https://www.letmicro.com/galleryproductdetail/1488121/7126980/azx',
            gallery: [['img/items/legacy-black-mug.png', 'Legacy 2026 bögre fekete belsővel']],
            colors: [['Black', '#050505']],
            recommended: 'Black',
            sizeGuide: { headers: ['Méret', 'Űrtartalom'], rows: [['3dl', '3 dl']] }
        }
    };

    function renderColorSwatches(colors) {
        return colors.map(function (color) {
            return '<span class="color-swatch' + (color[2] ? ' color-swatch--light' : '') + '" style="--swatch: ' + color[1] + ';" data-color="' + color[0] + '"></span>';
        }).join('');
    }

    function renderSizeGuide(sizeGuide) {
        var headers = sizeGuide.headers.map(function (header) {
            return '<th>' + header + '</th>';
        }).join('');
        var rows = sizeGuide.rows.map(function (row) {
            return '<tr>' + row.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>';
        }).join('');

        return '<table class="size-guide__table"><thead><tr>' + headers + '</tr></thead><tbody>' + rows + '</tbody></table>';
    }

    function getRecommendedColorHex(colors, recommended) {
        var color = colors.find(function (item) {
            return item[0] === recommended;
        });

        return color ? color[1] : '#050505';
    }

    function setMetaContent(selector, value) {
        var element = document.querySelector(selector);
        if (element) {
            element.setAttribute('content', value);
        }
    }

    function setLinkHref(selector, value) {
        var element = document.querySelector(selector);
        if (element) {
            element.setAttribute('href', value);
        }
    }

    function getAbsoluteUrl(path) {
        return new URL(path, window.location.href).href;
    }

    function getPriceAmount(price) {
        return price.replace(/\D/g, '');
    }

    function getRelatedProducts(currentKey, currentProduct) {
        var productKeys = Object.keys(shopProducts);
        var sameCategory = productKeys.filter(function (key) {
            return key !== currentKey && shopProducts[key].category === currentProduct.category;
        });
        var fallback = productKeys.filter(function (key) {
            return key !== currentKey && shopProducts[key].category !== currentProduct.category;
        });

        return sameCategory.concat(fallback).slice(0, 4).map(function (key) {
            return {
                key: key,
                product: shopProducts[key]
            };
        });
    }

    function renderRelatedProducts(currentKey, currentProduct) {
        var relatedProducts = getRelatedProducts(currentKey, currentProduct);

        if (!relatedProducts.length) {
            return '';
        }

        return '<section class="product-related" aria-labelledby="product-related-title">' +
            '<div class="section__header">' +
                '<h2 class="section__title" id="product-related-title">Hasonló termékek</h2>' +
            '</div>' +
            '<div class="product-related__grid">' +
                relatedProducts.map(function (related) {
                    var product = related.product;
                    var image = product.gallery[0];

                    return '<article class="shop-card">' +
                        '<a href="product.html?item=' + related.key + '" class="shop-card__image-wrap" aria-label="' + product.name + ' részletek">' +
                            '<img class="shop-card__image" src="' + image[0] + '" alt="' + image[1] + '" width="600" height="800" loading="lazy">' +
                        '</a>' +
                        '<div class="shop-card__body">' +
                            '<span class="shop-card__category">' + product.category + '</span>' +
                            '<h3 class="shop-card__title">' + product.name + '</h3>' +
                            '<p class="shop-card__desc">' + product.summary + '</p>' +
                            '<p class="shop-card__price">' + product.price + '</p>' +
                            '<div class="shop-card__actions">' +
                                '<a href="product.html?item=' + related.key + '" class="btn btn--secondary">További info</a>' +
                                '<a href="' + product.buyUrl + '" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Vásárlás</a>' +
                            '</div>' +
                        '</div>' +
                    '</article>';
                }).join('') +
            '</div>' +
        '</section>';
    }

    function updateProductSeo(product, itemId, primaryImage) {
        var title = product.name + ' — WORTEX Shop';
        var description = product.summary + ' Vásárlás a Letmicro partnerünkön keresztül.';
        var canonicalUrl = getAbsoluteUrl('product.html?item=' + encodeURIComponent(itemId));
        var imageUrl = getAbsoluteUrl(primaryImage[0]);
        var priceAmount = getPriceAmount(product.price);
        var keywords = [
            product.name,
            product.category,
            'WORTEX shop',
            'WORTEX merch',
            'gaming merch',
            'esport merch'
        ].join(', ');
        var jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: description,
            image: imageUrl,
            brand: {
                '@type': 'Brand',
                name: 'WORTEX'
            },
            category: product.category,
            offers: {
                '@type': 'Offer',
                url: product.buyUrl,
                priceCurrency: 'HUF',
                price: priceAmount,
                availability: 'https://schema.org/InStock',
                seller: {
                    '@type': 'Organization',
                    name: 'Letmicro'
                }
            }
        };

        document.title = title;
        setMetaContent('#product-meta-description', description);
        setMetaContent('#product-meta-keywords', keywords);
        setLinkHref('#product-canonical', canonicalUrl);
        setMetaContent('#product-og-title', title);
        setMetaContent('#product-og-description', description);
        setMetaContent('#product-og-image', imageUrl);
        setMetaContent('#product-og-url', canonicalUrl);
        setMetaContent('#product-og-price', priceAmount);
        setMetaContent('#product-twitter-title', title);
        setMetaContent('#product-twitter-description', description);
        setMetaContent('#product-twitter-image', imageUrl);

        var jsonLdElement = document.getElementById('product-jsonld');
        if (jsonLdElement) {
            jsonLdElement.textContent = JSON.stringify(jsonLd);
        }
    }

    function renderProductDetail() {
        if (!productDetailRoot) {
            return;
        }

        var itemId = new URLSearchParams(window.location.search).get('item');
        var productKey = shopProducts[itemId] ? itemId : 'good-game-polo';
        var product = shopProducts[productKey];
        var primaryImage = product.gallery[0];
        var recommendedColor = getRecommendedColorHex(product.colors, product.recommended);
        var thumbs = product.gallery.map(function (image, index) {
            return '<button type="button" class="product-gallery__thumb' + (index === 0 ? ' is-active' : '') + '" data-product-thumb data-src="' + image[0] + '" data-alt="' + image[1] + '" aria-label="' + image[1] + '"><img src="' + image[0] + '" alt="" width="200" height="267"></button>';
        }).join('');

        updateProductSeo(product, productKey, primaryImage);

        productDetailRoot.innerHTML =
            '<div class="container">' +
                '<p class="product-breadcrumb"><a href="index.html">Shop</a> / <a href="index.html#termekek">' + product.category + '</a> / ' + product.name + '</p>' +
                '<div class="product-layout product-layout--detail">' +
                    '<div class="product-gallery product-gallery--side">' +
                        '<div class="product-gallery__main"><img id="product-main-image" src="' + primaryImage[0] + '" alt="' + primaryImage[1] + '" width="800" height="1067"></div>' +
                        '<div class="product-gallery__thumbs product-gallery__thumbs--side">' + thumbs + '</div>' +
                    '</div>' +
                    '<div class="product-info">' +
                        '<span class="product-info__category">' + product.category + '</span>' +
                        '<h1 class="product-info__title">' + product.name + '</h1>' +
                        '<p class="product-info__price">' + product.price + '</p>' +
                        '<p class="product-info__text product-info__text--small">' + product.summary + '</p>' +
                        '<div class="product-info__section"><h2 class="product-info__subtitle">' + product.subtitle + '</h2><p class="product-info__text">' + product.description + '</p></div>' +
                        '<button type="button" class="btn btn--secondary product-size-btn" data-modal-open="size-modal">Mérettáblázat</button>' +
                        '<div class="product-colors">' +
                            '<h2 class="product-info__subtitle">Választható színek</h2>' +
                            '<p class="product-info__text product-info__text--small">Válaszd meg okosan a színt a dizájnhoz; ehhez a termékhez az ajánlott választás lent látható.</p>' +
                            '<div class="recommended-color"><span class="recommended-color__label">Termékhez ajánlott szín:</span><span class="recommended-color__value"><span class="recommended-color__swatch" style="background: ' + recommendedColor + ';" aria-hidden="true"></span>' + product.recommended + '</span></div>' +
                            '<div class="color-palette" aria-label="Választható színek">' + renderColorSwatches(product.colors) + '</div>' +
                        '</div>' +
                        '<div class="product-partner"><img src="img/letmicro-logo.png" alt="Letmicro" class="product-partner__logo" width="210" height="60"><p>A gyártást, a fizetést és a kiszállítást partnerünk, a <strong>Letmicro</strong> végzi. A vásárlás gombra kattintva a Letmicro oldalán tudod kiválasztani a méretet, színt és leadni a rendelést.<span class="shop-disclaimer">A képek illusztrációk, a valódi termék megjelenése eltérhet a képen látottaktól.</span></p></div>' +
                        '<div class="product-info__cta product-info__cta--row"><a href="' + product.buyUrl + '" class="btn btn--primary btn--large" target="_blank" rel="noopener noreferrer">Vásárlás</a><a href="https://www.letmicro.com/gallerymain/azx" class="btn btn--secondary btn--large" target="_blank" rel="noopener noreferrer">További termékek</a></div>' +
                    '</div>' +
                '</div>' +
                renderRelatedProducts(productKey, product) +
            '</div>' +
            '<div class="shop-modal" id="size-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="size-modal-title">' +
                '<div class="shop-modal__overlay" data-modal-close></div>' +
                '<div class="shop-modal__content">' +
                    '<button type="button" class="shop-modal__close" data-modal-close aria-label="Mérettáblázat bezárása">&times;</button>' +
                    '<h2 class="shop-modal__title" id="size-modal-title">Mérettáblázat</h2>' +
                    '<div class="size-guide"><div class="size-guide__diagram" aria-hidden="true"><div class="size-guide__shirt"><span class="size-guide__line size-guide__line--a">A</span><span class="size-guide__line size-guide__line--b">B</span></div><p><strong>A:</strong> Szélesség</p><p><strong>B:</strong> Magasság / méretadat</p></div><div class="size-guide__table-wrap">' + renderSizeGuide(product.sizeGuide) + '</div></div>' +
                '</div>' +
            '</div>';
    }

    renderProductDetail();

    // Product gallery thumbnails
    var mainImage = document.getElementById('product-main-image');
    var thumbs = document.querySelectorAll('[data-product-thumb]');

    if (mainImage && thumbs.length) {
        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                var src = thumb.getAttribute('data-src');
                var alt = thumb.getAttribute('data-alt');
                if (!src) return;

                mainImage.src = src;
                if (alt) mainImage.alt = alt;

                thumbs.forEach(function (t) {
                    t.classList.toggle('is-active', t === thumb);
                });
            });
        });
    }

    // Lightweight modal handling (size chart)
    var modalOpenButtons = document.querySelectorAll('[data-modal-open]');
    var modalCloseButtons = document.querySelectorAll('[data-modal-close]');

    function setModalOpen(modal, isOpen) {
        if (!modal) return;
        modal.classList.toggle('is-open', isOpen);
        modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    modalOpenButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var modal = document.getElementById(button.getAttribute('data-modal-open'));
            setModalOpen(modal, true);
        });
    });

    modalCloseButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setModalOpen(button.closest('.shop-modal'), false);
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('.shop-modal.is-open').forEach(function (modal) {
            setModalOpen(modal, false);
        });
    });

    document.querySelectorAll('[data-letmicro-buy]').forEach(function (el) {
        if (!el.getAttribute('href') || el.getAttribute('href') === '#') {
            el.setAttribute('href', LETMICRO_URL);
        }
    });
})();
