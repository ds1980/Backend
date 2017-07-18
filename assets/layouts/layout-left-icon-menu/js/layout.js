(function ($) {
    "use strict";

    var $body = $("body");
    $.extend(CORE_TEMP.function, {
        SiteColor: function () {
            var $site_color = $('.site-color'), /* variable used on Site Color Settings */
                $site_color_elements = $('#site-color'),
                $site_dark_color_elements = $('#site-dark-color'),
                $site_dark_color_switch = $('.dark-color-switch'), /* variable used on Site Color Settings */
                $cssRoot = '../../../assets/layouts/layout-left-icon-menu/css/color/'; /* variable used on Site CSS path */


            /*----- START SITE COLOR SETTINGS JS -----*/

            $site_color.children('div').on('click', function (e) {
                e.preventDefault();
                var $this = $(this), /* global variable */
                    $this_color = $this.attr('data-color'),
                    $site_dark_color = localStorage.getItem("site_dark_color");
                /* Global Color Value */

                // Remove and ADD color active class
                $site_color.children('div').removeClass('color-active'),
                    $this.addClass('color-active');

                // Change CSS href
                $site_color_elements.attr("href", $cssRoot + "light/color-" + $this_color + ".min.css");

                if ($site_dark_color !== null && $site_dark_color !== "") {
                    if ($("#site-dark-color").length == 0) {
                        $site_color_elements.after('<link id="site-dark-color" rel="stylesheet" href="' + $cssRoot + 'dark/color-' + $this_color + '-' + $site_dark_color + '.min.css">');
                    } else {
                        $('#site-dark-color').attr('href', $cssRoot + 'dark/color-' + $this_color + '-' + $site_dark_color + '.min.css');
                    }
                }

                // Check Color value is null or not
                if ($this_color == null || $this_color == "") {
                    localStorage.setItem("site_color", $this_color);
                } else {
                    localStorage.setItem("site_color", $this_color);
                }

            });

            // Get Template Color from local storage
            if (localStorage.getItem("site_color") !== null) {
                $site_color.children('div[data-color=' + localStorage.getItem("site_color") + ']').trigger('click');
            }

            /*----- END SITE COLOR SETTINGS JS -----*/

            /*----- START SITE DARK COLOR SETTINGS JS -----*/

            $site_dark_color_switch.on('click', function () {
                // Check value true is true
                if ($(".site-dark-check").prop("checked") == true) {
                    $('.dark-color').css("font-weight", "700").html("Dark");
                    localStorage.setItem("site_dark_color", "gray");

                    // Get Template Color and dark color from local storage
                    var site_color = localStorage.getItem("site_color");
                    var site_dark_color = localStorage.getItem("site_dark_color");

                    if (site_dark_color !== null && site_dark_color !== "") {
                        if (site_color == null) {
                            $site_color_elements.after('<link id="site-dark-color" rel="stylesheet" href="' + $cssRoot + 'dark/color-default-' + site_dark_color + '.min.css">');
                        } else if ($("#site-dark-color").length == 0) {
                            $site_color_elements.after('<link id="site-dark-color" rel="stylesheet" href="' + $cssRoot + 'dark/color-' + site_color + '-' + site_dark_color + '.min.css">');
                        } else {
                            $('#site-dark-color').attr('href', $cssRoot + 'dark/color-' + site_color + '-' + site_dark_color + '.min.css');
                        }
                    } else {
                        $('#site-dark-color').remove();
                    }

                } else {
                    $('.dark-color').css("font-weight", "normal").html("Light");
                    localStorage.removeItem("site_dark_color");
                    $('#site-dark-color').remove();
                }
            });


            // Det Template Dark Color from local storage
            if (localStorage.getItem("site_dark_color") !== null) {
                $('.dark-color').css("font-weight", "700").html("Dark");
                $('.dark-color-switch').children('.js-switch').prop('checked', true);
                $site_dark_color_switch.trigger('click');
            }

            /*----- END SITE DARK COLOR SETTINGS JS -----*/
        },
        NavigetionLightDark : function(){
            var $nav_dark_color = $('.nav-color-switch'), /* variable used on Navigation Color Settings */
                $nav_dark_check = $('.nav-dark-check'),
                $nav_color = $('.nav-dark-color');
            $nav_dark_color.on('click', function (e) {
                e.preventDefault();
                if ($nav_dark_check.prop("checked") == true) {
                    $nav_color.css("font-weight", "700").html("Light");
                    localStorage.setItem("navigation_light", "light");
                    $body.addClass('nav-light');
                } else {
                    $nav_color.css("font-weight", "normal").html("Dark");
                    localStorage.removeItem("navigation_light");
                    $body.removeClass('nav-light');
                }

            });

            if (localStorage.getItem("navigation_light") !== null) {
                if ($nav_dark_check.prop("checked") != true) {
                    $nav_color.css("font-weight", "normal").html("Dark");
                }
                $nav_dark_color.children('.js-switch').prop('checked', true);
                $nav_dark_color.trigger('click');
            }
        },
        VerticalNavFixed: function(){
            /*----- START NAVIGATION OVERLAY SETTINGS JS -----*/
            var $nav_overlay = $('.nav-fixed-switch');

            $nav_overlay.on('click', function (e) {
                e.preventDefault();
                if ($(".nav-fixed-check").prop("checked") == true) {
                    $('.nav-fixed-text').css("font-weight", "700").html("Sticky");
                    localStorage.setItem("navigation_type", "Fixed");
                    $body.addClass('menu-overlay');
                } else {
                    $('.nav-fixed-text').css("font-weight", "normal").html("Non Sticky");
                    localStorage.removeItem("navigation_type");
                    $body.removeClass('menu-overlay');
                }
            });

            if (localStorage.getItem("navigation_type") !== null) {
                if ($(".nav-fixed-check").prop("checked") != true) {
                    $('.nav-fixed-text').css("font-weight", "normal").html("Non Sticky");
                }
                $nav_overlay.children('.js-switch').prop('checked', true);
                $nav_overlay.trigger('click');
            }

            /*----- END NAVIGATION OVERLAY SETTINGS JS -----*/
        },
        Leftsidemenu: function () {
            $('.main-item .sub-item > a').on('click', function () {
                var $this = $(this).parent('li');
                $this.toggleClass('open');
                $this.children('ul').slideToggle(300);

            });

        },
        NavigetionMenuActive: function () {
            if (!$body.hasClass('nav-menu-icon')) {
                var $pathArray = window.location.pathname.split("/").pop(),
                    $currentpageurl = $("a[href='" + $pathArray + "']");

                $currentpageurl.parent('li').addClass('active');
                if ($currentpageurl.parent('.sub-menu') && $currentpageurl.parent('.main-menu')) {
                    $currentpageurl.parents('li').addClass('active');
                }
            }
        },
        NavigetionToggle: function () {
            var $navClick = $('#navtoggle');
            $navClick.on('click',function(){
                $body.toggleClass('menu-open');
            });
        }
    });
    $.extend(CORE_TEMP.onReady, {
        layoutOnReady: function () {
            CORE_TEMP.function.Leftsidemenu();
            CORE_TEMP.function.SiteColor();
            CORE_TEMP.function.NavigetionLightDark();
            CORE_TEMP.function.VerticalNavFixed();
            CORE_TEMP.function.NavigetionToggle();
        }
    });
    $.extend(CORE_TEMP.onLoad, {
        layoutOnLoad: function () {
            CORE_TEMP.function.NavigetionMenuActive();
        }
    });
    $.extend(CORE_TEMP.onResize, {
        layoutOnResize: function () {
        }
    });
})(jQuery);