!function(e) {
    "use strict";
    e(["jquery"], function(e) {
        function t(t) {
            return e.isFunction(t) || "object" == typeof t ? t : {
                top: t,
                left: t
            }
        }
        var n = e.scrollTo = function(t, n, o) {
            return e(window).scrollTo(t, n, o)
        };
        return n.defaults = {
            axis: "xy",
            duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
            limit: !0
        }, n.window = function(t) {
            return e(window)._scrollable()
        }, e.fn._scrollable = function() {
            return this.map(function() {
                var t = this,
                    n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
                if (!n)
                    return t;
                var o = (t.contentWindow || t).document || t.ownerDocument || t;
                return /webkit/i.test(navigator.userAgent) || "BackCompat" == o.compatMode ? o.body : o.documentElement
            })
        }, e.fn.scrollTo = function(o, r, i) {
            return "object" == typeof r && (i = r, r = 0), "function" == typeof i && (i = {
                onAfter: i
            }), "max" == o && (o = 9e9), i = e.extend({}, n.defaults, i), r = r || i.duration, i.queue = i.queue && i.axis.length > 1, i.queue && (r /= 2), i.offset = t(i.offset), i.over = t(i.over), this._scrollable().each(function() {
                function s(e) {
                    f.animate(l, r, i.easing, e && function() {
                        e.call(this, c, i)
                    })
                }
                if (null != o) {
                    var u,
                        a = this,
                        f = e(a),
                        c = o,
                        l = {},
                        d = f.is("html,body");
                    switch (typeof c) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(c)) {
                            c = t(c);
                            break
                        }
                        if (c = d ? e(c) : e(c, this), !c.length)
                            return;
                    case "object":
                        (c.is || c.style) && (u = (c = e(c)).offset())
                    }
                    var m = e.isFunction(i.offset) && i.offset(a, c) || i.offset;
                    e.each(i.axis.split(""), function(e, t) {
                        var o = "x" == t ? "Left" : "Top",
                            r = o.toLowerCase(),
                            h = "scroll" + o,
                            p = a[h],
                            y = n.max(a, t);
                        if (u)
                            l[h] = u[r] + (d ? 0 : p - f.offset()[r]), i.margin && (l[h] -= parseInt(c.css("margin" + o)) || 0, l[h] -= parseInt(c.css("border" + o + "Width")) || 0), l[h] += m[r] || 0, i.over[r] && (l[h] += c["x" == t ? "width" : "height"]() * i.over[r]);
                        else {
                            var w = c[r];
                            l[h] = w.slice && "%" == w.slice(-1) ? parseFloat(w) / 100 * y : w
                        }
                        i.limit && /^\d+$/.test(l[h]) && (l[h] = l[h] <= 0 ? 0 : Math.min(l[h], y)), !e && i.queue && (p != l[h] && s(i.onAfterFirst), delete l[h])
                    }), s(i.onAfter)
                }
            }).end()
        }, n.max = function(t, n) {
            var o = "x" == n ? "Width" : "Height",
                r = "scroll" + o;
            if (!e(t).is("html,body"))
                return t[r] - e(t)[o.toLowerCase()]();
            var i = "client" + o,
                s = t.ownerDocument.documentElement,
                u = t.ownerDocument.body;
            return Math.max(s[r], u[r]) - Math.min(s[i], u[i])
        }, n
    })
}("function" == typeof define && define.amd ? define : function(e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
});

