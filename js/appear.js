!function(a) {
    a.fn.disappear = function(e, r) {
        var t = a.extend({
            data: void 0
        }, r);
        this.each(function() {
            var r = a(this);
            return r.bind("disappear", e, t.data), e ? void 0 : void r.trigger("disappear", t.data)
        })
    }, a.fn.appear = function(e, r) {
        var t = a.extend({
            data: void 0,
            one: !0
        }, r);
        return this.each(function() {
            var r = a(this);
            if (r.appeared = !1, !e)
                return void r.trigger("appear", t.data);
            var p = a(window),
                n = function() {
                    if (!r.is(":visible"))
                        return void (r.appeared = !1);
                    var a = p.scrollLeft(),
                        e = p.scrollTop(),
                        n = r.offset(),
                        i = n.left,
                        o = n.top;
                    o + r.height() >= e && o <= e + p.height() && i + r.width() >= a && i <= a + p.width() ? r.appeared || r.trigger("appear", t.data) : (r.appeared && r.trigger("disappear", t.data), r.appeared = !1)
                },
                i = function() {
                    if (r.appeared = !0, t.one) {
                        p.unbind("scroll", n);
                        var i = a.inArray(n, a.fn.appear.checks);
                        i >= 0 && a.fn.appear.checks.splice(i, 1)
                    }
                    e.apply(this, arguments)
                };
            t.one ? r.one("appear", t.data, i) : r.bind("appear", t.data, i), p.scroll(n), a.fn.appear.checks.push(n), n()
        })
    }, a.extend(a.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = a.fn.appear.checks.length;
            if (e > 0)
                for (; e--;)
                    a.fn.appear.checks[e]()
        },
        run: function() {
            a.fn.appear.timeout && clearTimeout(a.fn.appear.timeout), a.fn.appear.timeout = setTimeout(a.fn.appear.checkAll, 20)
        }
    }), a.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, r) {
        var t = a.fn[r];
        t && (a.fn[r] = function() {
            var e = t.apply(this, arguments);
            return a.fn.appear.run(), e
        })
    })
}(jQuery);

