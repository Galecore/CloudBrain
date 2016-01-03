/* SCEditor v1.4.7 | (C) 2015, Sam Clarke | sceditor.com/license */
!function (a, b, c) {
    "use strict";
    var d = a.sceditor, e = d.plugins, f = d.escapeEntities, g = d.escapeUriScheme, h = d.ie, i = h && 11 > h, j = d.command.get, k = {
        bold: {txtExec: ["[b]", "[/b]"]},
        italic: {txtExec: ["[i]", "[/i]"]},
        underline: {txtExec: ["[u]", "[/u]"]},
        strike: {txtExec: ["[s]", "[/s]"]},
        subscript: {txtExec: ["[sub]", "[/sub]"]},
        superscript: {txtExec: ["[sup]", "[/sup]"]},
        left: {txtExec: ["[left]", "[/left]"]},
        center: {txtExec: ["[center]", "[/center]"]},
        right: {txtExec: ["[right]", "[/right]"]},
        justify: {txtExec: ["[justify]", "[/justify]"]},
        font: {
            txtExec: function (a) {
                var b = this;
                j("font")._dropDown(b, a, function (a) {
                    b.insertText("[font=" + a + "]", "[/font]")
                })
            }
        },
        size: {
            txtExec: function (a) {
                var b = this;
                j("size")._dropDown(b, a, function (a) {
                    b.insertText("[size=" + a + "]", "[/size]")
                })
            }
        },
        color: {
            txtExec: function (a) {
                var b = this;
                j("color")._dropDown(b, a, function (a) {
                    b.insertText("[color=" + a + "]", "[/color]")
                })
            }
        },
        bulletlist: {
            txtExec: function (b, c) {
                var d = "";
                a.each(c.split(/\r?\n/), function () {
                    d += (d ? "\n" : "") + "[li]" + this + "[/li]"
                }), this.insertText("[ul]\n" + d + "\n[/ul]")
            }
        },
        orderedlist: {
            txtExec: function (b, c) {
                var d = "";
                a.each(c.split(/\r?\n/), function () {
                    d += (d ? "\n" : "") + "[li]" + this + "[/li]"
                }), e.bbcode.bbcode.get(""), this.insertText("[ol]\n" + d + "\n[/ol]")
            }
        },
        table: {txtExec: ["[table][tr][td]", "[/td][/tr][/table]"]},
        horizontalrule: {txtExec: ["[hr]"]},
        code: {txtExec: ["[code]", "[/code]"]},
        image: {
            txtExec: function (a, b) {
                var c = this, d = prompt(c._("Enter the image URL:"), b);
                d && c.insertText("[img]" + d + "[/img]")
            }
        },
        email: {
            txtExec: function (a, b) {
                var c = this, d = b && b.indexOf("@") > -1 ? null : b, e = prompt(c._("Enter the e-mail address:"), d ? "" : b), f = prompt(c._("Enter the displayed text:"), d || e) || e;
                e && c.insertText("[email=" + e + "]" + f + "[/email]")
            }
        },
        link: {
            txtExec: function (b, c) {
                var d = this, e = /^[a-z]+:\/\//i.test(a.trim(c)) ? null : c, f = prompt(d._("Enter URL:"), e ? "http://" : a.trim(c)), g = prompt(d._("Enter the displayed text:"), e || f) || f;
                f && d.insertText("[url=" + f + "]" + g + "[/url]")
            }
        },
        quote: {txtExec: ["[quote]", "[/quote]"]},
        youtube: {
            txtExec: function (a) {
                var b = this;
                j("youtube")._dropDown(b, a, function (a) {
                    b.insertText("[youtube]" + a + "[/youtube]")
                })
            }
        },
        rtl: {txtExec: ["[rtl]", "[/rtl]"]},
        ltr: {txtExec: ["[ltr]", "[/ltr]"]}
    }, l = function (a) {
        return a ? a.replace(/\\(.)/g, "$1").replace(/^(["'])(.*?)\1$/, "$2") : a
    }, m = function () {
        var a, b = arguments;
        return b[0].replace(/\{(\d+)\}/g, function (c, d) {
            return b[d - 0 + 1] !== a ? b[d - 0 + 1] : "{" + d + "}"
        })
    }, n = {OPEN: "open", CONTENT: "content", NEWLINE: "newline", CLOSE: "close"}, o = function (a, b, c, d, e, f) {
        var g = this;
        g.type = a, g.name = b, g.val = c, g.attrs = d || {}, g.children = e || [], g.closing = f || null
    };
    o.prototype = {
        clone: function (a) {
            var b = this;
            return new o(b.type, b.name, b.val, b.attrs, a ? b.children : [], b.closing ? b.closing.clone() : null)
        }, splitAt: function (b) {
            var c, d = this, e = 0, f = d.children.length;
            if ("number" != typeof b && (b = a.inArray(b, d.children)), 0 > b || b > f)return null;
            for (; f--;)f >= b ? e++ : f = 0;
            return c = d.clone(), c.children = d.children.splice(b, e), c
        }
    };
    var p = function (b) {
        if (!(this instanceof p))return new p(b);
        var d, g, j, k, m, q, r, s, t, u, v, w, x, y, z, A = this;
        d = function () {
            A.bbcodes = e.bbcode.bbcodes, A.opts = a.extend({}, p.defaults, b)
        }, A.tokenize = function (a) {
            var b, c, d, e = [], f = [{type: n.CLOSE, regex: /^\[\/[^\[\]]+\]/}, {
                type: n.OPEN,
                regex: /^\[[^\[\]]+\]/
            }, {type: n.NEWLINE, regex: /^(\r\n|\r|\n)/}, {type: n.CONTENT, regex: /^([^\[\r\n]+|\[)/}];
            f.reverse();
            a:for (; a.length;) {
                for (d = f.length; d--;)if (c = f[d].type, (b = a.match(f[d].regex)) && b[0]) {
                    e.push(g(c, b[0])), a = a.substr(b[0].length);
                    continue a
                }
                a.length && e.push(g(n.CONTENT, a)), a = ""
            }
            return e
        }, g = function (b, c) {
            var d, f, g, h = /\[([^\]\s=]+)(?:([^\]]+))?\]/, i = /\[\/([^\[\]]+)\]/;
            return b === n.OPEN && (d = c.match(h)) && (g = y(d[1]), d[2] && (d[2] = a.trim(d[2])) && (f = j(d[2]))), b === n.CLOSE && (d = c.match(i)) && (g = y(d[1])), b === n.NEWLINE && (g = "#newline"), g && (b !== n.OPEN && b !== n.CLOSE || e.bbcode.bbcodes[g]) || (b = n.CONTENT, g = "#"), new o(b, g, c, f)
        }, j = function (a) {
            var b, c = /([^\s=]+)=(?:(?:(["'])((?:\\\2|[^\2])*?)\2)|((?:.(?!\s\S+=))*.))/g, d = {};
            if ("=" === a.charAt(0) && a.indexOf("=", 1) < 0)d.defaultattr = l(a.substr(1)); else for ("=" === a.charAt(0) && (a = "defaultattr" + a); b = c.exec(a);)d[y(b[1])] = l(b[3]) || b[4];
            return d
        }, A.parse = function (a, b) {
            var c = k(A.tokenize(a)), d = A.opts;
            return d.fixInvalidChildren && t(c), d.removeEmptyTags && s(c), d.fixInvalidNesting && q(c), m(c, null, b), d.removeEmptyTags && s(c), c
        }, w = function (a, b, c) {
            for (var d = c.length; d--;)if (c[d].type === b && c[d].name === a)return !0;
            return !1
        }, r = function (b, c) {
            var d = b ? A.bbcodes[b.name] : {}, e = d.allowedChildren;
            return A.opts.fixInvalidChildren && e ? a.inArray(c.name || "#", e) > -1 : !0
        }, k = function (b) {
            for (var c, d, e, f, g, h, i, j = [], k = [], l = [], m = function () {
                return z(l)
            }, o = function (a) {
                m() ? m().children.push(a) : k.push(a)
            }, p = function (b) {
                return m() && (d = A.bbcodes[m().name]) && d.closedBy && a.inArray(b, d.closedBy) > -1
            }; c = b.shift();) {
                switch (i = b[0], c.type) {
                    case n.OPEN:
                        p(c.name) && l.pop(), o(c), d = A.bbcodes[c.name], d && d.isSelfClosing || !d.closedBy && !w(c.name, n.CLOSE, b) ? d && d.isSelfClosing || (c.type = n.CONTENT) : l.push(c);
                        break;
                    case n.CLOSE:
                        if (m() && c.name !== m().name && p("/" + c.name) && l.pop(), m() && c.name === m().name)m().closing = c, l.pop(); else if (w(c.name, n.OPEN, l)) {
                            for (; e = l.pop();) {
                                if (e.name === c.name) {
                                    e.closing = c;
                                    break
                                }
                                f = e.clone(), j.length > 1 && f.children.push(z(j)), j.push(f)
                            }
                            for (o(z(j)), g = j.length; g--;)l.push(j[g]);
                            j.length = 0
                        } else c.type = n.CONTENT, o(c);
                        break;
                    case n.NEWLINE:
                        m() && i && p((i.type === n.CLOSE ? "/" : "") + i.name) && (i.type !== n.CLOSE || i.name !== m().name) && (d = A.bbcodes[m().name], d && d.breakAfter ? l.pop() : d && d.isInline === !1 && A.opts.breakAfterBlock && d.breakAfter !== !1 && l.pop()), o(c);
                        break;
                    default:
                        o(c)
                }
                h = c
            }
            return k
        }, m = function (a, b, c) {
            var d, e, f, g, h, i, j, k, l = a.length;
            b && (g = A.bbcodes[b.name]);
            for (var o = l; o--;)if (d = a[o])if (d.type === n.NEWLINE) {
                if (e = o > 0 ? a[o - 1] : null, f = l - 1 > o ? a[o + 1] : null, k = !1, !c && g && g.isSelfClosing !== !0 && (e ? i || f || (g.isInline === !1 && A.opts.breakEndBlock && g.breakEnd !== !1 && (k = !0), g.breakEnd && (k = !0), i = k) : (g.isInline === !1 && A.opts.breakStartBlock && g.breakStart !== !1 && (k = !0), g.breakStart && (k = !0))), e && e.type === n.OPEN && (h = A.bbcodes[e.name]) && (c ? h.isInline === !1 && (k = !0) : (h.isInline === !1 && A.opts.breakAfterBlock && h.breakAfter !== !1 && (k = !0), h.breakAfter && (k = !0))), !c && !j && f && f.type === n.OPEN && (h = A.bbcodes[f.name]) && (h.isInline === !1 && A.opts.breakBeforeBlock && h.breakBefore !== !1 && (k = !0), h.breakBefore && (k = !0), j = k, k)) {
                    a.splice(o, 1);
                    continue
                }
                k && a.splice(o, 1), j = !1
            } else d.type === n.OPEN && m(d.children, d, c)
        }, q = function (b, c, d, e) {
            var f, g, h, i, j, k, l = function (a) {
                var b = A.bbcodes[a.name];
                return !b || b.isInline !== !1
            };
            for (c = c || [], e = e || b, g = 0; g < b.length; g++)if ((f = b[g]) && f.type === n.OPEN) {
                if (!l(f) && d && (h = z(c), k = h.splitAt(f), j = c.length > 1 ? c[c.length - 2].children : e, i = a.inArray(h, j), i > -1))return k.children.splice(a.inArray(f, k.children), 1), void j.splice(i + 1, 0, f, k);
                c.push(f), q(f.children, c, d || l(f), e), c.pop(f)
            }
        }, t = function (a, b) {
            for (var c, d, e = a.length; e--;)(c = a[e]) && (r(b, c) || (c.name = null, c.type = n.CONTENT, r(b, c) ? (d = [e + 1, 0].concat(c.children), c.closing && (c.closing.name = null, c.closing.type = n.CONTENT, d.push(c.closing)), e += d.length - 1, Array.prototype.splice.apply(a, d)) : b.children.splice(e, 1)), c.type === n.OPEN && t(c.children, c))
        }, s = function (b) {
            for (var c, d, e = function (a) {
                for (var b = a.length; b--;) {
                    var c = a[b].type;
                    if (c === n.OPEN || c === n.CLOSE)return !1;
                    if (c === n.CONTENT && /\S|\u00A0/.test(a[b].val))return !1
                }
                return !0
            }, f = b.length; f--;)(c = b[f]) && c.type === n.OPEN && (d = A.bbcodes[c.name], s(c.children), e(c.children) && d && !d.isSelfClosing && !d.allowsEmpty && b.splice.apply(b, a.merge([f, 1], c.children)))
        }, A.toHTML = function (a, b) {
            return u(A.parse(a, b), !0)
        }, u = function (b, d) {
            var g, j, k, l, m, o, p, q, r, s = [];
            for (q = function (a) {
                return (!a || (a.isHtmlInline !== g ? a.isHtmlInline : a.isInline)) !== !1
            }; b.length > 0;)if (j = b.shift()) {
                if (j.type === n.OPEN)r = j.children[j.children.length - 1] || {}, k = A.bbcodes[j.name], o = d && q(k), l = u(j.children, !1), k && k.html ? (q(k) || !q(A.bbcodes[r.name]) || k.isPreFormatted || k.skipLastLineBreak || i || (l += "<br />"), a.isFunction(k.html) ? m = k.html.call(A, j, j.attrs, l) : (j.attrs[0] = l, m = e.bbcode.formatBBCodeString(k.html, j.attrs))) : m = j.val + l + (j.closing ? j.closing.val : ""); else {
                    if (j.type === n.NEWLINE) {
                        if (!d) {
                            s.push("<br />");
                            continue
                        }
                        p || (s.push("<div>"), (8 > h || c.documentMode && c.documentMode < 8) && s.push(" ")), i || s.push("<br />"), b.length || s.push("<br />"), s.push("</div>\n"), p = !1;
                        continue
                    }
                    o = d, m = f(j.val, !0)
                }
                o && !p ? (s.push("<div>"), p = !0) : !o && p && (s.push("</div>\n"), p = !1), s.push(m)
            }
            return p && s.push("</div>\n"), s.join("")
        }, A.toBBCode = function (a, b) {
            return v(A.parse(a, b))
        }, v = function (a) {
            for (var b, c, d, e, f, g, h, i, j, k, l = []; a.length > 0;)if (b = a.shift())if (d = A.bbcodes[b.name], e = !(!d || d.isInline !== !1), f = d && d.isSelfClosing, h = e && A.opts.breakBeforeBlock && d.breakBefore !== !1 || d && d.breakBefore, i = e && !f && A.opts.breakStartBlock && d.breakStart !== !1 || d && d.breakStart, j = e && A.opts.breakEndBlock && d.breakEnd !== !1 || d && d.breakEnd, k = e && A.opts.breakAfterBlock && d.breakAfter !== !1 || d && d.breakAfter, g = (d ? d.quoteType : null) || A.opts.quoteType || p.QuoteType.auto, d || b.type !== n.OPEN)if (b.type === n.OPEN) {
                if (h && l.push("\n"), l.push("[" + b.name), b.attrs) {
                    b.attrs.defaultattr && (l.push("=", x(b.attrs.defaultattr, g, "defaultattr")), delete b.attrs.defaultattr);
                    for (c in b.attrs)b.attrs.hasOwnProperty(c) && l.push(" ", c, "=", x(b.attrs[c], g, c))
                }
                l.push("]"), i && l.push("\n"), b.children && l.push(v(b.children)), f || d.excludeClosing || (j && l.push("\n"), l.push("[/" + b.name + "]")), k && l.push("\n"), b.closing && f && l.push(b.closing.val)
            } else l.push(b.val); else l.push(b.val), b.children && l.push(v(b.children)), b.closing && l.push(b.closing.val);
            return l.join("")
        }, x = function (b, c, d) {
            var e = p.QuoteType, f = /\s|=/.test(b);
            return a.isFunction(c) ? c(b, d) : c === e.never || c === e.auto && !f ? b : '"' + b.replace("\\", "\\\\").replace('"', '\\"') + '"'
        }, z = function (a) {
            return a.length ? a[a.length - 1] : null
        }, y = function (a) {
            return a.toLowerCase()
        }, d()
    };
    p.QuoteType = {always: 1, never: 2, auto: 3}, p.defaults = {
        breakBeforeBlock: !1,
        breakStartBlock: !1,
        breakEndBlock: !1,
        breakAfterBlock: !0,
        removeEmptyTags: !0,
        fixInvalidNesting: !0,
        fixInvalidChildren: !0,
        quoteType: p.QuoteType.auto
    }, a.sceditorBBCodePlugin = e.bbcode = function () {
        var b, f, g, h, j = this;
        j.bbcodes = e.bbcode.bbcodes, j.stripQuotes = l;
        var n = {}, o = {}, q = {
            ul: ["li", "ol", "ul"],
            ol: ["li", "ol", "ul"],
            table: ["tr"],
            tr: ["td", "th"],
            code: ["br", "p", "div"]
        };
        j.init = function () {
            j.opts = this.opts, b(), this.commands = a.extend(!0, {}, k, this.commands), this.toBBCode = j.signalToSource, this.fromBBCode = j.signalToWysiwyg
        }, b = function () {
            a.each(j.bbcodes, function (b) {
                var c, d = j.bbcodes[b].tags, e = j.bbcodes[b].styles;
                d && a.each(d, function (a, d) {
                    c = j.bbcodes[b].isInline === !1, n[a] = n[a] || {}, n[a][c] = n[a][c] || {}, n[a][c][b] = d
                }), e && a.each(e, function (a, d) {
                    c = j.bbcodes[b].isInline === !1, o[c] = o[c] || {}, o[c][a] = o[c][a] || {}, o[c][a][b] = d
                })
            })
        }, f = function (b, c, e) {
            var f, g, h = d.dom.getStyle;
            return e = !!e, o[e] ? (a.each(o[e], function (d, e) {
                f = h(b[0], d), f && h(b.parent()[0], d) !== f && a.each(e, function (d, e) {
                    (!e || a.inArray(f.toString(), e) > -1) && (g = j.bbcodes[d].format, c = a.isFunction(g) ? g.call(j, b, c) : m(g, c))
                })
            }), c) : c
        }, g = function (b, c, e) {
            var f, g, h = b[0], k = h.nodeName.toLowerCase();
            e = !!e, n[k] && n[k][e] && a.each(n[k][e], function (d, e) {
                (!e || (f = !1, a.each(e, function (c, d) {
                    return !b.attr(c) || d && a.inArray(b.attr(c), d) < 0 ? void 0 : (f = !0, !1)
                }), f)) && (g = j.bbcodes[d].format, c = a.isFunction(g) ? g.call(j, b, c) : m(g, c))
            });
            var l = d.dom.isInline;
            if (e && (!l(h, !0) || "br" === k)) {
                for (var o, p, q, r = h.previousSibling; r && (a(r).hasClass("sceditor-ignore") || 1 === r.nodeType && !a(r).is("br") && l(r, !0) && !r.firstChild);)r = r.previousSibling;
                do {
                    for (p = h.parentNode, q = p.lastChild; a(q).hasClass("sceditor-ignore");)q = q.previousSibling;
                    o = q === h, h = p
                } while (p && o && l(p, !0));
                (!o || "li" === k || "br" === k && i) && (c += "\n"), "br" !== k && r && !a(r).is("br") && l(r, !0) && (c = "\n" + c)
            }
            return c
        }, j.signalToSource = function (b, e) {
            var f, g, h = new p(j.opts.parserOptions);
            return e || ("string" == typeof b ? (f = a("<div />").css("visibility", "hidden").appendTo(c.body).html(b), e = f) : e = a(b)), e && e.jquery ? (d.dom.removeWhiteSpace(e[0]), g = j.elementToBbcode(e), f && f.remove(), g = h.toBBCode(g, !0), j.opts.bbcodeTrim && (g = a.trim(g)), g) : ""
        }, j.elementToBbcode = function (b) {
            var c = function (b, e) {
                var h = "";
                return d.dom.traverse(b, function (b) {
                    var d = a(b), j = "", k = b.nodeType, l = b.nodeName.toLowerCase(), m = q[l], n = b.firstChild, o = !0;
                    if ("object" == typeof e && (o = a.inArray(l, e) > -1, d.is("img") && d.data("sceditor-emoticon") && (o = !0), o || (m = e)), 3 === k || 1 === k)if (1 === k) {
                        if (d.hasClass("sceditor-ignore"))return;
                        if (d.hasClass("sceditor-nlf") && (!n || !i && 1 === b.childNodes.length && /br/i.test(n.nodeName)))return;
                        "iframe" !== l && (j = c(b, m)), o ? ("code" !== l && (j = f(d, j), j = g(d, j), j = f(d, j, !0)), h += g(d, j, !0)) : h += j
                    } else h += b.nodeValue
                }, !1, !0), h
            };
            return c(b[0])
        }, j.signalToWysiwyg = function (b, c) {
            var d = new p(j.opts.parserOptions), e = d.toHTML(j.opts.bbcodeTrim ? a.trim(b) : b);
            return c ? h(e) : e
        }, h = function (b) {
            var e, f, g, h = a("<div />").hide().appendTo(c.body), j = h[0];
            return g = function (b, e) {
                if (!d.dom.hasStyling(b)) {
                    if (i || 1 !== b.childNodes.length || !a(b.firstChild).is("br"))for (; f = b.firstChild;)j.insertBefore(f, b);
                    if (e) {
                        var g = j.lastChild;
                        b !== g && a(g).is("div") && b.nextSibling === g && j.insertBefore(c.createElement("br"), b)
                    }
                    j.removeChild(b)
                }
            }, j.innerHTML = b.replace(/<\/div>\n/g, "</div>"), (e = j.firstChild) && a(e).is("div") && g(e, !0), (e = j.lastChild) && a(e).is("div") && g(e), j = j.innerHTML, h.remove(), j
        }
    }, e.bbcode.formatBBCodeString = function (a, b) {
        return a.replace(/\{([^}]+)\}/g, function (a, c) {
            var d, e = !0;
            return "!" === c.charAt(0) && (e = !1, c = c.substring(1)), "0" === c && (e = !1), b[c] === d ? a : e ? f(b[c], !0) : b[c]
        })
    };
    var q = function (a) {
        return a = parseInt(a, 10), isNaN(a) ? "00" : (a = Math.max(0, Math.min(a, 255)).toString(16), a.length < 2 ? "0" + a : a)
    }, r = function (a) {
        var b;
        return a = a || "#000", (b = a.match(/rgb\((\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\)/i)) ? "#" + q(b[1]) + q(b[2] - 0) + q(b[3] - 0) : (b = a.match(/#([0-f])([0-f])([0-f])\s*?$/i)) ? "#" + b[1] + b[1] + b[2] + b[2] + b[3] + b[3] : a
    }, s = {
        b: {
            tags: {b: null, strong: null},
            styles: {"font-weight": ["bold", "bolder", "401", "700", "800", "900"]},
            format: "[b]{0}[/b]",
            html: "<strong>{0}</strong>"
        },
        i: {
            tags: {i: null, em: null},
            styles: {"font-style": ["italic", "oblique"]},
            format: "[i]{0}[/i]",
            html: "<em>{0}</em>"
        },
        u: {tags: {u: null}, styles: {"text-decoration": ["underline"]}, format: "[u]{0}[/u]", html: "<u>{0}</u>"},
        s: {
            tags: {s: null, strike: null},
            styles: {"text-decoration": ["line-through"]},
            format: "[s]{0}[/s]",
            html: "<s>{0}</s>"
        },
        sub: {tags: {sub: null}, format: "[sub]{0}[/sub]", html: "<sub>{0}</sub>"},
        sup: {tags: {sup: null}, format: "[sup]{0}[/sup]", html: "<sup>{0}</sup>"},
        font: {
            tags: {font: {face: null}},
            styles: {"font-family": null},
            quoteType: p.QuoteType.never,
            format: function (a, b) {
                var c;
                return a.is("font") && (c = a.attr("face")) || (c = a.css("font-family")), "[font=" + l(c) + "]" + b + "[/font]"
            },
            html: '<font face="{defaultattr}">{0}</font>'
        },
        size: {
            tags: {font: {size: null}}, styles: {"font-size": null}, format: function (a, b) {
                var c = a.attr("size"), d = 2;
                return c || (c = a.css("fontSize")), c.indexOf("px") > -1 ? (c = c.replace("px", "") - 0, 12 > c && (d = 1), c > 15 && (d = 3), c > 17 && (d = 4), c > 23 && (d = 5), c > 31 && (d = 6), c > 47 && (d = 7)) : d = c, "[size=" + d + "]" + b + "[/size]"
            }, html: '<font size="{defaultattr}">{!0}</font>'
        },
        color: {
            tags: {font: {color: null}},
            styles: {color: null},
            quoteType: p.QuoteType.never,
            format: function (a, b) {
                var c;
                return a.is("font") && (c = a.attr("color")) || (c = a[0].style.color || a.css("color")), "[color=" + r(c) + "]" + b + "[/color]"
            },
            html: function (a, b, c) {
                return '<font color="' + f(r(b.defaultattr), !0) + '">' + c + "</font>"
            }
        },
        ul: {
            tags: {ul: null},
            breakStart: !0,
            isInline: !1,
            skipLastLineBreak: !0,
            format: "[ul]{0}[/ul]",
            html: "<ul>{0}</ul>"
        },
        list: {breakStart: !0, isInline: !1, skipLastLineBreak: !0, html: "<ul>{0}</ul>"},
        ol: {
            tags: {ol: null},
            breakStart: !0,
            isInline: !1,
            skipLastLineBreak: !0,
            format: "[ol]{0}[/ol]",
            html: "<ol>{0}</ol>"
        },
        li: {
            tags: {li: null},
            isInline: !1,
            closedBy: ["/ul", "/ol", "/list", "*", "li"],
            format: "[li]{0}[/li]",
            html: "<li>{0}</li>"
        },
        "*": {isInline: !1, closedBy: ["/ul", "/ol", "/list", "*", "li"], html: "<li>{0}</li>"},
        table: {
            tags: {table: null},
            isInline: !1,
            isHtmlInline: !0,
            skipLastLineBreak: !0,
            format: "[table]{0}[/table]",
            html: "<table>{0}</table>"
        },
        tr: {tags: {tr: null}, isInline: !1, skipLastLineBreak: !0, format: "[tr]{0}[/tr]", html: "<tr>{0}</tr>"},
        th: {tags: {th: null}, allowsEmpty: !0, isInline: !1, format: "[th]{0}[/th]", html: "<th>{0}</th>"},
        td: {tags: {td: null}, allowsEmpty: !0, isInline: !1, format: "[td]{0}[/td]", html: "<td>{0}</td>"},
        emoticon: {
            allowsEmpty: !0, tags: {img: {src: null, "data-sceditor-emoticon": null}}, format: function (a, b) {
                return a.data("sceditor-emoticon") + b
            }, html: "{0}"
        },
        hr: {tags: {hr: null}, allowsEmpty: !0, isSelfClosing: !0, isInline: !1, format: "[hr]{0}", html: "<hr />"},
        img: {
            allowsEmpty: !0,
            tags: {img: {src: null}},
            allowedChildren: ["#"],
            quoteType: p.QuoteType.never,
            format: function (a, b) {
                var c, d, e = "", f = a[0], g = function (a) {
                    return f.style ? f.style[a] : null
                };
                return a.attr("data-sceditor-emoticon") ? b : (c = a.attr("width") || g("width"), d = a.attr("height") || g("height"), (f.complete && (c || d) || c && d) && (e = "=" + a.width() + "x" + a.height()), "[img" + e + "]" + a.attr("src") + "[/img]")
            },
            html: function (a, b, c) {
                var d, e, h, i, j = "";
                return e = b.width, h = b.height, b.defaultattr && (i = b.defaultattr.split(/x/i), e = i[0], h = 2 === i.length ? i[1] : i[0]), e !== d && (j += ' width="' + f(e, !0) + '"'), h !== d && (j += ' height="' + f(h, !0) + '"'), "<img" + j + ' src="' + g(c) + '" />'
            }
        },
        url: {
            allowsEmpty: !0, tags: {a: {href: null}}, quoteType: p.QuoteType.never, format: function (a, b) {
                var c = a.attr("href");
                return "mailto:" === c.substr(0, 7) ? '[email="' + c.substr(7) + '"]' + b + "[/email]" : "[url=" + c + "]" + b + "[/url]"
            }, html: function (a, b, c) {
                return b.defaultattr = f(b.defaultattr, !0) || c, '<a href="' + g(b.defaultattr) + '">' + c + "</a>"
            }
        },
        email: {
            quoteType: p.QuoteType.never, html: function (a, b, c) {
                return '<a href="mailto:' + (f(b.defaultattr, !0) || c) + '">' + c + "</a>"
            }
        },
        quote: {
            tags: {blockquote: null}, isInline: !1, quoteType: p.QuoteType.never, format: function (b, c) {
                var d = "", e = a(b), f = e.children("cite").first();
                return (1 === f.length || e.data("author")) && (d = f.text() || e.data("author"), e.data("author", d), f.remove(), c = this.elementToBbcode(a(b)), d = "=" + d.replace(/(^\s+|\s+$)/g, ""), e.prepend(f)), "[quote" + d + "]" + c + "[/quote]"
            }, html: function (a, b, c) {
                return b.defaultattr && (c = "<cite>" + f(b.defaultattr) + "</cite>" + c), "<blockquote>" + c + "</blockquote>"
            }
        },
        code: {
            tags: {code: null},
            isInline: !1,
            allowedChildren: ["#", "#newline"],
            format: "[code]{0}[/code]",
            html: "<code>{0}</code>"
        },
        left: {
            styles: {"text-align": ["left", "-webkit-left", "-moz-left", "-khtml-left"]},
            isInline: !1,
            format: "[left]{0}[/left]",
            html: '<div align="left">{0}</div>'
        },
        center: {
            styles: {"text-align": ["center", "-webkit-center", "-moz-center", "-khtml-center"]},
            isInline: !1,
            format: "[center]{0}[/center]",
            html: '<div align="center">{0}</div>'
        },
        right: {
            styles: {"text-align": ["right", "-webkit-right", "-moz-right", "-khtml-right"]},
            isInline: !1,
            format: "[right]{0}[/right]",
            html: '<div align="right">{0}</div>'
        },
        justify: {
            styles: {"text-align": ["justify", "-webkit-justify", "-moz-justify", "-khtml-justify"]},
            isInline: !1,
            format: "[justify]{0}[/justify]",
            html: '<div align="justify">{0}</div>'
        },
        youtube: {
            allowsEmpty: !0,
            tags: {iframe: {"data-youtube-id": null}},
            format: function (a, b) {
                return a = a.attr("data-youtube-id"), a ? "[youtube]" + a + "[/youtube]" : b
            },
            html: '<iframe width="560" height="315" frameborder="0" src="http://www.youtube.com/embed/{0}?wmode=opaque" data-youtube-id="{0}" allowfullscreen></iframe>'
        },
        rtl: {styles: {direction: ["rtl"]}, format: "[rtl]{0}[/rtl]", html: '<div style="direction: rtl">{0}</div>'},
        ltr: {styles: {direction: ["ltr"]}, format: "[ltr]{0}[/ltr]", html: '<div style="direction: ltr">{0}</div>'},
        ignore: {}
    };
    e.bbcode.bbcode = {
        get: function (a) {
            return s[a] || null
        }, set: function (b, c) {
            return b && c ? (c = a.extend(s[b] || {}, c), c.remove = function () {
                delete s[b]
            }, s[b] = c, this) : !1
        }, rename: function (a, b) {
            return a in s ? (s[b] = s[a], delete s[a], this) : !1
        }, remove: function (a) {
            return a in s && delete s[a], this
        }
    }, a.fn.sceditorBBCodePlugin = function (b) {
        return b = b || {}, a.isPlainObject(b) && (b.plugins = (b.plugins || "") + "bbcode"), this.sceditor(b)
    }, e.bbcode.normaliseColour = r, e.bbcode.formatString = m, e.bbcode.stripQuotes = l, e.bbcode.bbcodes = s, d.BBCodeParser = p
}(jQuery, window, document);