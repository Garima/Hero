!function (t) {
  "use strict";
  var a = function (a, e) {
    this.options = e, this.$tabs = t(a), this._accordionVisible = !1, this._initAccordion(), this._checkStateOnResize();
    var s = this;
    setTimeout(function () {
      s.checkState()
    }, 0)
  };
  a.DEFAULTS = {
    accordionClass: "visible-xs", tabsClass: "hidden-xs", accordionTemplate: function (t, a, e, s) {
      return '<div class="panel panel-default">   <div class="panel-heading">      <h4 class="panel-title">      </h4>   </div>   <div id="' + a + '" class="panel-collapse collapse ' + (s ? "in" : "") + '">       <div class="panel-body js-tabcollapse-panel-body">       </div>   </div></div>'
    }
  }, a.prototype.checkState = function () {
    this.$tabs.is(":visible") && this._accordionVisible ? (this.showTabs(), this._accordionVisible = !1) : this.$accordion.is(":visible") && !this._accordionVisible && (this.showAccordion(), this._accordionVisible = !0)
  }, a.prototype.showTabs = function () {
    var a = this;
    this.$tabs.trigger(t.Event("show-tabs.bs.tabcollapse"));
    var e = this.$accordion.find(".js-tabcollapse-panel-heading").detach();
    e.each(function () {
      var e = t(this), s = e.data("bs.tabcollapse.parentLi"), i = a._panelHeadingToTabHeading(e);
      s.removeClass("active"), s.parent().hasClass("dropdown-menu") && !s.siblings("li").hasClass("active") && s.parent().parent().removeClass("active"), i.hasClass("collapsed") ? i.removeClass("collapsed") : (s.addClass("active"), s.parent().hasClass("dropdown-menu") && s.parent().parent().addClass("active")), s.append(e)
    }), t("li").hasClass("active") || t("li").first().addClass("active");
    var s = this.$accordion.find(".js-tabcollapse-panel-body");
    if (s.each(function () {
        var a = t(this), e = a.data("bs.tabcollapse.tabpane");
        e.append(a.contents().detach())
      }), this.$accordion.html(""), this.options.updateLinks) {
      var i = this.getTabContentElement();
      i.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function () {
        var a = t(this), e = a.attr("href").replace(/-collapse$/g, "");
        a.attr({"data-toggle": a.attr("data-toggle-was"), "data-toggle-was": "", "data-parent": "", href: e})
      })
    }
    this.$tabs.trigger(t.Event("shown-tabs.bs.tabcollapse"))
  }, a.prototype.getTabContentElement = function () {
    var a = t(this.options.tabContentSelector);
    return 0 === a.length && (a = this.$tabs.siblings(".tab-content")), a
  }, a.prototype.showAccordion = function () {
    this.$tabs.trigger(t.Event("show-accordion.bs.tabcollapse"));
    var a = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'), e = this;
    if (a.each(function () {
        var a = t(this), s = a.parent();
        a.data("bs.tabcollapse.parentLi", s), e.$accordion.append(e._createAccordionGroup(e.$accordion.attr("id"), a.detach()))
      }), this.options.updateLinks) {
      var s = this.$accordion.attr("id"), i = this.$accordion.find(".js-tabcollapse-panel-body");
      i.find('[data-toggle="tab"], [data-toggle="pill"]').each(function () {
        var a = t(this), e = a.attr("href") + "-collapse";
        a.attr({"data-toggle-was": a.attr("data-toggle"), "data-toggle": "collapse", "data-parent": "#" + s, href: e})
      })
    }
    this.$tabs.trigger(t.Event("shown-accordion.bs.tabcollapse"))
  }, a.prototype._panelHeadingToTabHeading = function (t) {
    var a = t.attr("href").replace(/-collapse$/g, "");
    return t.attr({"data-toggle": "tab", href: a, "data-parent": ""}), t
  }, a.prototype._tabHeadingToPanelHeading = function (t, a, e, s) {
    return t.addClass("js-tabcollapse-panel-heading " + (s ? "" : "collapsed")), t.attr({
      "data-toggle": "collapse",
      "data-parent": "#" + e,
      href: "#" + a
    }), t
  }, a.prototype._checkStateOnResize = function () {
    var a = this;
    t(window).resize(function () {
      clearTimeout(a._resizeTimeout), a._resizeTimeout = setTimeout(function () {
        a.checkState()
      }, 100)
    })
  }, a.prototype._initAccordion = function () {
    var a = function () {
      for (var t = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = 0; 5 > e; e++)t += a.charAt(Math.floor(Math.random() * a.length));
      return t
    }, e = this.$tabs.attr("id"), s = (e ? e : a()) + "-accordion";
    this.$accordion = t('<div class="panel-group ' + this.options.accordionClass + '" id="' + s + '"></div>'), this.$tabs.after(this.$accordion), this.$tabs.addClass(this.options.tabsClass), this.getTabContentElement().addClass(this.options.tabsClass)
  }, a.prototype._createAccordionGroup = function (a, e) {
    var s = e.attr("data-target"), i = e.data("bs.tabcollapse.parentLi").is(".active");
    s || (s = e.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
    var o = t(s), n = o.attr("id") + "-collapse", c = t(this.options.accordionTemplate(e, n, a, i));
    return c.find(".panel-heading > .panel-title").append(this._tabHeadingToPanelHeading(e, n, a, i)), c.find(".panel-body").append(o.contents().detach()).data("bs.tabcollapse.tabpane", o), c
  }, t.fn.tabCollapse = function (e) {
    return this.each(function () {
      var s = t(this), i = s.data("bs.tabcollapse"), o = t.extend({}, a.DEFAULTS, s.data(), "object" == typeof e && e);
      i || s.data("bs.tabcollapse", new a(this, o))
    })
  }, t.fn.tabCollapse.Constructor = a
}(window.jQuery);