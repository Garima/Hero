﻿(function (e) {
  "use strict";
  function t(e) {
    var t = {};
    if (e.selectionStart === undefined) {
      e.focus();
      var n = document.selection.createRange();
      t.length = n.text.length;
      n.moveStart("character", -e.value.length);
      t.end = n.text.length;
      t.start = t.end - t.length
    } else {
      t.start = e.selectionStart;
      t.end = e.selectionEnd;
      t.length = t.end - t.start
    }
    return t
  }

  function n(e, t, n) {
    if (e.selectionStart === undefined) {
      e.focus();
      var r = e.createTextRange();
      r.collapse(true);
      r.moveEnd("character", n);
      r.moveStart("character", t);
      r.select()
    } else {
      e.selectionStart = t;
      e.selectionEnd = n
    }
  }

  function r(t, n) {
    e.each(n, function (e, r) {
      if (typeof r === "function") {
        n[e] = r(t, n, e)
      } else if (typeof t.autoNumeric[r] === "function") {
        n[e] = t.autoNumeric[r](t, n, e)
      }
    })
  }

  function i(e, t) {
    if (typeof e[t] === "string") {
      e[t] *= 1
    }
  }

  function s(e, t) {
    r(e, t);
    t.oEvent = null;
    t.tagList = ["B", "CAPTION", "CITE", "CODE", "DD", "DEL", "DIV", "DFN", "DT", "EM", "H1", "H2", "H3", "H4", "H5", "H6", "INS", "KDB", "LABEL", "LI", "OUTPUT", "P", "Q", "S", "SAMPLE", "SPAN", "STRONG", "TD", "TH", "U", "VAR"];
    var n = t.vMax.toString().split("."), s = !t.vMin && t.vMin !== 0 ? [] : t.vMin.toString().split(".");
    i(t, "vMax");
    i(t, "vMin");
    i(t, "mDec");
    t.allowLeading = true;
    t.aNeg = t.vMin < 0 ? "-" : "";
    n[0] = n[0].replace("-", "");
    s[0] = s[0].replace("-", "");
    t.mInt = Math.max(n[0].length, s[0].length, 1);
    if (t.mDec === null) {
      var o = 0, u = 0;
      if (n[1]) {
        o = n[1].length
      }
      if (s[1]) {
        u = s[1].length
      }
      t.mDec = Math.max(o, u)
    }
    if (t.altDec === null && t.mDec > 0) {
      if (t.aDec === "." && t.aSep !== ",") {
        t.altDec = ","
      } else if (t.aDec === "," && t.aSep !== ".") {
        t.altDec = "."
      }
    }
    var a = t.aNeg ? "([-\\" + t.aNeg + "]?)" : "(-?)";
    t.aNegRegAutoStrip = a;
    t.skipFirstAutoStrip = new RegExp(a + "[^-" + (t.aNeg ? "\\" + t.aNeg : "") + "\\" + t.aDec + "\\d]" + ".*?(\\d|\\" + t.aDec + "\\d)");
    t.skipLastAutoStrip = new RegExp("(\\d\\" + t.aDec + "?)[^\\" + t.aDec + "\\d]\\D*$");
    var f = "-" + t.aNum + "\\" + t.aDec;
    t.allowedAutoStrip = new RegExp("[^" + f + "]", "gi");
    t.numRegAutoStrip = new RegExp(a + "(?:\\" + t.aDec + "?(\\d+\\" + t.aDec + "\\d+)|(\\d*(?:\\" + t.aDec + "\\d*)?))");
    return t
  }

  function o(e, t, n) {
    if (t.aSign) {
      while (e.indexOf(t.aSign) > -1) {
        e = e.replace(t.aSign, "")
      }
    }
    e = e.replace(t.skipFirstAutoStrip, "$1$2");
    e = e.replace(t.skipLastAutoStrip, "$1");
    e = e.replace(t.allowedAutoStrip, "");
    if (t.altDec) {
      e = e.replace(t.altDec, t.aDec)
    }
    var r = e.match(t.numRegAutoStrip);
    e = r ? [r[1], r[2], r[3]].join("") : "";
    if ((t.lZero === "allow" || t.lZero === "keep") && n !== "strip") {
      var i = [], s = "";
      i = e.split(t.aDec);
      if (i[0].indexOf("-") !== -1) {
        s = "-";
        i[0] = i[0].replace("-", "")
      }
      if (i[0].length > t.mInt && i[0].charAt(0) === "0") {
        i[0] = i[0].slice(1)
      }
      e = s + i.join(t.aDec)
    }
    if (n && t.lZero === "deny" || n && t.lZero === "allow" && t.allowLeading === false) {
      var o = "^" + t.aNegRegAutoStrip + "0*(\\d" + (n === "leading" ? ")" : "|$)");
      o = new RegExp(o);
      e = e.replace(o, "$1$2")
    }
    return e
  }

  function u(e, t, n) {
    t = t.split(",");
    if (n === "set" || n === "focusout") {
      e = e.replace("-", "");
      e = t[0] + e + t[1]
    } else if ((n === "get" || n === "focusin" || n === "pageLoad") && e.charAt(0) === t[0]) {
      e = e.replace(t[0], "-");
      e = e.replace(t[1], "")
    }
    return e
  }

  function a(e, t, n) {
    if (t && n) {
      var r = e.split(t);
      if (r[1] && r[1].length > n) {
        if (n > 0) {
          r[1] = r[1].substring(0, n);
          e = r.join(t)
        } else {
          e = r[0]
        }
      }
    }
    return e
  }

  function f(e, t, n) {
    if (t && t !== ".") {
      e = e.replace(t, ".")
    }
    if (n && n !== "-") {
      e = e.replace(n, "-")
    }
    if (!e.match(/\d/)) {
      e += "0"
    }
    return e
  }

  function l(e, t) {
    var n = e.indexOf("."), r = +e;
    if (n !== -1) {
      if (r < 1e-6 && r > -1) {
        e = +e;
        if (e < 1e-6 && e > 0) {
          e = (e + 10).toString();
          e = e.substring(1)
        }
        if (e < 0 && e > -1) {
          e = (e - 10).toString();
          e = "-" + e.substring(2)
        }
        e = e.toString()
      } else {
        var i = e.split(".");
        if (i[1] !== undefined) {
          if (+i[1] === 0) {
            e = i[0]
          } else {
            i[1] = i[1].replace(/0*$/, "");
            e = i.join(".")
          }
        }
      }
    }
    return t.lZero === "keep" ? e : e.replace(/^0*(\d)/, "$1")
  }

  function c(e, t, n) {
    if (n && n !== "-") {
      e = e.replace("-", n)
    }
    if (t && t !== ".") {
      e = e.replace(".", t)
    }
    return e
  }

  function h(t, n) {
    t = o(t, n);
    t = a(t, n.aDec, n.mDec);
    t = f(t, n.aDec, n.aNeg);
    var r = +t;
    if (n.oEvent === "set" && (r < n.vMin || r > n.vMax)) {
      e.error("The value (" + r + ") from the 'set' method falls outside of the vMin / vMax range")
    }
    return r >= n.vMin && r <= n.vMax
  }

  function p(e, t, n) {
    if (e === "" || e === t.aNeg) {
      if (t.wEmpty === "zero") {
        return e + "0"
      }
      if (t.wEmpty === "sign" || n) {
        return e + t.aSign
      }
      return e
    }
    return null
  }

  function d(e, t) {
    e = o(e, t);
    var n = e.replace(",", "."), r = p(e, t, true);
    if (r !== null) {
      return r
    }
    var i = "";
    if (t.dGroup === 2) {
      i = /(\d)((\d)(\d{2}?)+)$/
    } else if (t.dGroup === 4) {
      i = /(\d)((\d{4}?)+)$/
    } else {
      i = /(\d)((\d{3}?)+)$/
    }
    var s = e.split(t.aDec);
    if (t.altDec && s.length === 1) {
      s = e.split(t.altDec)
    }
    var a = s[0];
    if (t.aSep) {
      while (i.test(a)) {
        a = a.replace(i, "$1" + t.aSep + "$2")
      }
    }
    if (t.mDec !== 0 && s.length > 1) {
      if (s[1].length > t.mDec) {
        s[1] = s[1].substring(0, t.mDec)
      }
      e = a + t.aDec + s[1]
    } else {
      e = a
    }
    if (t.aSign) {
      var f = e.indexOf(t.aNeg) !== -1;
      e = e.replace(t.aNeg, "");
      e = t.pSign === "p" ? t.aSign + e : e + t.aSign;
      if (f) {
        e = t.aNeg + e
      }
    }
    if (t.oEvent === "set" && n < 0 && t.nBracket !== null) {
      e = u(e, t.nBracket, t.oEvent)
    }
    return e
  }

  function v(e, t) {
    e = e === "" ? "0" : e.toString();
    i(t, "mDec");
    var n = "", r = 0, s = "", o = typeof t.aPad === "boolean" || t.aPad === null ? t.aPad ? t.mDec : 0 : +t.aPad;
    var u = function (e) {
      var t = o === 0 ? /(\.[1-9]*)0*$/ : o === 1 ? /(\.\d[1-9]*)0*$/ : new RegExp("(\\.\\d{" + o + "}[1-9]*)0*$");
      e = e.replace(t, "$1");
      if (o === 0) {
        e = e.replace(/\.$/, "")
      }
      return e
    };
    if (e.charAt(0) === "-") {
      s = "-";
      e = e.replace("-", "")
    }
    if (!e.match(/^\d/)) {
      e = "0" + e
    }
    if (s === "-" && +e === 0) {
      s = ""
    }
    if (+e > 0 && t.lZero !== "keep" || e.length > 0 && t.lZero === "allow") {
      e = e.replace(/^0*(\d)/, "$1")
    }
    var a = e.lastIndexOf("."), f = a === -1 ? e.length - 1 : a, l = e.length - 1 - f;
    if (l <= t.mDec) {
      n = e;
      if (l < o) {
        if (a === -1) {
          n += "."
        }
        while (l < o) {
          var c = "000000".substring(0, o - l);
          n += c;
          l += c.length
        }
      } else if (l > o) {
        n = u(n)
      } else if (l === 0 && o === 0) {
        n = n.replace(/\.$/, "")
      }
      return s + n
    }
    var h = a + t.mDec, p = +e.charAt(h + 1), d = e.substring(0, h + 1).split(""), v = e.charAt(h) === "." ? e.charAt(h - 1) % 2 : e.charAt(h) % 2;
    if (p > 4 && t.mRound === "S" || p > 4 && t.mRound === "A" && s === "" || p > 5 && t.mRound === "A" && s === "-" || p > 5 && t.mRound === "s" || p > 5 && t.mRound === "a" && s === "" || p > 4 && t.mRound === "a" && s === "-" || p > 5 && t.mRound === "B" || p === 5 && t.mRound === "B" && v === 1 || p > 0 && t.mRound === "C" && s === "" || p > 0 && t.mRound === "F" && s === "-" || p > 0 && t.mRound === "U") {
      for (r = d.length - 1; r >= 0; r -= 1) {
        if (d[r] !== ".") {
          d[r] = +d[r] + 1;
          if (d[r] < 10) {
            break
          }
          if (r > 0) {
            d[r] = "0"
          }
        }
      }
    }
    d = d.slice(0, h + 1);
    n = u(d.join(""));
    return +n === 0 ? n : s + n
  }

  function m(t, n) {
    this.settings = n;
    this.that = t;
    this.$that = e(t);
    this.formatted = false;
    this.settingsClone = s(this.$that, this.settings);
    this.value = t.value
  }

  function g(t) {
    if (typeof t === "string") {
      t = t.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
      t = "#" + t.replace(/(:|\.)/g, "\\$1")
    }
    return e(t)
  }

  function y(e, t, n) {
    var r = e.data("autoNumeric");
    if (!r) {
      r = {};
      e.data("autoNumeric", r)
    }
    var i = r.holder;
    if (i === undefined && t || n) {
      i = new m(e.get(0), t);
      r.holder = i
    }
    return i
  }

  m.prototype = {
    init: function (e) {
      this.value = this.that.value;
      this.settingsClone = s(this.$that, this.settings);
      this.ctrlKey = e.ctrlKey;
      this.cmdKey = e.metaKey;
      this.shiftKey = e.shiftKey;
      this.selection = t(this.that);
      if (e.type === "keydown" || e.type === "keyup") {
        this.kdCode = e.keyCode
      }
      this.which = e.which;
      this.processed = false;
      this.formatted = false
    }, setSelection: function (e, t, r) {
      e = Math.max(e, 0);
      t = Math.min(t, this.that.value.length);
      this.selection = {start: e, end: t, length: t - e};
      if (r === undefined || r) {
        n(this.that, e, t)
      }
    }, setPosition: function (e, t) {
      this.setSelection(e, e, t)
    }, getBeforeAfter: function () {
      var e = this.value, t = e.substring(0, this.selection.start), n = e.substring(this.selection.end, e.length);
      return [t, n]
    }, getBeforeAfterStriped: function () {
      var e = this.getBeforeAfter();
      e[0] = o(e[0], this.settingsClone);
      e[1] = o(e[1], this.settingsClone);
      return e
    }, normalizeParts: function (e, t) {
      var n = this.settingsClone;
      t = o(t, n);
      var r = t.match(/^\d/) ? true : "leading";
      e = o(e, n, r);
      if ((e === "" || e === n.aNeg) && n.lZero === "deny") {
        if (t > "") {
          t = t.replace(/^0*(\d)/, "$1")
        }
      }
      var i = e + t;
      if (n.aDec) {
        var s = i.match(new RegExp("^" + n.aNegRegAutoStrip + "\\" + n.aDec));
        if (s) {
          e = e.replace(s[1], s[1] + "0");
          i = e + t
        }
      }
      if (n.wEmpty === "zero" && (i === n.aNeg || i === "")) {
        e += "0"
      }
      return [e, t]
    }, setValueParts: function (e, t) {
      var n = this.settingsClone, r = this.normalizeParts(e, t), i = r.join(""), s = r[0].length;
      if (h(i, n)) {
        i = a(i, n.aDec, n.mDec);
        if (s > i.length) {
          s = i.length
        }
        this.value = i;
        this.setPosition(s, false);
        return true
      }
      return false
    }, signPosition: function () {
      var e = this.settingsClone, t = e.aSign, n = this.that;
      if (t) {
        var r = t.length;
        if (e.pSign === "p") {
          var i = e.aNeg && n.value && n.value.charAt(0) === e.aNeg;
          return i ? [1, r + 1] : [0, r]
        }
        var s = n.value.length;
        return [s - r, s]
      }
      return [1e3, -1]
    }, expandSelectionOnSign: function (e) {
      var t = this.signPosition(), n = this.selection;
      if (n.start < t[1] && n.end > t[0]) {
        if ((n.start < t[0] || n.end > t[1]) && this.value.substring(Math.max(n.start, t[0]), Math.min(n.end, t[1])).match(/^\s*$/)) {
          if (n.start < t[0]) {
            this.setSelection(n.start, t[0], e)
          } else {
            this.setSelection(t[1], n.end, e)
          }
        } else {
          this.setSelection(Math.min(n.start, t[0]), Math.max(n.end, t[1]), e)
        }
      }
    }, checkPaste: function () {
      if (this.valuePartsBeforePaste !== undefined) {
        var e = this.getBeforeAfter(), t = this.valuePartsBeforePaste;
        delete this.valuePartsBeforePaste;
        e[0] = e[0].substr(0, t[0].length) + o(e[0].substr(t[0].length), this.settingsClone);
        if (!this.setValueParts(e[0], e[1])) {
          this.value = t.join("");
          this.setPosition(t[0].length, false)
        }
      }
    }, skipAllways: function (e) {
      var t = this.kdCode, n = this.which, r = this.ctrlKey, i = this.cmdKey, s = this.shiftKey;
      if ((r || i) && e.type === "keyup" && this.valuePartsBeforePaste !== undefined || s && t === 45) {
        this.checkPaste();
        return false
      }
      if (t >= 112 && t <= 123 || t >= 91 && t <= 93 || t >= 9 && t <= 31 || t < 8 && (n === 0 || n === t) || t === 144 || t === 145 || t === 45) {
        return true
      }
      if ((r || i) && t === 65) {
        return true
      }
      if ((r || i) && (t === 67 || t === 86 || t === 88)) {
        if (e.type === "keydown") {
          this.expandSelectionOnSign()
        }
        if (t === 86 || t === 45) {
          if (e.type === "keydown" || e.type === "keypress") {
            if (this.valuePartsBeforePaste === undefined) {
              this.valuePartsBeforePaste = this.getBeforeAfter()
            }
          } else {
            this.checkPaste()
          }
        }
        return e.type === "keydown" || e.type === "keypress" || t === 67
      }
      if (r || i) {
        return true
      }
      if (t === 37 || t === 39) {
        var o = this.settingsClone.aSep, u = this.selection.start, a = this.that.value;
        if (e.type === "keydown" && o && !this.shiftKey) {
          if (t === 37 && a.charAt(u - 2) === o) {
            this.setPosition(u - 1)
          } else if (t === 39 && a.charAt(u + 1) === o) {
            this.setPosition(u + 1)
          }
        }
        return true
      }
      if (t >= 34 && t <= 40) {
        return true
      }
      return false
    }, processAllways: function () {
      var e;
      if (this.kdCode === 8 || this.kdCode === 46) {
        if (!this.selection.length) {
          e = this.getBeforeAfterStriped();
          if (this.kdCode === 8) {
            e[0] = e[0].substring(0, e[0].length - 1)
          } else {
            e[1] = e[1].substring(1, e[1].length)
          }
          this.setValueParts(e[0], e[1])
        } else {
          this.expandSelectionOnSign(false);
          e = this.getBeforeAfterStriped();
          this.setValueParts(e[0], e[1])
        }
        return true
      }
      return false
    }, processKeypress: function () {
      var e = this.settingsClone, t = String.fromCharCode(this.which), n = this.getBeforeAfterStriped(), r = n[0], i = n[1];
      if (t === e.aDec || e.altDec && t === e.altDec || (t === "." || t === ",") && this.kdCode === 110) {
        if (!e.mDec || !e.aDec) {
          return true
        }
        if (e.aNeg && i.indexOf(e.aNeg) > -1) {
          return true
        }
        if (r.indexOf(e.aDec) > -1) {
          return true
        }
        if (i.indexOf(e.aDec) > 0) {
          return true
        }
        if (i.indexOf(e.aDec) === 0) {
          i = i.substr(1)
        }
        this.setValueParts(r + e.aDec, i);
        return true
      }
      if (t === "-" || t === "+") {
        if (!e.aNeg) {
          return true
        }
        if (r === "" && i.indexOf(e.aNeg) > -1) {
          r = e.aNeg;
          i = i.substring(1, i.length)
        }
        if (r.charAt(0) === e.aNeg) {
          r = r.substring(1, r.length)
        } else {
          r = t === "-" ? e.aNeg + r : r
        }
        this.setValueParts(r, i);
        return true
      }
      if (t >= "0" && t <= "9") {
        if (e.aNeg && r === "" && i.indexOf(e.aNeg) > -1) {
          r = e.aNeg;
          i = i.substring(1, i.length)
        }
        if (e.vMax <= 0 && e.vMin < e.vMax && this.value.indexOf(e.aNeg) === -1 && t !== "0") {
          r = e.aNeg + r
        }
        this.setValueParts(r + t, i);
        return true
      }
      return true
    }, formatQuick: function () {
      var e = this.settingsClone, t = this.getBeforeAfterStriped(), n = this.value;
      if ((e.aSep === "" || e.aSep !== "" && n.indexOf(e.aSep) === -1) && (e.aSign === "" || e.aSign !== "" && n.indexOf(e.aSign) === -1)) {
        var r = [], i = "";
        r = n.split(e.aDec);
        if (r[0].indexOf("-") > -1) {
          i = "-";
          r[0] = r[0].replace("-", "");
          t[0] = t[0].replace("-", "")
        }
        if (r[0].length > e.mInt && t[0].charAt(0) === "0") {
          t[0] = t[0].slice(1)
        }
        t[0] = i + t[0]
      }
      var s = d(this.value, this.settingsClone), o = s.length;
      if (s) {
        var u = t[0].split(""), a = 0;
        for (a; a < u.length; a += 1) {
          if (!u[a].match("\\d")) {
            u[a] = "\\" + u[a]
          }
        }
        var f = new RegExp("^.*?" + u.join(".*?"));
        var l = s.match(f);
        if (l) {
          o = l[0].length;
          if ((o === 0 && s.charAt(0) !== e.aNeg || o === 1 && s.charAt(0) === e.aNeg) && e.aSign && e.pSign === "p") {
            o = this.settingsClone.aSign.length + (s.charAt(0) === "-" ? 1 : 0)
          }
        } else if (e.aSign && e.pSign === "s") {
          o -= e.aSign.length
        }
      }
      this.that.value = s;
      this.setPosition(o);
      this.formatted = true
    }
  };
  var b = {
    init: function (t) {
      return this.each(function () {
        var r = e(this), i = r.data("autoNumeric"), s = r.data();
        if (typeof i !== "object") {
          var a = {
            aNum: "0123456789",
            aSep: ",",
            dGroup: "3",
            aDec: ".",
            altDec: null,
            aSign: "",
            pSign: "p",
            vMax: "999999999.99",
            vMin: "0.00",
            mDec: null,
            mRound: "S",
            aPad: true,
            nBracket: null,
            wEmpty: "empty",
            lZero: "allow",
            aForm: true,
            onSomeEvent: function () {
            }
          };
          i = e.extend({}, a, s, t);
          if (i.aDec === i.aSep) {
            e.error("autoNumeric will not function properly when the decimal character aDec: '" + i.aDec + "' and thousand separator aSep: '" + i.aSep + "' are the same character");
            return this
          }
          r.data("autoNumeric", i)
        } else {
          return this
        }
        i.lastSetValue = "";
        i.runOnce = false;
        var l = y(r, i);
        if (e.inArray(r.prop("tagName"), i.tagList) === -1 && r.prop("tagName") !== "INPUT") {
          e.error("The <" + r.prop("tagName") + "> is not supported by autoNumeric()");
          return this
        }
        if (i.runOnce === false && i.aForm) {
          if (r.is("input[type=text], input[type=hidden], input:not([type])")) {
            var m = true;
            if (r[0].value === "" && i.wEmpty === "empty") {
              r[0].value = "";
              m = false
            }
            if (r[0].value === "" && i.wEmpty === "sign") {
              r[0].value = i.aSign;
              m = false
            }
            if (m) {
              r.autoNumeric("set", r.val())
            }
          }
          if (e.inArray(r.prop("tagName"), i.tagList) !== -1 && r.text() !== "") {
            r.autoNumeric("set", r.text())
          }
        }
        i.runOnce = true;
        if (r.is("input[type=text], input[type=hidden], input:not([type])")) {
          r.on("keydown.autoNumeric", function (t) {
            l = y(r);
            if (l.settings.aDec === l.settings.aSep) {
              e.error("autoNumeric will not function properly when the decimal character aDec: '" + l.settings.aDec + "' and thousand separator aSep: '" + l.settings.aSep + "' are the same character");
              return this
            }
            if (l.that.readOnly) {
              l.processed = true;
              return true
            }
            l.init(t);
            l.settings.oEvent = "keydown";
            if (l.skipAllways(t)) {
              l.processed = true;
              return true
            }
            if (l.processAllways()) {
              l.processed = true;
              l.formatQuick();
              t.preventDefault();
              return false
            }
            l.formatted = false;
            return true
          });
          r.on("keypress.autoNumeric", function (e) {
            var t = y(r), n = t.processed;
            t.init(e);
            t.settings.oEvent = "keypress";
            if (t.skipAllways(e)) {
              return true
            }
            if (n) {
              e.preventDefault();
              return false
            }
            if (t.processAllways() || t.processKeypress()) {
              t.formatQuick();
              e.preventDefault();
              return false
            }
            t.formatted = false
          });
          r.on("keyup.autoNumeric", function (e) {
            var t = y(r);
            t.init(e);
            t.settings.oEvent = "keyup";
            var i = t.skipAllways(e);
            t.kdCode = 0;
            delete t.valuePartsBeforePaste;
            if (r[0].value === t.settings.aSign) {
              if (t.settings.pSign === "s") {
                n(this, 0, 0)
              } else {
                n(this, t.settings.aSign.length, t.settings.aSign.length)
              }
            }
            if (i) {
              return true
            }
            if (this.value === "") {
              return true
            }
            if (!t.formatted) {
              t.formatQuick()
            }
          });
          r.on("focusin.autoNumeric", function () {
            var e = y(r);
            e.settingsClone.oEvent = "focusin";
            if (e.settingsClone.nBracket !== null) {
              var t = r.val();
              r.val(u(t, e.settingsClone.nBracket, e.settingsClone.oEvent))
            }
            e.inVal = r.val();
            var i = p(e.inVal, e.settingsClone, true);
            if (i !== null) {
              r.val(i);
              if (e.settings.pSign === "s") {
                n(this, 0, 0)
              } else {
                n(this, e.settings.aSign.length, e.settings.aSign.length)
              }
            }
          });
          r.on("focusout.autoNumeric", function () {
            var e = y(r), t = e.settingsClone, n = r.val(), i = n;
            e.settingsClone.oEvent = "focusout";
            var s = "";
            if (t.lZero === "allow") {
              t.allowLeading = false;
              s = "leading"
            }
            if (n !== "") {
              n = o(n, t, s);
              if (p(n, t) === null && h(n, t, r[0])) {
                n = f(n, t.aDec, t.aNeg);
                n = v(n, t);
                n = c(n, t.aDec, t.aNeg)
              } else {
                n = ""
              }
            }
            var a = p(n, t, false);
            if (a === null) {
              a = d(n, t)
            }
            if (a !== i) {
              r.val(a)
            }
            if (a !== e.inVal) {
              r.change();
              delete e.inVal
            }
            if (t.nBracket !== null && r.autoNumeric("get") < 0) {
              e.settingsClone.oEvent = "focusout";
              r.val(u(r.val(), t.nBracket, t.oEvent))
            }
          })
        }
      })
    }, destroy: function () {
      return e(this).each(function () {
        var t = e(this);
        t.off(".autoNumeric");
        t.removeData("autoNumeric")
      })
    }, update: function (t) {
      return e(this).each(function () {
        var n = g(e(this)), r = n.data("autoNumeric");
        if (typeof r !== "object") {
          e.error("You must initialize autoNumeric('init', {options}) prior to calling the 'update' method");
          return this
        }
        var i = n.autoNumeric("get");
        r = e.extend(r, t);
        y(n, r, true);
        if (r.aDec === r.aSep) {
          e.error("autoNumeric will not function properly when the decimal character aDec: '" + r.aDec + "' and thousand separator aSep: '" + r.aSep + "' are the same character");
          return this
        }
        n.data("autoNumeric", r);
        if (n.val() !== "" || n.text() !== "") {
          return n.autoNumeric("set", i)
        }
        return
      })
    }, set: function (t) {
      return e(this).each(function () {
        var n = g(e(this)), r = n.data("autoNumeric"), i = t.toString(), s = t.toString();
        if (typeof r !== "object") {
          e.error("You must initialize autoNumeric('init', {options}) prior to calling the 'set' method");
          return this
        }
        if (s === n.attr("value")) {
          i = i.replace(",", ".")
        }
        if (s !== n.attr("value") && r.runOnce === false) {
          i = o(i, r)
        }
        if (!e.isNumeric(+i)) {
          return ""
        }
        i = l(i, r);
        r.oEvent = "set";
        r.lastSetValue = i;
        i.toString();
        if (i !== "") {
          i = v(i, r)
        }
        i = c(i, r.aDec, r.aNeg);
        if (!h(i, r)) {
          i = v("", r)
        }
        i = d(i, r);
        if (n.is("input[type=text], input[type=hidden], input:not([type])")) {
          return n.val(i)
        }
        if (e.inArray(n.prop("tagName"), r.tagList) !== -1) {
          return n.text(i)
        }
        e.error("The <" + n.prop("tagName") + "> is not supported by autoNumeric()");
        return false
      })
    }, get: function () {
      var t = g(e(this)), n = t.data("autoNumeric");
      if (typeof n !== "object") {
        e.error("You must initialize autoNumeric('init', {options}) prior to calling the 'get' method");
        return this
      }
      n.oEvent = "get";
      var r = "";
      if (t.is("input[type=text], input[type=hidden], input:not([type])")) {
        r = t.eq(0).val()
      } else if (e.inArray(t.prop("tagName"), n.tagList) !== -1) {
        r = t.eq(0).text()
      } else {
        e.error("The <" + t.prop("tagName") + "> is not supported by autoNumeric()");
        return false
      }
      if (r === "" && n.wEmpty === "empty" || r === n.aSign && (n.wEmpty === "sign" || n.wEmpty === "empty")) {
        return ""
      }
      if (n.nBracket !== null && r !== "") {
        r = u(r, n.nBracket, n.oEvent)
      }
      if (n.runOnce || n.aForm === false) {
        r = o(r, n)
      }
      r = f(r, n.aDec, n.aNeg);
      if (+r === 0 && n.lZero !== "keep") {
        r = "0"
      }
      if (n.lZero === "keep") {
        return r
      }
      r = l(r, n);
      return r
    }, getString: function () {
      var t = false, n = g(e(this)), r = n.serialize(), i = r.split("&"), s = 0;
      for (s; s < i.length; s += 1) {
        var o = i[s].split("=");
        var u = e('*[name="' + decodeURIComponent(o[0]) + '"]').data("autoNumeric");
        if (typeof u === "object") {
          if (o[1] !== null && e('*[name="' + decodeURIComponent(o[0]) + '"]').data("autoNumeric") !== undefined) {
            o[1] = e('input[name="' + decodeURIComponent(o[0]) + '"]').autoNumeric("get");
            i[s] = o.join("=");
            t = true
          }
        }
      }
      if (t === true) {
        return i.join("&")
      }
      e.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getString' method");
      return this
    }, getArray: function () {
      var t = false, n = g(e(this)), r = n.serializeArray();
      e.each(r, function (n, r) {
        var i = e('*[name="' + decodeURIComponent(r.name) + '"]').data("autoNumeric");
        if (typeof i === "object") {
          if (r.value !== "" && e('*[name="' + decodeURIComponent(r.name) + '"]').data("autoNumeric") !== undefined) {
            r.value = e('input[name="' + decodeURIComponent(r.name) + '"]').autoNumeric("get").toString()
          }
          t = true
        }
      });
      if (t === true) {
        return r
      }
      e.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getArray' method");
      return this
    }, getSettings: function () {
      var t = g(e(this));
      return t.eq(0).data("autoNumeric")
    }
  };
  e.fn.autoNumeric = function (t) {
    if (b[t]) {
      return b[t].apply(this, Array.prototype.slice.call(arguments, 1))
    }
    if (typeof t === "object" || !t) {
      return b.init.apply(this, arguments)
    }
    e.error('Method "' + t + '" is not supported by autoNumeric()')
  }
})(jQuery)