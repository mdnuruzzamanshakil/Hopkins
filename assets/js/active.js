/*global jQuery */
(function($) {
    "use strict";

    /*===============================
        ----- JS Index -----

    01. Background Image JS
    02. Header Search Box JS
    03. Responsive Menu JS
    04. Magnific Popup JS
    05. Scroll To Top JS
    06. Video Background JS
    07. Progress Bar JS
    08. Portfolio Filter JS
    09. Nice Select JS
    10. Product Quantity JS
    11. Checkout Page Checkbox Accordion
    12. Blog Layout Change
    13. Contact Map JS
    14. Ajax Contact Form JS
        All Slider Activation
    ==================================*/

    jQuery(document).ready(function($) {

        /*--------------------------
            01. Background Image JS
        ---------------------------*/
        const bgSelector = $("[data-bg]");
        bgSelector.each(function(index, elem) {
            const element = $(elem),
                bgSource = element.data('bg');
            element.css('background-image', 'url(' + bgSource + ')');
        });

        /*----------------------------
            02. Header Search Box JS
        -------------------------------*/
        $(".btn-search").on('click', function() {
            $(".header-search-box").toggleClass('show');
            $(this).toggleClass('active');

            return false;
        });

        /*------------------------------
            03. Responsive Menu JS
        --------------------------------*/
        $('.main-nav').slicknav({
            appendTo: '.res-mobile-menu',
            closeOnClick: true,
            removeClasses: true,
            closedSymbol: '<i class="ion-plus"></i>',
            openedSymbol: '<i class="ion-minus"></i>'
        });

        const resCanvasWrapper = $(".off-canvas-menu");
        $(".btn-menu").on('click', function() {
            resCanvasWrapper.addClass('active');
            $("body").addClass('fix');
        });

        $(".off-canvas-overlay, .btn-close").on('click', function() {
            $(".off-canvas-wrapper").removeClass('active');
            $("body").removeClass('fix');
        });

        $('.config-nav').slicknav({
            appendTo: '.res-site-config',
            closeOnClick: true,
            removeClasses: true,
            closedSymbol: '<i class="ion-plus"></i>',
            openedSymbol: '<i class="ion-minus"></i>'
        });

        /*---------------------------
           04. Magnific Popup JS
        ------------------------------*/
        // For Video Popup
        const videopopup = $(".btn-video-popup");
        videopopup.magnificPopup({
            type: 'iframe',
            mainClass: 'ht-mfp zoom-animate',
            removalDelay: 800,
            closeBtnInside: false
        });

        // For Image Gallery Popup
        const imgGallery = $(".image-gallery-popup");
        imgGallery.magnificPopup({
            delegate: '[data-mfp-src]',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'ht-mfp mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 400,
                opener: function(element) {
                    return element.find('img');
                }
            }
        });

        // Custom Gallery on Button Click
        const galleryBtnPopup = $(".btn-gallery-popup");
        galleryBtnPopup.on('click', function(event) {
            event.preventDefault();

            const gallery = $(this).attr('href');

            $(gallery).magnificPopup({
                delegate: '[data-mfp-src]',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'ht-mfp zoom-animate mfp-img-mobile',
                removalDelay: 800,
                image: {
                    verticalFit: true
                },
                gallery: {
                    enabled: true
                }
            }).magnificPopup('open');
        });


        // For Single Image Popup
        const imgpopup = $(".btn-img-popup");
        imgpopup.magnificPopup({
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'ht-mfp zoom-animate',
            removalDelay: 800
        });

        /*------------------------
            05. Scroll To Top JS
        -------------------------*/

        $(".btn-scroll-top").on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 1500);
        });


        /*=====================================
           06. Video Background JS
        ======================================*/
        const videoBg = $(".video-bg");

        videoBg.each(function(index, elem) {
            const element = $(elem),
                videoUrl = element.data('url'),
                containment = element.data('containment');

            videoBg.YTPlayer({
                videoURL: videoUrl,
                startAt: 7,
                showControls: false,
                showYTLogo: false,
                mute: true,
                quality: 'highres',
                containment: '.' + containment
            });
        });

        /*--------------------------
            07. Progress Bar JS
        --------------------------*/
        const skillsBar = $(".progress-line-bar");
        skillsBar.appear(function() {
            skillsBar.each(function(index, elem) {
                var elementItem = $(elem),
                    skillBarAmount = elementItem.data('percent');
                elementItem.animate({
                    width: skillBarAmount
                }, 800);
                elementItem.closest('.progress-bar-item').find('.percent').text(skillBarAmount);
                elementItem.closest('.progress-bar-item').find('.progress-info').css('width', skillBarAmount);
            });
        });

        /*--------------------------------
           08. Portfolio Filter JS
         -----------------------------------*/
        const activeId = $(".filter-menu li");
        $(".filter-content").isotope();
        activeId.on('click', function() {
            const $this = $(this),
                filterValue = $this.data('filter');

            $(".filter-content").isotope({
                filter: filterValue
            });

            activeId.removeClass('active');
            $this.addClass('active');
        });

        /*------------------------
           09. Nice Select JS
         ------------------------*/
        $('select').niceSelect();

        /*-----------------------------
          10. Product Quantity JS
        -------------------------------*/
        var proQty = $(".pro-qty");
        proQty.append('<a href="#" class="inc qty-btn">+</a>');
        proQty.append('<a href="#" class= "dec qty-btn">-</a>');
        $('.qty-btn').on('click', function(e) {
            e.preventDefault();
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });

        /*--------------------------------------
          11. Checkout Page Checkbox Accordion
        ----------------------------------------*/
        $("#create_pwd").on("change", function() {
            $(".account-create").slideToggle("100");
        });

        $("#ship_to_different").on("change", function() {
            $(".ship-to-different").slideToggle("100");
        });

        /*-----------------------
        12. Blog Layout Change
        -------------------------*/
        const layoutSelector = $(".layout-switcher li"),
            blogAreaWrap = $(".blog-content-wrap");

        layoutSelector.on('click', function() {
            const viewMode = $(this).data("layout");

            layoutSelector.removeClass('active');
            $(this).addClass('active');

            blogAreaWrap.removeClass('layout-grid layout-list').addClass('layout-' + viewMode);
        });

        /*-------------------------
          13. Contact Map JS
        -----------------------------*/
        const map_id = $('#map_content');
        if (map_id.length > 0) {
            const $lat = map_id.data('lat'),
                $lng = map_id.data('lng'),
                $zoom = map_id.data('zoom'),
                $maptitle = map_id.data('maptitle'),
                $mapaddress = map_id.data('mapaddress'),
                mymap = L.map('map_content').setView([$lat, $lng], $zoom);

            L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map',
                maxZoom: 14,
                minZoom: 2,
                id: 'mapbox.streets',
                scrollWheelZoom: false,
                accessToken: 'sk.eyJ1IjoicmFqdWh0IiwiYSI6ImNqdHk5dGdpYzJqM3A0NGxsYmI3NmhnN3EifQ.kNdHkgfVGmSz6XPmmfG02A'
            }).addTo(mymap);

            const marker = L.marker([$lat, $lng]).addTo(mymap);
            mymap.zoomControl.setPosition('bottomright');
            mymap.scrollWheelZoom.disable();
        }


        /*--------------------------
          14. Ajax Contact Form JS
         ---------------------------*/
        const form = $('#contact-form');
        const formMessages = $('.form-message');
        const formData = form.serialize();

        $(form).submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData
            }).done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success fade show');

                // Set the message text.
                formMessages.html("<button type='button' class='close' data-bs-dismiss='alert'>&times;</button>");
                formMessages.append(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            }).fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger fade show');

                // Set the message text.
                if (data.responseText !== '') {
                    formMessages.html("<button type='button' class='close' data-bs-dismiss='alert'>&times;</button>");
                    formMessages.append(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }
            });
        });

        /*==================================
            All Slider Activation
        ==================================*/

        $(".testimonial-content").lightSlider({
            item: 1,
            slideMargin: 0,
            loop: true,
            controls: false,
            pager: false,
            auto: true,
            adaptiveHeight: false
        });

        $(".slider-banner").lightSlider({
            item: 1,
            slideMargin: 0,
            loop: true,
            controls: false,
            pager: true,
            auto: true,
            adaptiveHeight: false,
            addClass: 'slider-banner-wrap',
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        item: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        item: 1
                    }
                }
            ]
        });

        $(".slider-content-wrap").lightSlider({
            item: 1,
            slideMargin: 0,
            loop: true,
            controls: true,
            prevHtml: "<i class='ion-ios-arrow-left'></i>",
            nextHtml: "<i class='ion-ios-arrow-right'></i>",
            pager: false,
            auto: false,
            speed: 1000,
            pause: 3000,
            adaptiveHeight: false,
            addClass: 'slider-carousel'
        });

        $(".brand-logo-content").lightSlider({
            item: 4,
            slideMargin: 0,
            loop: true,
            controls: false,
            prevHtml: "<i class='ion-ios-arrow-left'></i>",
            nextHtml: "<i class='ion-ios-arrow-right'></i>",
            pager: false,
            auto: true,
            adaptiveHeight: false,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        item: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        item: 2
                    }
                },
                {
                    breakpoint: 401,
                    settings: {
                        item: 1
                    }
                }
            ]
        });

        $(".product-details-thumb-slider").lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            thumbItem: 3,
            thumbMargin: 10,
            slideMargin: 0,
            enableDrag: true,
            currentPagerPosition: 'left',
            prevHtml: "<i class='ion-chevron-left'></i>",
            nextHtml: "<i class='ion-chevron-right'></i>"
        });

        const gallerySelector = $(".product-thumb-area .lSGallery"),
            galleryHeight = gallerySelector.outerHeight(),
            arrowSelector = $(".product-thumb-area .lSAction a"),
            arrowHeight = arrowSelector.outerHeight(),
            position = (galleryHeight / 2) - (arrowHeight / 2);

        arrowSelector.css('bottom', position + 'px');

    }); //End Ready Function

    jQuery(window).on('scroll', function() {
        //Scroll top Hide Show
        if ($(window).scrollTop() >= 400) {
            $('.btn-scroll-top').addClass('show');
        } else {
            $('.btn-scroll-top').removeClass('show');
        }
    }); // End Scroll Function

    jQuery(window).on('load', function() {
        $(".masonry-grid").masonry();
    }); // End Load Function
}(jQuery));