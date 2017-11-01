!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), window.requestAnimationFrame || function() {
        "use strict";
        for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
            var n = e[t];
            window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var i = 0;
            window.requestAnimationFrame = function(e) {
                var t = Date.now(),
                    n = Math.max(i + 16, t);
                return setTimeout(function() {
                    e(i = n)
                }, n - t)
            }, window.cancelAnimationFrame = clearTimeout
        }
    }();
    var t = function() {
            for (var e = "transform WebkitTransform MozTransform OTransform msTransform".split(" "), t = document.createElement("div"), n = 0; n < e.length; n++)
                if (t && void 0 !== t.style[e[n]])
                    return e[n];
            return !1
        }(),
        n = function() {
            if (!window.getComputedStyle)
                return !1;
            var e,
                t = document.createElement("p"),
                n = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            (document.body || document.documentElement).insertBefore(t, null);
            for (var i in n)
                void 0 !== t.style[i] && (t.style[i] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(t).getPropertyValue(n[i]));
            return (document.body || document.documentElement).removeChild(t), void 0 !== e && e.length > 0 && "none" !== e
        }(),
        i = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        a = [],
        o = function() {
            function t(t, o) {
                var r,
                    m = this;
                m.$item = e(t), m.defaults = {
                    speed: .5,
                    imgSrc: null,
                    imgWidth: null,
                    imgHeight: null,
                    enableTransform: !0,
                    zIndex: -100
                }, r = m.$item.data("jarallax") || {}, m.options = e.extend({}, m.defaults, r, o), m.options.speed = Math.min(1, Math.max(0, parseFloat(m.options.speed))), m.instanceID = n++, m.image = {
                    src: m.options.imgSrc || null,
                    $container: null,
                    $item: null,
                    width: m.options.imgWidth || null,
                    height: m.options.imgHeight || null,
                    useImgTag: i
                }, m.initImg() && (m.init(), a.push(m))
            }
            var n = 0;
            return t
        }();
    o.prototype.initImg = function() {
        var e = this;
        return null === e.image.src && (e.image.src = e.$item.css("background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), e.image.src && "none" !== e.image.src ? !0 : !1
    }, o.prototype.init = function() {
        var t = this,
            n = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                "pointer-events": "none",
                transition: "transform linear -1ms, -webkit-transform linear -1ms"
            },
            i = {
                position: "fixed"
            };
        t.image.$container = e("<div>").css(n).css({
            visibility: "hidden",
            "z-index": t.options.zIndex
        }).attr("id", "jarallax-container-" + t.instanceID).prependTo(t.$item), t.image.useImgTag ? (t.image.$item = e("<img>").attr("src", t.image.src), i = e.extend({}, n, i)) : (t.image.$item = e("<div>"), i = e.extend({
            "background-position": "50% 50%",
            "background-repeat": "no-repeat no-repeat",
            "background-image": "url(" + t.image.src + ")"
        }, n, i)), t.image.$item.css(i).prependTo(t.image.$container), t.getImageSize(t.image.src, function(e, n) {
            t.image.width = e, t.image.height = n, window.requestAnimationFrame(function() {
                t.coverImage(), t.clipContainer(), t.onScroll()
            }), t.$item.data("jarallax-original-styles", t.$item.attr("style")), setTimeout(function() {
                t.$item.css({
                    "background-image": "none",
                    "background-attachment": "scroll",
                    "background-size": "auto"
                })
            }, 0)
        })
    }, o.prototype.destroy = function() {
        for (var t = this, n = 0, i = a.length; i > n; n++)
            if (a[n].instanceID === t.instanceID) {
                a.splice(n, 1);
                break
            }
        e("head #jarallax-clip-" + t.instanceID).remove(), t.$item.attr("style", t.$item.data("jarallax-original-styles")), t.$item.removeData("jarallax-original-styles"), t.image.$container.remove(), delete t.$item[0].jarallax
    }, o.prototype.round = function(e) {
        return Math.floor(100 * e) / 100
    }, o.prototype.getImageSize = function(e, t) {
        if (!e || !t)
            return !1;
        var n = new Image;
        n.onload = function() {
            t(n.width, n.height)
        }, n.src = e
    }, o.prototype.clipContainer = function() {
        var t = this,
            n = t.image.$container.outerWidth(!0),
            i = t.image.$container.outerHeight(!0),
            a = e("head #jarallax-clip-" + t.instanceID);
        a.length || (e("head").append('<style type="text/css" id="jarallax-clip-' + t.instanceID + '"></style>'), a = e("head #jarallax-clip-" + t.instanceID));
        var o = ["#jarallax-container-" + t.instanceID + " {", "   clip: rect(0px " + n + "px " + i + "px 0);", "   clip: rect(0px, " + n + "px, " + i + "px, 0);", "}"].join("\n");
        a[0].styleSheet ? a[0].styleSheet.cssText = o : a.html(o)
    }, o.prototype.coverImage = function() {
        var t = this;
        if (t.image.width && t.image.height) {
            var n,
                i,
                a = t.image.$container.outerWidth(!0),
                o = t.image.$container.outerHeight(!0),
                r = e(window).outerWidth(!0),
                m = e(window).outerHeight(!0),
                l = t.image.width,
                s = t.image.height,
                c = {
                    width: Math.max(r, a) * Math.max(t.options.speed, 1),
                    height: Math.max(m, o) * Math.max(t.options.speed, 1)
                };
            c.width / c.height > l / s ? (n = c.width, i = c.width * s / l) : (n = c.height * l / s, i = c.height), t.image.useImgTag ? (c.width = t.round(n), c.height = t.round(i), c.marginLeft = t.round(-(n - a) / 2), c.marginTop = t.round(-(i - o) / 2)) : c.backgroundSize = t.round(n) + "px " + t.round(i) + "px", t.image.$item.css(c)
        }
    }, o.prototype.onScroll = function() {
        var i = this;
        if (i.image.width && i.image.height) {
            var a = e(window).scrollTop(),
                o = e(window).height(),
                r = i.$item.offset().top,
                m = i.$item.outerHeight(!0),
                l = {
                    visibility: "visible",
                    backgroundPosition: "50% 50%"
                };
            if (!(a > r + m || r > a + o)) {
                var s = -(a - r) * i.options.speed;
                s = i.round(s), t && i.options.enableTransform ? (l.transform = "translateY(" + s + "px)", n && (l.transform = "translate3d(0, " + s + "px, 0)")) : l.backgroundPosition = "50% " + s + "px", i.image.$item.css(l)
            }
        }
    }, function() {
        e(window).on("scroll.jarallax", function() {
            window.requestAnimationFrame(function() {
                for (var e = 0, t = a.length; t > e; e++)
                    a[e].onScroll()
            })
        });
        var t;
        e(window).on("resize.jarallax load.jarallax", function() {
            clearTimeout(t), t = setTimeout(function() {
                window.requestAnimationFrame(function() {
                    for (var e = 0, t = a.length; t > e; e++) {
                        var n = a[e];
                        n.coverImage(), n.clipContainer(), n.onScroll()
                    }
                })
            }, 100)
        })
    }();
    var r = e.fn.jarallax;
    e.fn.jarallax = function() {
        var e,
            t = this,
            n = arguments[0],
            i = Array.prototype.slice.call(arguments, 1),
            a = t.length,
            r = 0;
        for (r; a > r; r++)
            if ("object" == typeof n || "undefined" == typeof n ? t[r].jarallax = new o(t[r], n) : e = t[r].jarallax[n].apply(t[r].jarallax, i), "undefined" != typeof e)
                return e;
        return this
    }, e.fn.jarallax.noConflict = function() {
        return e.fn.jarallax = r, this
    }, e(document).on("ready.data-jarallax", function() {
        e("[data-jarallax]").jarallax()
    })
});

