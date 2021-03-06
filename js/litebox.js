!function(e, t, o, i) {
    function n(t, o) {
        this.element = t, this.$element = e(this.element), this.options = e.extend({}, s, o), this._defaults = s, this._name = r, this.init()
    }
    function l() {
        return t.innerHeight ? t.innerHeight : e(t).height()
    }
    function a(t) {
        e(t).each(function() {
            var t = new Image;
            t.src = this, t.width > 0 && e("<img />").attr("src", this).addClass("litebox-preload").appendTo("body").hide()
        })
    }
    var r = "liteBox",
        s = {
            revealSpeed: 400,
            background: "rgba(0,0,0,.8)",
            overlayClose: !0,
            escKey: !0,
            navKey: !0,
            closeTip: "tip-l-fade",
            closeTipText: "Close",
            prevTip: "tip-t-fade",
            prevTipText: "Previous",
            nextTip: "tip-t-fade",
            nextTipText: "Next",
            callbackInit: function() {},
            callbackBeforeOpen: function() {},
            callbackAfterOpen: function() {},
            callbackBeforeClose: function() {},
            callbackAfterClose: function() {},
            callbackError: function() {},
            callbackPrev: function() {},
            callbackNext: function() {},
            errorMessage: "Error loading content."
        };
    n.prototype = {
        init: function() {
            var t = this;
            this.$element.on("click", function(e) {
                e.preventDefault(), t.openLitebox()
            }), keyEsc = 27, keyLeft = 37, keyRight = 39, e("body").off("keyup").on("keyup", function(o) {
                t.options.escKey && o.keyCode == keyEsc && t.closeLitebox(), t.options.navKey && o.keyCode == keyLeft && e(".litebox-prev").trigger("click"), t.options.navKey && o.keyCode == keyRight && e(".litebox-next").trigger("click")
            }), this.options.callbackInit.call(this)
        },
        openLitebox: function() {
            var t = this;
            this.options.callbackBeforeOpen.call(this), t.buildLitebox();
            var o = this.$element;
            if (t.populateLitebox(o), t.options.overlayClose && $litebox.on("click", function(o) {
                (o.target === this || e(o.target).hasClass("litebox-container") || e(o.target).hasClass("litebox-error")) && t.closeLitebox()
            }), $close.on("click", function() {
                t.closeLitebox()
            }), this.$element.attr("data-litebox-group")) {
                var t = this,
                    i = this.$element.attr("data-litebox-group"),
                    n = e('[data-litebox-group="' + this.$element.attr("data-litebox-group") + '"]'),
                    l = [];
                e('[data-litebox-group="' + i + '"]').each(function() {
                    var t = e(this).attr("href");
                    l.push(t)
                }), a(l), e(".litebox-nav").show(), $prevNav.off("click").on("click", function() {
                    t.options.callbackPrev.call(this);
                    var i = n.index(o);
                    o = n.eq(i - 1), e(o).length || (o = n.last()), t.populateLitebox(o)
                }), $nextNav.off("click").on("click", function() {
                    t.options.callbackNext.call(this);
                    var i = n.index(o);
                    o = n.eq(i + 1), e(o).length || (o = n.first()), t.populateLitebox(o)
                })
            }
            this.options.callbackAfterOpen.call(this)
        },
        buildLitebox: function() {
            $litebox = e("<div>", {
                "class": "litebox-overlay"
            }), $close = e("<div>", {
                "class": "litebox-close " + this.options.closeTip,
                "data-tooltip": this.options.closeTipText
            }), $text = e("<div>", {
                "class": "litebox-text"
            }), $error = e('<div class="litebox-error"><span>' + this.options.errorMessage + "</span></div>"), $prevNav = e("<div>", {
                "class": "litebox-nav litebox-prev " + this.options.prevTip,
                "data-tooltip": this.options.prevTipText
            }), $nextNav = e("<div>", {
                "class": "litebox-nav litebox-next " + this.options.nextTip,
                "data-tooltip": this.options.nextTipText
            }), $container = e("<div>", {
                "class": "litebox-container"
            }), $loader = e("<div>", {
                "class": "litebox-loader"
            }), e("body").prepend($litebox.css({
                "background-color": this.options.background
            })), $litebox.append($close, $text, $prevNav, $nextNav, $container), $litebox.fadeIn(this.options.revealSpeed)
        },
        populateLitebox: function(t) {
            var o = this,
                i = t.attr("href"),
                n = e(".litebox-content");
            $litebox.append($loader);
            var l = t.attr("data-litebox-text");
            if ("undefined" == typeof l || "" == l ? (e(".litebox-text").removeClass("active"), e(".litebox-text").html()) : (e(".litebox-text").html(l), e(".litebox-text").addClass("active")), null !== i.match(/\.(jpeg|jpg|gif|png|bmp)/i)) {
                var a = e("<img>", {
                    src: i,
                    "class": "litebox-content"
                });
                o.transitionContent("image", n, a), e("img.litebox-content").imagesLoaded(function() {
                    $loader.remove()
                }), a.error(function() {
                    o.liteboxError(), $loader.remove()
                })
            } else if (videoURL = i.match(/(youtube|youtu|vimeo|dailymotion|kickstarter)\.(com|be)\/((watch\?v=([-\w]+))|(video\/([-\w]+))|(projects\/([-\w]+)\/([-\w]+))|([-\w]+))/)) {
                var r = "";
                if ("youtube" == videoURL[1] && (r = "http://www.youtube.com/v/" + videoURL[5]), "youtu" == videoURL[1] && (r = "http://www.youtube.com/v/" + videoURL[3]), "vimeo" == videoURL[1] && (r = "http://player.vimeo.com/video/" + videoURL[3]), "dailymotion" == videoURL[1] && (r = "https://www.dailymotion.com/embed/video/" + videoURL[7]), "kickstarter" == videoURL[1] && (r = "https://www.kickstarter.com/projects/" + videoURL[9] + "/" + videoURL[10] + "/widget/video.html"), r) {
                    var s = e("<iframe>", {
                        src: r,
                        frameborder: "0",
                        vspace: "0",
                        hspace: "0",
                        scrolling: "no",
                        allowfullscreen: "",
                        "class": "litebox-content",
                        style: "background:#000"
                    });
                    o.transitionContent("embed", n, s), s.load(function() {
                        $loader.remove()
                    })
                }
            } else if ("#" == i.substring(0, 1))
                e(i).length ? ($html = e("<div>", {
                    "class": "litebox-content litebox-inline-html"
                }), $html.append(e(i).clone()), o.transitionContent("inline", n, $html)) : o.liteboxError(), $loader.remove();
            else {
                var s = e("<iframe>", {
                    src: i,
                    frameborder: "0",
                    vspace: "0",
                    hspace: "0",
                    scrolling: "auto",
                    "class": "litebox-content",
                    allowfullscreen: ""
                });
                o.transitionContent("iframe", n, s), s.load(function() {
                    $loader.remove()
                })
            }
        },
        transitionContent: function(o, i, n) {
            var l = this;
            "inline" != o && $container.removeClass("litebox-scroll"), i.remove(), $container.append(n), "inline" == o && $container.addClass("litebox-scroll"), l.centerContent(), e(t).on("resize", function() {
                l.centerContent()
            })
        },
        centerContent: function() {
            $litebox.css({
                height: l()
            }), $container.css({
                "line-height": $container.height() + "px"
            }), "undefined" != typeof $html && e(".litebox-inline-html").outerHeight() < $container.height() && e(".litebox-inline-html").css({
                "margin-top": "-" + e(".litebox-inline-html").outerHeight() / 2 + "px",
                top: "50%"
            })
        },
        closeLitebox: function() {
            this.options.callbackBeforeClose.call(this), $litebox.fadeOut(this.options.revealSpeed, function() {
                e(".litebox-nav").hide(), $litebox.empty().remove(), e(".litebox-preload").remove()
            }), e(".tipsy").fadeOut(this.options.revealSpeed, function() {
                e(this).remove()
            }), e(".litebox-prev").off("click"), e(".litebox-next").off("click"), this.options.callbackAfterClose.call(this)
        },
        liteboxError: function() {
            this.options.callbackError.call(this), $container.append($error)
        }
    }, e.fn[r] = function(t) {
        return this.each(function() {
            e.data(this, r) || e.data(this, r, new n(this, t))
        })
    }
}(jQuery, window, document), $(".litebox").liteBox();

