!function(t, e) {
    t.MixItUp = function() {
        var e = this;
        e._execAction("_constructor", 0), t.extend(e, {
            selectors: {
                target: ".mix",
                filter: ".filter",
                sort: ".sort"
            },
            animation: {
                enable: !0,
                effects: "fade scale",
                duration: 600,
                easing: "ease",
                perspectiveDistance: "3000",
                perspectiveOrigin: "50% 50%",
                queue: !0,
                queueLimit: 1,
                animateChangeLayout: !0,
                animateResizeContainer: !0,
                animateResizeTargets: !1,
                staggerSequence: !1,
                reverseOut: !1
            },
            callbacks: {
                onMixLoad: !1,
                onMixStart: !1,
                onMixBusy: !1,
                onMixEnd: !1,
                onMixFail: !1,
                _user: !1
            },
            controls: {
                enable: !0,
                live: !1,
                toggleFilterButtons: !1,
                toggleLogic: "or",
                activeClass: "active"
            },
            layout: {
                display: "inline-block",
                containerClass: "",
                containerClassFail: "fail"
            },
            load: {
                filter: ".logos",
                sort: !1
            },
            _$body: null,
            _$container: null,
            _$targets: null,
            _$parent: null,
            _$sortButtons: null,
            _$filterButtons: null,
            _suckMode: !1,
            _mixing: !1,
            _sorting: !1,
            _clicking: !1,
            _loading: !0,
            _changingLayout: !1,
            _changingClass: !1,
            _changingDisplay: !1,
            _origOrder: [],
            _startOrder: [],
            _newOrder: [],
            _activeFilter: null,
            _toggleArray: [],
            _toggleString: "",
            _activeSort: "default:asc",
            _newSort: null,
            _startHeight: null,
            _newHeight: null,
            _incPadding: !0,
            _newDisplay: null,
            _newClass: null,
            _targetsBound: 0,
            _targetsDone: 0,
            _queue: [],
            _$show: t(),
            _$hide: t()
        }), e._execAction("_constructor", 1)
    }, t.MixItUp.prototype = {
        constructor: t.MixItUp,
        _instances: {},
        _handled: {
            _filter: {},
            _sort: {}
        },
        _bound: {
            _filter: {},
            _sort: {}
        },
        _actions: {},
        _filters: {},
        extend: function(e) {
            for (var a in e)
                t.MixItUp.prototype[a] = e[a]
        },
        addAction: function(e, a, i, n) {
            t.MixItUp.prototype._addHook("_actions", e, a, i, n)
        },
        addFilter: function(e, a, i, n) {
            t.MixItUp.prototype._addHook("_filters", e, a, i, n)
        },
        _addHook: function(e, a, i, n, r) {
            var o = t.MixItUp.prototype[e],
                s = {};
            r = 1 === r || "post" === r ? "post" : "pre", s[a] = {}, s[a][r] = {}, s[a][r][i] = n, t.extend(!0, o, s)
        },
        _init: function(e, a) {
            var i = this;
            if (i._execAction("_init", 0, arguments), a && t.extend(!0, i, a), i._$body = t("body"), i._domNode = e, i._$container = t(e), i._$container.addClass(i.layout.containerClass), i._id = e.id, i._platformDetect(), i._brake = i._getPrefixedCSS("transition", "none"), i._refresh(!0), i._$parent = i._$targets.parent().length ? i._$targets.parent() : i._$container, i.load.sort && (i._newSort = i._parseSort(i.load.sort), i._newSortString = i.load.sort, i._activeSort = i.load.sort, i._sort(), i._printSort()), i._activeFilter = "all" === i.load.filter ? i.selectors.target : "none" === i.load.filter ? "" : i.load.filter, i.controls.enable && i._bindHandlers(), i.controls.toggleFilterButtons) {
                i._buildToggleArray();
                for (var n = 0; n < i._toggleArray.length; n++)
                    i._updateControls({
                        filter: i._toggleArray[n],
                        sort: i._activeSort
                    }, !0)
            } else
                i.controls.enable && i._updateControls({
                    filter: i._activeFilter,
                    sort: i._activeSort
                });
            i._filter(), i._init = !0, i._$container.data("mixItUp", i), i._execAction("_init", 1, arguments), i._buildState(), i._$targets.css(i._brake), i._goMix(i.animation.enable)
        },
        _platformDetect: function() {
            var t = this,
                a = ["Webkit", "Moz", "O", "ms"],
                i = ["webkit", "moz"],
                n = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1,
                r = "undefined" != typeof InstallTrigger,
                o = function(t) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e] + "Transition" in t.style)
                            return {
                                prefix: "-" + a[e].toLowerCase() + "-",
                                vendor: a[e]
                            };
                    return "transition" in t.style ? "" : !1
                },
                s = o(t._domNode);
            t._execAction("_platformDetect", 0), t._chrome = n ? parseInt(n[1], 10) : !1, t._ff = r ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : !1, t._prefix = s.prefix, t._vendor = s.vendor, t._suckMode = window.atob && t._prefix ? !1 : !0, t._suckMode && (t.animation.enable = !1), t._ff && t._ff <= 4 && (t.animation.enable = !1);
            for (var l = 0; l < i.length && !window.requestAnimationFrame; l++)
                window.requestAnimationFrame = window[i[l] + "RequestAnimationFrame"];
            "function" != typeof Object.getPrototypeOf && ("object" == typeof "test".__proto__ ? Object.getPrototypeOf = function(t) {
                return t.__proto__
            } : Object.getPrototypeOf = function(t) {
                return t.constructor.prototype
            }), t._domNode.nextElementSibling === e && Object.defineProperty(Element.prototype, "nextElementSibling", {
                get: function() {
                    for (var t = this.nextSibling; t;) {
                        if (1 === t.nodeType)
                            return t;
                        t = t.nextSibling
                    }
                    return null
                }
            }), t._execAction("_platformDetect", 1)
        },
        _refresh: function(t, a) {
            var i = this;
            i._execAction("_refresh", 0, arguments), i._$targets = i._$container.find(i.selectors.target);
            for (var n = 0; n < i._$targets.length; n++) {
                var r = i._$targets[n];
                if (r.dataset === e || a) {
                    r.dataset = {};
                    for (var o = 0; o < r.attributes.length; o++) {
                        var s = r.attributes[o],
                            l = s.name,
                            c = s.value;
                        if (l.indexOf("data-") > -1) {
                            var _ = i._helpers._camelCase(l.substring(5, l.length));
                            r.dataset[_] = c
                        }
                    }
                }
                r.mixParent === e && (r.mixParent = i._id)
            }
            if (i._$targets.length && t || !i._origOrder.length && i._$targets.length) {
                i._origOrder = [];
                for (var n = 0; n < i._$targets.length; n++) {
                    var r = i._$targets[n];
                    i._origOrder.push(r)
                }
            }
            i._execAction("_refresh", 1, arguments)
        },
        _bindHandlers: function() {
            var a = this,
                i = t.MixItUp.prototype._bound._filter,
                n = t.MixItUp.prototype._bound._sort;
            a._execAction("_bindHandlers", 0), a.controls.live ? a._$body.on("click.mixItUp." + a._id, a.selectors.sort, function() {
                a._processClick(t(this), "sort")
            }).on("click.mixItUp." + a._id, a.selectors.filter, function() {
                a._processClick(t(this), "filter")
            }) : (a._$sortButtons = t(a.selectors.sort), a._$filterButtons = t(a.selectors.filter), a._$sortButtons.on("click.mixItUp." + a._id, function() {
                a._processClick(t(this), "sort")
            }), a._$filterButtons.on("click.mixItUp." + a._id, function() {
                a._processClick(t(this), "filter")
            })), i[a.selectors.filter] = i[a.selectors.filter] === e ? 1 : i[a.selectors.filter] + 1, n[a.selectors.sort] = n[a.selectors.sort] === e ? 1 : n[a.selectors.sort] + 1, a._execAction("_bindHandlers", 1)
        },
        _processClick: function(a, i) {
            var n = this,
                r = function(a, i, r) {
                    var o = t.MixItUp.prototype;
                    o._handled["_" + i][n.selectors[i]] = o._handled["_" + i][n.selectors[i]] === e ? 1 : o._handled["_" + i][n.selectors[i]] + 1, o._handled["_" + i][n.selectors[i]] === o._bound["_" + i][n.selectors[i]] && (a[(r ? "remove" : "add") + "Class"](n.controls.activeClass), delete o._handled["_" + i][n.selectors[i]])
                };
            if (n._execAction("_processClick", 0, arguments), !n._mixing || n.animation.queue && n._queue.length < n.animation.queueLimit) {
                if (n._clicking = !0, "sort" === i) {
                    var o = a.attr("data-sort");
                    (!a.hasClass(n.controls.activeClass) || o.indexOf("random") > -1) && (t(n.selectors.sort).removeClass(n.controls.activeClass), r(a, i), n.sort(o))
                }
                if ("filter" === i) {
                    var s,
                        l = a.attr("data-filter"),
                        c = "or" === n.controls.toggleLogic ? "," : "";
                    n.controls.toggleFilterButtons ? (n._buildToggleArray(), a.hasClass(n.controls.activeClass) ? (r(a, i, !0), s = n._toggleArray.indexOf(l), n._toggleArray.splice(s, 1)) : (r(a, i), n._toggleArray.push(l)), n._toggleArray = t.grep(n._toggleArray, function(t) {
                        return t
                    }), n._toggleString = n._toggleArray.join(c), n.filter(n._toggleString)) : a.hasClass(n.controls.activeClass) || (t(n.selectors.filter).removeClass(n.controls.activeClass), r(a, i), n.filter(l))
                }
                n._execAction("_processClick", 1, arguments)
            } else
                "function" == typeof n.callbacks.onMixBusy && n.callbacks.onMixBusy.call(n._domNode, n._state, n), n._execAction("_processClickBusy", 1, arguments)
        },
        _buildToggleArray: function() {
            var t = this,
                e = t._activeFilter.replace(/\s/g, "");
            if (t._execAction("_buildToggleArray", 0, arguments), "or" === t.controls.toggleLogic)
                t._toggleArray = e.split(",");
            else {
                t._toggleArray = e.split("."), !t._toggleArray[0] && t._toggleArray.shift();
                for (var a, i = 0; a = t._toggleArray[i]; i++)
                    t._toggleArray[i] = "." + a
            }
            t._execAction("_buildToggleArray", 1, arguments)
        },
        _updateControls: function(a, i) {
            var n = this,
                r = {
                    filter: a.filter,
                    sort: a.sort
                },
                o = function(t, e) {
                    i && "filter" == s && "none" !== r.filter && "" !== r.filter ? t.filter(e).addClass(n.controls.activeClass) : t.removeClass(n.controls.activeClass).filter(e).addClass(n.controls.activeClass)
                },
                s = "filter",
                l = null;
            n._execAction("_updateControls", 0, arguments), a.filter === e && (r.filter = n._activeFilter), a.sort === e && (r.sort = n._activeSort), r.filter === n.selectors.target && (r.filter = "all");
            for (var c = 0; 2 > c; c++)
                l = n.controls.live ? t(n.selectors[s]) : n["_$" + s + "Buttons"], l && o(l, "[data-" + s + '="' + r[s] + '"]'), s = "sort";
            n._execAction("_updateControls", 1, arguments)
        },
        _filter: function() {
            var e = this;
            e._execAction("_filter", 0);
            for (var a = 0; a < e._$targets.length; a++) {
                var i = t(e._$targets[a]);
                i.is(e._activeFilter) ? e._$show = e._$show.add(i) : e._$hide = e._$hide.add(i)
            }
            e._execAction("_filter", 1)
        },
        _sort: function() {
            var t = this,
                e = function(t) {
                    for (var e = t.slice(), a = e.length, i = a; i--;) {
                        var n = parseInt(Math.random() * a),
                            r = e[i];
                        e[i] = e[n], e[n] = r
                    }
                    return e
                };
            t._execAction("_sort", 0), t._startOrder = [];
            for (var a = 0; a < t._$targets.length; a++) {
                var i = t._$targets[a];
                t._startOrder.push(i)
            }
            switch (t._newSort[0].sortBy) {
            case "default":
                t._newOrder = t._origOrder;
                break;
            case "random":
                t._newOrder = e(t._startOrder);
                break;
            case "custom":
                t._newOrder = t._newSort[0].order;
                break;
            default:
                t._newOrder = t._startOrder.concat().sort(function(e, a) {
                    return t._compare(e, a)
                })
            }
            t._execAction("_sort", 1)
        },
        _compare: function(t, e, a) {
            a = a ? a : 0;
            var i = this,
                n = i._newSort[a].order,
                r = function(t) {
                    return t.dataset[i._newSort[a].sortBy] || 0
                },
                o = isNaN(1 * r(t)) ? r(t).toLowerCase() : 1 * r(t),
                s = isNaN(1 * r(e)) ? r(e).toLowerCase() : 1 * r(e);
            return s > o ? "asc" == n ? -1 : 1 : o > s ? "asc" == n ? 1 : -1 : o == s && i._newSort.length > a + 1 ? i._compare(t, e, a + 1) : 0
        },
        _printSort: function(t) {
            var e = this,
                a = t ? e._startOrder : e._newOrder,
                i = e._$parent[0].querySelectorAll(e.selectors.target),
                n = i[i.length - 1].nextElementSibling,
                r = document.createDocumentFragment();
            e._execAction("_printSort", 0, arguments);
            for (var o = 0; o < i.length; o++) {
                var s = i[o],
                    l = s.nextSibling;
                "absolute" !== s.style.position && (l && "#text" == l.nodeName && e._$parent[0].removeChild(l), e._$parent[0].removeChild(s))
            }
            for (var o = 0; o < a.length; o++) {
                var c = a[o];
                if ("default" != e._newSort[0].sortBy || "desc" != e._newSort[0].order || t)
                    r.appendChild(c), r.appendChild(document.createTextNode(" "));
                else {
                    var _ = r.firstChild;
                    r.insertBefore(c, _), r.insertBefore(document.createTextNode(" "), c)
                }
            }
            n ? e._$parent[0].insertBefore(r, n) : e._$parent[0].appendChild(r), e._execAction("_printSort", 1, arguments)
        },
        _parseSort: function(t) {
            for (var e = this, a = "string" == typeof t ? t.split(" ") : [t], i = [], n = 0; n < a.length; n++) {
                var r = "string" == typeof t ? a[n].split(":") : ["custom", a[n]],
                    o = {
                        sortBy: e._helpers._camelCase(r[0]),
                        order: r[1] || "asc"
                    };
                if (i.push(o), "default" == o.sortBy || "random" == o.sortBy)
                    break
            }
            return e._execFilter("_parseSort", i, arguments)
        },
        _parseEffects: function() {
            var t = this,
                e = {
                    opacity: "",
                    transformIn: "",
                    transformOut: "",
                    filter: ""
                },
                a = function(e, a, i) {
                    if (t.animation.effects.indexOf(e) > -1) {
                        if (a) {
                            var n = t.animation.effects.indexOf(e + "(");
                            if (n > -1) {
                                var r = t.animation.effects.substring(n),
                                    o = /\(([^)]+)\)/.exec(r),
                                    s = o[1];
                                return {
                                    val: s
                                }
                            }
                        }
                        return !0
                    }
                    return !1
                },
                i = function(t, e) {
                    return e ? "-" === t.charAt(0) ? t.substr(1, t.length) : "-" + t : t
                },
                n = function(t, n) {
                    for (var r = [["scale", ".01"], ["translateX", "20px"], ["translateY", "20px"], ["translateZ", "20px"], ["rotateX", "90deg"], ["rotateY", "90deg"], ["rotateZ", "180deg"]], o = 0; o < r.length; o++) {
                        var s = r[o][0],
                            l = r[o][1],
                            c = n && "scale" !== s;
                        e[t] += a(s) ? s + "(" + i(a(s, !0).val || l, c) + ") " : ""
                    }
                };
            return e.opacity = a("fade") ? a("fade", !0).val || "0" : "1", n("transformIn"), t.animation.reverseOut ? n("transformOut", !0) : e.transformOut = e.transformIn, e.transition = {}, e.transition = t._getPrefixedCSS("transition", "all " + t.animation.duration + "ms " + t.animation.easing + ", opacity " + t.animation.duration + "ms linear"), t.animation.stagger = a("stagger") ? !0 : !1, t.animation.staggerDuration = parseInt(a("stagger") && a("stagger", !0).val ? a("stagger", !0).val : 100), t._execFilter("_parseEffects", e)
        },
        _buildState: function(t) {
            var e = this,
                a = {};
            return e._execAction("_buildState", 0), a = {
                activeFilter: "" === e._activeFilter ? "none" : e._activeFilter,
                activeSort: t && e._newSortString ? e._newSortString : e._activeSort,
                fail: !e._$show.length && "" !== e._activeFilter,
                $targets: e._$targets,
                $show: e._$show,
                $hide: e._$hide,
                totalTargets: e._$targets.length,
                totalShow: e._$show.length,
                totalHide: e._$hide.length,
                display: t && e._newDisplay ? e._newDisplay : e.layout.display
            }, t ? e._execFilter("_buildState", a) : (e._state = a, void e._execAction("_buildState", 1))
        },
        _goMix: function(t) {
            var e = this,
                a = function() {
                    e._chrome && 31 === e._chrome && r(e._$parent[0]), e._setInter(), i()
                },
                i = function() {
                    var t = window.pageYOffset,
                        a = window.pageXOffset;
                    document.documentElement.scrollHeight;
                    e._getInterMixData(), e._setFinal(), e._getFinalMixData(), window.pageYOffset !== t && window.scrollTo(a, t), e._prepTargets(), window.requestAnimationFrame ? requestAnimationFrame(n) : setTimeout(function() {
                        n()
                    }, 20)
                },
                n = function() {
                    e._animateTargets(), 0 === e._targetsBound && e._cleanUp()
                },
                r = function(t) {
                    var e = t.parentElement,
                        a = document.createElement("div"),
                        i = document.createDocumentFragment();
                    e.insertBefore(a, t), i.appendChild(t), e.replaceChild(t, a)
                },
                o = e._buildState(!0);
            e._execAction("_goMix", 0, arguments), !e.animation.duration && (t = !1), e._mixing = !0, e._$container.removeClass(e.layout.containerClassFail), "function" == typeof e.callbacks.onMixStart && e.callbacks.onMixStart.call(e._domNode, e._state, o, e), e._$container.trigger("mixStart", [e._state, o, e]), e._getOrigMixData(), t && !e._suckMode ? window.requestAnimationFrame ? requestAnimationFrame(a) : a() : e._cleanUp(), e._execAction("_goMix", 1, arguments)
        },
        _getTargetData: function(t, e) {
            var a,
                i = this;
            t.dataset[e + "PosX"] = t.offsetLeft, t.dataset[e + "PosY"] = t.offsetTop, i.animation.animateResizeTargets && (a = window.getComputedStyle(t), t.dataset[e + "MarginBottom"] = parseInt(a.marginBottom), t.dataset[e + "MarginRight"] = parseInt(a.marginRight), t.dataset[e + "Width"] = t.offsetWidth, t.dataset[e + "Height"] = t.offsetHeight)
        },
        _getOrigMixData: function() {
            var t = this,
                e = t._suckMode ? {
                    boxSizing: ""
                } : window.getComputedStyle(t._$parent[0]),
                a = e.boxSizing || e[t._vendor + "BoxSizing"];
            t._incPadding = "border-box" === a, t._execAction("_getOrigMixData", 0), !t._suckMode && (t.effects = t._parseEffects()), t._$toHide = t._$hide.filter(":visible"), t._$toShow = t._$show.filter(":hidden"), t._$pre = t._$targets.filter(":visible"), t._startHeight = t._incPadding ? t._$parent.outerHeight() : t._$parent.height();
            for (var i = 0; i < t._$pre.length; i++) {
                var n = t._$pre[i];
                t._getTargetData(n, "orig")
            }
            t._execAction("_getOrigMixData", 1)
        },
        _setInter: function() {
            var t = this;
            t._execAction("_setInter", 0), t._changingLayout && t.animation.animateChangeLayout ? (t._$toShow.css("display", t._newDisplay), t._changingClass && t._$container.removeClass(t.layout.containerClass).addClass(t._newClass)) : t._$toShow.css("display", t.layout.display), t._execAction("_setInter", 1)
        },
        _getInterMixData: function() {
            var t = this;
            t._execAction("_getInterMixData", 0);
            for (var e = 0; e < t._$toShow.length; e++) {
                var a = t._$toShow[e];
                t._getTargetData(a, "inter")
            }
            for (var e = 0; e < t._$pre.length; e++) {
                var a = t._$pre[e];
                t._getTargetData(a, "inter")
            }
            t._execAction("_getInterMixData", 1)
        },
        _setFinal: function() {
            var t = this;
            t._execAction("_setFinal", 0), t._sorting && t._printSort(), t._$toHide.removeStyle("display"), t._changingLayout && t.animation.animateChangeLayout && t._$pre.css("display", t._newDisplay), t._execAction("_setFinal", 1)
        },
        _getFinalMixData: function() {
            var t = this;
            t._execAction("_getFinalMixData", 0);
            for (var e = 0; e < t._$toShow.length; e++) {
                var a = t._$toShow[e];
                t._getTargetData(a, "final")
            }
            for (var e = 0; e < t._$pre.length; e++) {
                var a = t._$pre[e];
                t._getTargetData(a, "final")
            }
            t._newHeight = t._incPadding ? t._$parent.outerHeight() : t._$parent.height(), t._sorting && t._printSort(!0), t._$toShow.removeStyle("display"), t._$pre.css("display", t.layout.display), t._changingClass && t.animation.animateChangeLayout && t._$container.removeClass(t._newClass).addClass(t.layout.containerClass), t._execAction("_getFinalMixData", 1)
        },
        _prepTargets: function() {
            var e = this,
                a = {
                    _in: e._getPrefixedCSS("transform", e.effects.transformIn),
                    _out: e._getPrefixedCSS("transform", e.effects.transformOut)
                };
            e._execAction("_prepTargets", 0), e.animation.animateResizeContainer && e._$parent.css("height", e._startHeight + "px");
            for (var i = 0; i < e._$toShow.length; i++) {
                var n = e._$toShow[i],
                    r = t(n);
                n.style.opacity = e.effects.opacity, n.style.display = e._changingLayout && e.animation.animateChangeLayout ? e._newDisplay : e.layout.display, r.css(a._in), e.animation.animateResizeTargets && (n.style.width = n.dataset.finalWidth + "px", n.style.height = n.dataset.finalHeight + "px", n.style.marginRight = -(n.dataset.finalWidth - n.dataset.interWidth) + 1 * n.dataset.finalMarginRight + "px", n.style.marginBottom = -(n.dataset.finalHeight - n.dataset.interHeight) + 1 * n.dataset.finalMarginBottom + "px")
            }
            for (var i = 0; i < e._$pre.length; i++) {
                var n = e._$pre[i],
                    r = t(n),
                    o = {
                        x: n.dataset.origPosX - n.dataset.interPosX,
                        y: n.dataset.origPosY - n.dataset.interPosY
                    },
                    a = e._getPrefixedCSS("transform", "translate(" + o.x + "px," + o.y + "px)");
                r.css(a), e.animation.animateResizeTargets && (n.style.width = n.dataset.origWidth + "px", n.style.height = n.dataset.origHeight + "px", n.dataset.origWidth - n.dataset.finalWidth && (n.style.marginRight = -(n.dataset.origWidth - n.dataset.interWidth) + 1 * n.dataset.origMarginRight + "px"), n.dataset.origHeight - n.dataset.finalHeight && (n.style.marginBottom = -(n.dataset.origHeight - n.dataset.interHeight) + 1 * n.dataset.origMarginBottom + "px"))
            }
            e._execAction("_prepTargets", 1)
        },
        _animateTargets: function() {
            var e = this;
            e._execAction("_animateTargets", 0), e._targetsDone = 0, e._targetsBound = 0, e._$parent.css(e._getPrefixedCSS("perspective", e.animation.perspectiveDistance + "px")).css(e._getPrefixedCSS("perspective-origin", e.animation.perspectiveOrigin)), e.animation.animateResizeContainer && e._$parent.css(e._getPrefixedCSS("transition", "height " + e.animation.duration + "ms ease")).css("height", e._newHeight + "px");
            for (var a = 0; a < e._$toShow.length; a++) {
                var i = e._$toShow[a],
                    n = t(i),
                    r = {
                        x: i.dataset.finalPosX - i.dataset.interPosX,
                        y: i.dataset.finalPosY - i.dataset.interPosY
                    },
                    o = e._getDelay(a),
                    s = {};
                i.style.opacity = "";
                for (var l = 0; 2 > l; l++) {
                    var c = 0 === l ? c = e._prefix : "";
                    e._ff && e._ff <= 20 && (s[c + "transition-property"] = "all", s[c + "transition-timing-function"] = e.animation.easing + "ms", s[c + "transition-duration"] = e.animation.duration + "ms"), s[c + "transition-delay"] = o + "ms", s[c + "transform"] = "translate(" + r.x + "px," + r.y + "px)"
                }
                (e.effects.transform || e.effects.opacity) && e._bindTargetDone(n), e._ff && e._ff <= 20 ? n.css(s) : n.css(e.effects.transition).css(s)
            }
            for (var a = 0; a < e._$pre.length; a++) {
                var i = e._$pre[a],
                    n = t(i),
                    r = {
                        x: i.dataset.finalPosX - i.dataset.interPosX,
                        y: i.dataset.finalPosY - i.dataset.interPosY
                    },
                    o = e._getDelay(a);
                (i.dataset.finalPosX !== i.dataset.origPosX || i.dataset.finalPosY !== i.dataset.origPosY) && e._bindTargetDone(n), n.css(e._getPrefixedCSS("transition", "all " + e.animation.duration + "ms " + e.animation.easing + " " + o + "ms")), n.css(e._getPrefixedCSS("transform", "translate(" + r.x + "px," + r.y + "px)")), e.animation.animateResizeTargets && (i.dataset.origWidth - i.dataset.finalWidth && 1 * i.dataset.finalWidth && (i.style.width = i.dataset.finalWidth + "px", i.style.marginRight = -(i.dataset.finalWidth - i.dataset.interWidth) + 1 * i.dataset.finalMarginRight + "px"), i.dataset.origHeight - i.dataset.finalHeight && 1 * i.dataset.finalHeight && (i.style.height = i.dataset.finalHeight + "px", i.style.marginBottom = -(i.dataset.finalHeight - i.dataset.interHeight) + 1 * i.dataset.finalMarginBottom + "px"))
            }
            e._changingClass && e._$container.removeClass(e.layout.containerClass).addClass(e._newClass);
            for (var a = 0; a < e._$toHide.length; a++) {
                for (var i = e._$toHide[a], n = t(i), o = e._getDelay(a), _ = {}, l = 0; 2 > l; l++) {
                    var c = 0 === l ? c = e._prefix : "";
                    _[c + "transition-delay"] = o + "ms", _[c + "transform"] = e.effects.transformOut, _.opacity = e.effects.opacity
                }
                n.css(e.effects.transition).css(_), (e.effects.transform || e.effects.opacity) && e._bindTargetDone(n)
            }
            e._execAction("_animateTargets", 1)
        },
        _bindTargetDone: function(e) {
            var a = this,
                i = e[0];
            a._execAction("_bindTargetDone", 0, arguments), i.dataset.bound || (i.dataset.bound = !0, a._targetsBound++, e.on("webkitTransitionEnd.mixItUp transitionend.mixItUp", function(n) {
                (n.originalEvent.propertyName.indexOf("transform") > -1 || n.originalEvent.propertyName.indexOf("opacity") > -1) && t(n.originalEvent.target).is(a.selectors.target) && (e.off(".mixItUp"), delete i.dataset.bound, a._targetDone())
            })), a._execAction("_bindTargetDone", 1, arguments)
        },
        _targetDone: function() {
            var t = this;
            t._execAction("_targetDone", 0), t._targetsDone++, t._targetsDone === t._targetsBound && t._cleanUp(), t._execAction("_targetDone", 1)
        },
        _cleanUp: function() {
            var e = this,
                a = e.animation.animateResizeTargets ? "transform opacity width height margin-bottom margin-right" : "transform opacity";
            unBrake = function() {
                e._$targets.removeStyle("transition", e._prefix)
            }, e._execAction("_cleanUp", 0), e._changingLayout ? e._$show.css("display", e._newDisplay) : e._$show.css("display", e.layout.display), e._$targets.css(e._brake), e._$targets.removeStyle(a, e._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"), e._$hide.removeStyle("display"), e._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin", e._prefix), e._sorting && (e._printSort(), e._activeSort = e._newSortString, e._sorting = !1), e._changingLayout && (e._changingDisplay && (e.layout.display = e._newDisplay, e._changingDisplay = !1), e._changingClass && (e._$parent.removeClass(e.layout.containerClass).addClass(e._newClass), e.layout.containerClass = e._newClass, e._changingClass = !1), e._changingLayout = !1), e._refresh(), e._buildState(), e._state.fail && e._$container.addClass(e.layout.containerClassFail), e._$show = t(), e._$hide = t(), window.requestAnimationFrame && requestAnimationFrame(unBrake), e._mixing = !1, "function" == typeof e.callbacks._user && e.callbacks._user.call(e._domNode, e._state, e), "function" == typeof e.callbacks.onMixEnd && e.callbacks.onMixEnd.call(e._domNode, e._state, e), e._$container.trigger("mixEnd", [e._state, e]), e._state.fail && ("function" == typeof e.callbacks.onMixFail && e.callbacks.onMixFail.call(e._domNode, e._state, e), e._$container.trigger("mixFail", [e._state, e])), e._loading && ("function" == typeof e.callbacks.onMixLoad && e.callbacks.onMixLoad.call(e._domNode, e._state, e), e._$container.trigger("mixLoad", [e._state, e])), e._queue.length && (e._execAction("_queue", 0), e.multiMix(e._queue[0][0], e._queue[0][1], e._queue[0][2]), e._queue.splice(0, 1)), e._execAction("_cleanUp", 1), e._loading = !1
        },
        _getPrefixedCSS: function(t, e, a) {
            var n = this,
                r = {};
            for (i = 0; i < 2; i++) {
                var o = 0 === i ? n._prefix : "";
                a ? r[o + t] = o + e : r[o + t] = e
            }
            return n._execFilter("_getPrefixedCSS", r, arguments)
        },
        _getDelay: function(t) {
            var e = this,
                a = "function" == typeof e.animation.staggerSequence ? e.animation.staggerSequence.call(e._domNode, t, e._state) : t,
                i = e.animation.stagger ? a * e.animation.staggerDuration : 0;
            return e._execFilter("_getDelay", i, arguments)
        },
        _parseMultiMixArgs: function(t) {
            for (var e = this, a = {
                    command: null,
                    animate: e.animation.enable,
                    callback: null
                }, i = 0; i < t.length; i++) {
                var n = t[i];
                null !== n && ("object" == typeof n || "string" == typeof n ? a.command = n : "boolean" == typeof n ? a.animate = n : "function" == typeof n && (a.callback = n))
            }
            return e._execFilter("_parseMultiMixArgs", a, arguments)
        },
        _parseInsertArgs: function(e) {
            for (var a = this, i = {
                    index: 0,
                    $object: t(),
                    multiMix: {
                        filter: a._state.activeFilter
                    },
                    callback: null
                }, n = 0; n < e.length; n++) {
                var r = e[n];
                "number" == typeof r ? i.index = r : "object" == typeof r && r instanceof t ? i.$object = r : "object" == typeof r && a._helpers._isElement(r) ? i.$object = t(r) : "object" == typeof r && null !== r ? i.multiMix = r : "boolean" != typeof r || r ? "function" == typeof r && (i.callback = r) : i.multiMix = !1
            }
            return a._execFilter("_parseInsertArgs", i, arguments)
        },
        _execAction: function(t, e, a) {
            var i = this,
                n = e ? "post" : "pre";
            if (!i._actions.isEmptyObject && i._actions.hasOwnProperty(t))
                for (var r in i._actions[t][n])
                    i._actions[t][n][r].call(i, a)
        },
        _execFilter: function(t, e, a) {
            var i = this;
            if (i._filters.isEmptyObject || !i._filters.hasOwnProperty(t))
                return e;
            for (var n in i._filters[t])
                return i._filters[t][n].call(i, a)
        },
        _helpers: {
            _camelCase: function(t) {
                return t.replace(/-([a-z])/g, function(t) {
                    return t[1].toUpperCase()
                })
            },
            _isElement: function(t) {
                return window.HTMLElement ? t instanceof HTMLElement : null !== t && 1 === t.nodeType && "string" === t.nodeName
            }
        },
        isMixing: function() {
            var t = this;
            return t._execFilter("isMixing", t._mixing)
        },
        filter: function() {
            var t = this,
                e = t._parseMultiMixArgs(arguments);
            t._clicking && (t._toggleString = ""), t.multiMix({
                filter: e.command
            }, e.animate, e.callback)
        },
        sort: function() {
            var t = this,
                e = t._parseMultiMixArgs(arguments);
            t.multiMix({
                sort: e.command
            }, e.animate, e.callback)
        },
        changeLayout: function() {
            var t = this,
                e = t._parseMultiMixArgs(arguments);
            t.multiMix({
                changeLayout: e.command
            }, e.animate, e.callback)
        },
        multiMix: function() {
            var t = this,
                a = t._parseMultiMixArgs(arguments);
            if (t._execAction("multiMix", 0, arguments), t._mixing)
                t.animation.queue && t._queue.length < t.animation.queueLimit ? (t._queue.push(arguments), t.controls.enable && !t._clicking && t._updateControls(a.command), t._execAction("multiMixQueue", 1, arguments)) : ("function" == typeof t.callbacks.onMixBusy && t.callbacks.onMixBusy.call(t._domNode, t._state, t), t._$container.trigger("mixBusy", [t._state, t]), t._execAction("multiMixBusy", 1, arguments));
            else {
                t.controls.enable && !t._clicking && (t.controls.toggleFilterButtons && t._buildToggleArray(), t._updateControls(a.command, t.controls.toggleFilterButtons)), t._queue.length < 2 && (t._clicking = !1), delete t.callbacks._user, a.callback && (t.callbacks._user = a.callback);
                var i = a.command.sort,
                    n = a.command.filter,
                    r = a.command.changeLayout;
                t._refresh(), i && (t._newSort = t._parseSort(i), t._newSortString = i, t._sorting = !0, t._sort()), n !== e && (n = "all" === n ? t.selectors.target : n, t._activeFilter = n), t._filter(), r && (t._newDisplay = "string" == typeof r ? r : r.display || t.layout.display, t._newClass = r.containerClass || "", (t._newDisplay !== t.layout.display || t._newClass !== t.layout.containerClass) && (t._changingLayout = !0, t._changingClass = t._newClass !== t.layout.containerClass, t._changingDisplay = t._newDisplay !== t.layout.display)), t._$targets.css(t._brake), t._goMix(a.animate ^ t.animation.enable ? a.animate : t.animation.enable), t._execAction("multiMix", 1, arguments)
            }
        },
        insert: function() {
            var t = this,
                e = t._parseInsertArgs(arguments),
                a = "function" == typeof e.callback ? e.callback : null,
                i = document.createDocumentFragment(),
                n = function() {
                    return t._refresh(), t._$targets.length ? e.index < t._$targets.length || !t._$targets.length ? t._$targets[e.index] : t._$targets[t._$targets.length - 1].nextElementSibling : t._$parent[0].children[0]
                }();
            if (t._execAction("insert", 0, arguments), e.$object) {
                for (var r = 0; r < e.$object.length; r++) {
                    var o = e.$object[r];
                    i.appendChild(o), i.appendChild(document.createTextNode(" "))
                }
                t._$parent[0].insertBefore(i, n)
            }
            t._execAction("insert", 1, arguments), "object" == typeof e.multiMix && t.multiMix(e.multiMix, a)
        },
        prepend: function() {
            var t = this,
                e = t._parseInsertArgs(arguments);
            t.insert(0, e.$object, e.multiMix, e.callback)
        },
        append: function() {
            var t = this,
                e = t._parseInsertArgs(arguments);
            t.insert(t._state.totalTargets, e.$object, e.multiMix, e.callback)
        },
        getOption: function(t) {
            var a = this,
                i = function(t, a) {
                    for (var i = a.split("."), n = i.pop(), r = i.length, o = 1, s = i[0] || a; (t = t[s]) && r > o;)
                        s = i[o], o++;
                    return t !== e ? t[n] !== e ? t[n] : t : void 0
                };
            return t ? a._execFilter("getOption", i(a, t), arguments) : a
        },
        setOptions: function(e) {
            var a = this;
            a._execAction("setOptions", 0, arguments), "object" == typeof e && t.extend(!0, a, e), a._execAction("setOptions", 1, arguments)
        },
        getState: function() {
            var t = this;
            return t._execFilter("getState", t._state, t)
        },
        forceRefresh: function() {
            var t = this;
            t._refresh(!1, !0)
        },
        destroy: function(e) {
            var a = this;
            a._execAction("destroy", 0, arguments), a._$body.add(t(a.selectors.sort)).add(t(a.selectors.filter)).off(".mixItUp");
            for (var i = 0; i < a._$targets.length; i++) {
                var n = a._$targets[i];
                e && (n.style.display = ""), delete n.mixParent
            }
            a._execAction("destroy", 1, arguments), delete t.MixItUp.prototype._instances[a._id]
        }
    }, t.fn.mixItUp = function() {
        var a,
            i = arguments,
            n = [],
            r = function(e, a) {
                var i = new t.MixItUp,
                    n = function() {
                        return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase()
                    };
                i._execAction("_instantiate", 0, arguments), e.id = e.id ? e.id : "MixItUp" + n(), i._instances[e.id] || (i._instances[e.id] = i, i._init(e, a)), i._execAction("_instantiate", 1, arguments)
            };
        return a = this.each(function() {
            if (i && "string" == typeof i[0]) {
                var a = t.MixItUp.prototype._instances[this.id];
                if ("isLoaded" == i[0])
                    n.push(a ? !0 : !1);
                else {
                    var o = a[i[0]](i[1], i[2], i[3]);
                    o !== e && n.push(o)
                }
            } else
                r(this, i[0])
        }), n.length ? n.length > 1 ? n : n[0] : a
    }, t.fn.removeStyle = function(t, a) {
        return a = a ? a : "", this.each(function() {
            for (var i = this, n = t.split(" "), r = 0; r < n.length; r++)
                for (var o = 0; 2 > o; o++) {
                    var s = o ? n[r] : a + n[r];
                    if (i.style[s] !== e && "unknown" != typeof i.style[s] && i.style[s].length > 0 && (i.style[s] = ""), !a)
                        break
                }
            i.attributes && i.attributes.style && i.attributes.style !== e && "" === i.attributes.style.value && i.attributes.removeNamedItem("style")
        })
    }
}(jQuery);

