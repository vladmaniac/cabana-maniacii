function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* cookie.JS
 ========================================================*/
include('js/jquery.cookie.js');

/* Easing library
 ========================================================*/
include('js/jquery.easing.1.3.js');

/* ToTop
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.ui.totop.js');

        $(document).ready(function () {
            $().UItoTop({easingType: 'easeOutQuart'});
        });
    }
})(jQuery);

/* EqualHeights
 ========================================================*/
;
(function ($) {
    var o = $('[data-equal-group]');
    if (o.length > 0) {
        include('js/jquery.equalheights.js');
    }
})(jQuery);

/* Copyright Year
 ========================================================*/
var currentYear = (new Date).getFullYear();
$(document).ready(function () {
    $("#copyright-year").text((new Date).getFullYear());
});

/* Superfish menus
 ========================================================*/
;
(function ($) {
    include('js/superfish.js');

    var o = $('.sf-menu-toggle');
    if (o.length > 0) {
        $(document).ready(function () {
            var n = $('.nav');
            stuck();

            o.click(function () {
                n.toggleClass('active');
                o.toggleClass('active');
                return false;
            });
            $(document).on("scroll", stuck);

            function stuck(){
                if( ($(document).scrollTop() > (o.position().top + o.height()))){
                    o.addClass('stucked');
                    n.addClass('stucked');
                } else{
                    o.removeClass('stucked');
                    n.removeClass('stucked');
                }
            }
        });
    } else {
        include('js/jquery.mobilemenu.js');
    }
})(jQuery);


/* Google Map
 ========================================================*/
function initMap() {
    const myLatLng = new google.maps.LatLng(46.52658, 23.27433);
    const labelText = 'Strada Principala numarul 225, Statiunea Muntele Baisorii, jud. Cluj';
    const image = {
        url: "../images/gmap_marker.png",
        labelOrigin: { x: 12, y: 90}
    };

    var contentString = '<div id="content">'+
      '<div id="siteNotice">' +
      '</div>' +
      '<div id="bodyContent">' +
      '<p>Ne gasiti usor la strada principala pe partea stanga!</p>' +
      '<img src="images/houseNr.jpg" border="0" height="171" width="128"/>' +
      '</div>' +
      '</div>';

    var mmap = new google.maps.Map(document.getElementById('google-map'), {
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
        zoom: 11,
        center: myLatLng
    });

    const marker = new google.maps.Marker({
        position: myLatLng,
        animation: google.maps.Animation.DROP,
        map: mmap,
        icon: image,
        title: labelText,
        label: {
            text: labelText,
            color: 'white',
            fontSize: '14px'
        }
    });

    var infowindow = new google.maps.InfoWindow({
        maxWidth: 130
    });

    marker.addListener('click', function() {
        toggleBounce(marker);
        mmap.setZoom(14);
        mmap.setCenter(marker.getPosition());
        infowindow.setContent(contentString);
        infowindow.open(mmap, marker);
    });

    mmap.addListener('click', function() {
        mmap.setZoom(11);
        mmap.setCenter(marker.getPosition());
        toggleBounce(marker);
    });

    marker.setMap(mmap);
}

// animate gmaps marker
function toggleBounce(aMarker) {
    if (aMarker.getAnimation() !== null) {
        aMarker.setAnimation(null);
    } else {
        aMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

/* WOW
 ========================================================*/
;
(function ($) {
    var o = $('html');

    if ((navigator.userAgent.toLowerCase().indexOf('msie') == -1 ) || (isIE() && isIE() > 9)) {
        if (o.hasClass('desktop')) {
            include('js/wow/wow.js');

            $(document).ready(function () {
                new WOW().init();
            });
        }
    }
})(jQuery);

/* Unveil
 ========================================================*/
;
(function ($) {
    var o = $('.lazy-img img');

    if (o.length > 0) {
        include('js/jquery.unveil.js');

        $(document).ready(function () {
            $(o).unveil(0, function () {
                if (isIE() && isIE() < 9) {
                    $(this).load().addClass("lazy-loaded");
                } else {
                    $(this).load(function () {
                        $(this).addClass("lazy-loaded");
                    })
                }
            });
        });

        $(window).load(function () {
            $(window).trigger('lookup.unveil');
        });

    }
})(jQuery);

/* Orientation tablet fix
 ========================================================*/
$(function () {
    // IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $('.sf-menus li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">')

/* Contact Form
 ========================================================*/
;
(function ($) {
    var o = $('#contact-form');
    if (o.length > 0) {
        include('js/modal.js');
        include('js/TMForm.js');
    }
})(jQuery);

/* FancyBox
 ========================================================*/
;
(function ($) {
    var o = $('.thumb');
    if (o.length > 0) {
        include('js/jquery.fancybox.js');
        include('js/jquery.fancybox-media.js');
        $(document).ready(function () {
            o.fancybox();
        });
    }
})(jQuery);

/* Parallax
 ========================================================*/
;
(function ($) {
    var o = $('.parallax');
    if (o.length > 0 && $('html').hasClass('desktop')) {
        include('js/jquery.rd-parallax.js');
    }
})(jQuery);


/* ScrollTo
 ========================================================*/
;
(function ($) {
    include('js/scrollTo.js');
})(jQuery);

