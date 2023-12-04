(function($) {
    "use strict";

    $(document).on('ready', function() {


        /* ==================================================
            # Wow Init
         ===============================================*/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();


        /* ==================================================
            # Smooth Scroll
         ===============================================*/
        $("body").scrollspy({
            target: ".navbar-collapse",
            offset: 200
        });
        $('a.smooth-menu').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '75';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });


        /* ==================================================
            # Banner Animation
        ===============================================*/
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });


        /* ==================================================
            # Equal Height Init
        ===============================================*/
        $(window).on('resize', function() {
            $(".equal-height").equalHeights();
        });

        $(".equal-height").equalHeights().find("img, iframe, object").on('load', function() {
            $(".equal-height").equalHeights();
        });


        /* ==================================================
            # Youtube Video Init
         ===============================================*/
        $('.player').mb_YTPlayer();


        /* ==================================================
            # imagesLoaded active
        ===============================================*/
        $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

            /* Filter menu */
            $('.mix-item-menu').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            /* filter menu active class  */
            $('.mix-item-menu button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            /* Filter active */
            var $grid = $('#portfolio-grid').isotope({
                itemSelector: '.pf-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.pf-item',
                }
            });

        });


         /* ==================================================
            # Fun Factor Init
        ===============================================*/
        $('.timer').countTo();
        $('.fun-fact').appear(function() {
            $('.timer').countTo();
        }, {
            accY: -100
        });


        /* ==================================================
            # Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.magnific-mix-gallery').each(function() {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function() {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });

        /* ==================================================
            # Content Carousel
         ===============================================*/
        $('.content-carousel').owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Offer Carousel
         ===============================================*/
        $('.offer-carousel').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });


        /* ==================================================
            # Services Carousel
         ===============================================*/
        $('.services-carousel').owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });


        /* ==================================================
            #  Testimonials Carousel
         ===============================================*/
        $('.testimonials-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });

        /* ==================================================
            # Food Menu Carousel
         ===============================================*/
        $('.food-menu-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items:3
                }
            }
        });


        /* ==================================================
            Preloader Init
         ===============================================*/
        $(window).on('load', function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");;
        });


        /* ==================================================
            Nice Select Init
         ===============================================*/
        $('select').niceSelect();


        /* ==================================================
            Contact Form Validations
        ================================================== */
        $('.contact-form').each(function() {
            var formInstance = $(this);
            formInstance.submit(function() {

                var action = $(this).attr('action');

                $("#message").slideUp(750, function() {
                    $('#message').hide();

                    $('#submit')
                        .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.post(action, {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            comments: $('#comments').val()
                        },
                        function(data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('.contact-form img.loader').fadeOut('slow', function() {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                        }
                    );
                });
                return false;
            });
        });

    }); // end document ready function
})(jQuery); // End jQuery
// JavaScript to toggle the cart
$(document).ready(function () {
    $('.side-cart').on('click', function () {
        $('#customOffcanvas, .overlay').toggleClass('show');
    });
});

// JavaScript to close the cart
function closeCustomOffcanvas() {
    $('#customOffcanvas, .overlay').removeClass('show');
}
// When the window y scroll > 32, add a class to the <a> tag in <li> with class "quote-button"
var getQuoteButton = document.querySelector('.quote-btn a');

if (getQuoteButton) {
    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 32) {
            getQuoteButton.id = "home-quote-btn-color";
        } else {
            getQuoteButton.removeAttribute("id");
        }
    });
}
//FOOD CATEGORIES
$(document).ready(function () {
    // Scroll to the left
    $(".left").on("click", function () {
        $(".category-container").animate({ scrollLeft: "-=300px" }, "slow");
    });

    // Scroll to the right
    $(".right").on("click", function () {
        $(".category-container").animate({ scrollLeft: "+=300px" }, "slow");
    });
});

$(document).ready(function () {
    // Scroll to the left
    $(".left").on("click", function () {
        $(".menu-category-container").animate({ scrollLeft: "-=380px" }, "slow");
    });

    // Scroll to the right
    $(".right").on("click", function () {
        $(".menu-category-container").animate({ scrollLeft: "+=380px" }, "slow");
    });
});

$(document).ready(function () {
    var scrollInterval;

    // Function to start automatic sliding
    function startAutoSlide() {
        scrollInterval = setInterval(function () {
            var container = $(".category-container");
            var cardWidth = $(".card").outerWidth(true);

            container.animate({ scrollLeft: "+=" + cardWidth + "px" }, "slow", function () {
                // Check if we've reached the end
                if (container.scrollLeft() + container.width() >= container[0].scrollWidth) {
                    // If at the end, reset to the beginning
                    container.scrollLeft(0);
                }
            });
        }, 3000); // Adjust the interval as needed (3000 milliseconds = 3 seconds)
    }

    // Function to stop automatic sliding
    function stopAutoSlide() {
        clearInterval(scrollInterval);
    }

    // Scroll to the left
    $(".left").on("click", function () {
        $(".category-container").stop().animate({ scrollLeft: "-=300px" }, "slow", function () {
            // Check if we've reached the beginning
            if ($(this).scrollLeft() === 0) {
                // If at the beginning, scroll to the end for a smooth loop
                $(this).scrollLeft($(this)[0].scrollWidth);
            }
        });
        stopAutoSlide();
    });

    // Scroll to the right
    $(".right").on("click", function () {
        $(".category-container").stop().animate({ scrollLeft: "+=300px" }, "slow", function () {
            // Check if we've reached the end
            if ($(this).scrollLeft() + $(this).width() >= $(this)[0].scrollWidth) {
                // If at the end, reset to the beginning
                $(this).scrollLeft(0);
            }
        });
        stopAutoSlide();
    });

    // Start automatic sliding on page load
    startAutoSlide();

    // Pause automatic sliding when hovering over the category container
    $(".category-container").hover(
        function () {
            stopAutoSlide();
        },
        function () {
            startAutoSlide();
        }
    );
});

//ACTUAL MENU
$(document).ready(function () {
    $('#categories .toggle-arrow').click(function () {
        $('#categories').toggleClass('active');
    });
});