if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(t) {
    "use strict";
    function s(s) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.collapse"),
                o = t.extend({}, e.DEFAULTS, i.data(), "object" == typeof s && s);
            !n && o.toggle && "show" == s && (s = !s), n || i.data("bs.collapse", n = new e(this, o)), "string" == typeof s && n[s]()
        })
    }
    var e = function(s, i) {
        this.$element = t(s), this.options = t.extend({}, e.DEFAULTS, i), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.VERSION = "3.2.0", e.DEFAULTS = {
        toggle: !0
    }, e.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.$parent && this.$parent.find("> .panel > .in");
                if (i && i.length) {
                    var n = i.data("bs.collapse");
                    if (n && n.transitioning)
                        return;
                    s.call(i, "hide"), n || i.data("bs.collapse", null)
                }
                var o = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
                var a = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[o](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!t.support.transition)
                    return a.call(this);
                var r = t.camelCase(["scroll", o].join("-"));
                this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(350)[o](this.$element[0][r])
            }
        }
    }, e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var s = t.Event("hide.bs.collapse");
            if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(350) : i.call(this)
            }
        }
    }, e.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var i = t.fn.collapse;
    t.fn.collapse = s, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var i,
            n = t(this),
            o = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
            a = t(o),
            r = a.data("bs.collapse"),
            l = r ? "toggle" : n.data(),
            h = n.attr("data-parent"),
            c = h && t(h);
        r && r.transitioning || (c && c.find('[data-toggle="collapse"][data-parent="' + h + '"]').not(n).addClass("collapsed"), n[a.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), s.call(a, l)
    })
}(jQuery), +function(t) {
    "use strict";
    function s(e, i) {
        var n = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(e).is("body") ? window : e), this.options = t.extend({}, s.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", n), this.refresh(), this.process()
    }
    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.scrollspy"),
                o = "object" == typeof e && e;
            n || i.data("bs.scrollspy", n = new s(this, o)), "string" == typeof e && n[e]()
        })
    }
    s.VERSION = "3.2.0", s.DEFAULTS = {
        offset: 10
    }, s.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, s.prototype.refresh = function() {
        var s = "offset",
            e = 0;
        t.isWindow(this.$scrollElement[0]) || (s = "position", e = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var i = this;
        this.$body.find(this.selector).map(function() {
            var i = t(this),
                n = i.data("target") || i.attr("href"),
                o = /^#./.test(n) && t(n);
            return o && o.length && o.is(":visible") && [[o[s]().top + e, n]] || null
        }).sort(function(t, s) {
            return t[0] - s[0]
        }).each(function() {
            i.offsets.push(this[0]), i.targets.push(this[1])
        })
    }, s.prototype.process = function() {
        var t,
            s = this.$scrollElement.scrollTop() + this.options.offset,
            e = this.getScrollHeight(),
            i = this.options.offset + e - this.$scrollElement.height(),
            n = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != e && this.refresh(), s >= i)
            return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && s <= n[0])
            return a != (t = o[0]) && this.activate(t);
        for (t = n.length; t--;)
            a != o[t] && s >= n[t] && (!n[t + 1] || s <= n[t + 1]) && this.activate(o[t])
    }, s.prototype.activate = function(s) {
        this.activeTarget = s, t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var e = this.selector + '[data-target="' + s + '"],' + this.selector + '[href="' + s + '"]',
            i = t(e).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = e, t.fn.scrollspy.Constructor = s, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var s = t(this);
            e.call(s, s.data())
        })
    })
}(jQuery), +function(t) {
    "use strict";
    function s() {
        var t = document.createElement("bootstrap"),
            s = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var e in s)
            if (void 0 !== t.style[e])
                return {
                    end: s[e]
                };
        return !1
    }
    t.fn.emulateTransitionEnd = function(s) {
        var e = !1,
            i = this;
        t(this).one("bsTransitionEnd", function() {
            e = !0
        });
        var n = function() {
            e || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(n, s), this
    }, t(function() {
        t.support.transition = s(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(s) {
                return t(s.target).is(this) ? s.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery);

