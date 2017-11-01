if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}
jQuery(document).ready(function() {
    "use strict";
    function e() {
        var e;
        $(".stats-percent").each(function() {
            e = $(this).attr("data-perc"), $(this).find(".percentfactor").delay(6e3).countTo({
                from: 0,
                to: e,
                speed: 1e3,
                refreshInterval: 10
            })
        })
    }
    $(".loader").delay(1700).fadeOut(), $(".animationload").delay(1700).fadeOut("slow");
    var t = $(window).height(),
        a = $("#home-section");
    a.css("height", t), $(window).resize(function() {
        var e = $(window).height();
        a.css("height", e)
    });
    var r = $(".flexslider");
    r.flexslider({
        animation: "fade"
    }), $("body").scrollspy({
        target: "#navbar-responsive",
        offset: 120
    }), $(".navbar-nav li a").click(function(e) {
        $(".navbar-collapse").collapse("hide")
    }), $(".scroll-down").bind("click", function(e) {
        e.preventDefault();
        var t = this.hash;
        $.scrollTo(t, 700, {
            easing: "easeInSine",
            axis: "y",
            offset: -75
        })
    }), $(".scroll-contact").bind("click", function(e) {
        e.preventDefault();
        var t = this.hash;
        $.scrollTo(t, 700, {
            easing: "easeInSine",
            axis: "y",
            offset: -75
        })
    }), $('[href^="#"]:not([href^="#!"])').bind("click", function(e) {
        e.preventDefault();
        var t = $(this),
            a = $(t.attr("href")),
            r = $(".navbar-header").height(),
            n = isNaN(parseInt($("body").attr("data-scroll-speed"))) ? 600 : parseInt($("body").attr("data-scroll-speed"));
        0 < a.length && ($.scrollTo.window().queue([]).stop(), $.scrollTo({
            left: 0,
            top: Math.max(0, a.offset().top - r)
        }, {
            duration: n
        }))
    });
    var n = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return n.Android() || n.BlackBerry() || n.iOS() || n.Opera() || n.Windows()
        }
    };
    n.any() || $("#home-section, #frase-section, #estadisticas-section, #testimonial-section").appear(function() {
        $.stellar({
            horizontalScrolling: !1,
            verticalOffset: 0
        })
    }), $(".stats-percent").waypoint(function() {
        e()
    }, {
        offset: "90%",
        triggerOnce: !0
    }), $(".bar-outer").each(function() {
        var e = $(this);
        e.appear(function() {
            var e = $(this),
                t = e.find(".bar").data("progress");
            e.find(".bar").animate({
                width: t + "%"
            }, 800)
        })
    }), $(".home-projects").mixItUp();
    var i = $(".bxslider");
    i.bxSlider({
        adaptiveHeight: !0,
        auto: !0,
        controls: !1,
        mode: "horizontal"
    }), "undefined" == typeof document.createElement("input").placeholder && $("[placeholder]").focus(function() {
        var e = $(this);
        e.val() === e.attr("placeholder") && (e.val(""), e.removeClass("placeholder"))
    }).blur(function() {
        var e = $(this);
        ("" === e.val() || e.val() === e.attr("placeholder")) && (e.addClass("placeholder"), e.val(e.attr("placeholder")))
    }).blur().parents("form").submit(function() {
        $(this).find("[placeholder]").each(function() {
            var e = $(this);
            e.val() === e.attr("placeholder") && e.val("")
        })
    }), $(".blog-slider").bxSlider({
        adaptiveHeight: !0,
        pager: !1,
        controls: !0,
        auto: !0,
        speed: 500,
        pause: 5e3,
        video: !0,
        useCSS: !1
    })
});

