// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var t;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p;
var v;
var y;
var d = {};
var w = [];
var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g = Array.isArray;
function m(n2, l3) {
  for (var u4 in l3) n2[u4] = l3[u4];
  return n2;
}
function b(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function k(l3, u4, t3) {
  var i3, r3, o3, e3 = {};
  for (o3 in u4) "key" == o3 ? i3 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
  if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
  return x(l3, e3, i3, r3, null);
}
function x(n2, t3, i3, r3, o3) {
  var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
  return null == o3 && null != l.vnode && l.vnode(e3), e3;
}
function S(n2) {
  return n2.children;
}
function C(n2, l3) {
  this.props = n2, this.context = l3;
}
function $(n2, l3) {
  if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
  for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
  return "function" == typeof n2.type ? $(n2) : null;
}
function I(n2) {
  if (n2.__P && n2.__d) {
    var u4 = n2.__v, t3 = u4.__e, i3 = [], r3 = [], o3 = m({}, u4);
    o3.__v = u4.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u4, n2.__n, n2.__P.namespaceURI, 32 & u4.__u ? [t3] : null, i3, null == t3 ? $(u4) : t3, !!(32 & u4.__u), r3), o3.__v = u4.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u4.__e = u4.__ = null, o3.__e != t3 && P(o3);
  }
}
function P(n2) {
  if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
    if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
  }), P(n2);
}
function A(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
}
function H() {
  try {
    for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
  } finally {
    i.length = H.__r = 0;
  }
}
function L(n2, l3, u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, _2, g2, m3 = t3 && t3.__k || w, b2 = l3.length;
  for (f4 = T(u4, l3, m3, f4, b2), a3 = 0; a3 < b2; a3++) null != (p3 = u4.__k[a3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = a3, _2 = q(n2, p3, h3, i3, r3, o3, e3, f4, c3, s3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), s3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g2 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f4 = j(p3, f4, n2, g2), g2 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _2 ? f4 = _2 : v3 && (f4 = v3.nextSibling), p3.__u &= -7);
  return u4.__e = y3, f4;
}
function T(n2, l3, u4, t3, i3) {
  var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
  for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > s3 ? h3-- : i3 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
  if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
  return t3;
}
function j(n2, l3, u4, t3) {
  var i3, r3;
  if ("function" == typeof n2.type) {
    for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = j(i3[r3], l3, u4, t3));
    return l3;
  }
  n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 == l3.nodeType);
  return l3;
}
function O(n2, l3, u4, t3) {
  var i3, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
  if (null === c3 && null == e3 || s3 && e3 == c3.key && f4 == c3.type) return u4;
  if (t3 > (s3 ? 1 : 0)) {
    for (i3 = u4 - 1, r3 = u4 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
  }
  return -1;
}
function z(n2, l3, u4) {
  "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || _.test(l3) ? u4 : u4 + "px";
}
function N(n2, l3, u4, t3, i3) {
  var r3, o3;
  n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
  else {
    if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || z(n2.style, l3, "");
    if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || z(n2.style, l3, u4[l3]);
  }
  else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(a, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4[s] = t3[s] : (u4[s] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
  else {
    if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
      n2[l3] = null == u4 ? "" : u4;
      break n;
    } catch (n3) {
    }
    "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
  }
}
function V(n2) {
  return function(u4) {
    if (this.l) {
      var t3 = this.l[u4.type + n2];
      if (null == u4[c]) u4[c] = h++;
      else if (u4[c] < t3[s]) return;
      return t3(l.event ? l.event(u4) : u4);
    }
  };
}
function q(n2, u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, d3, _2, k3, x2, M, $2, I2, P2, A3, H2, T3 = u4.type;
  if (void 0 !== u4.constructor) return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
  n: if ("function" == typeof T3) try {
    if (k3 = u4.props, x2 = T3.prototype && T3.prototype.render, M = (a3 = T3.contextType) && i3[a3.__c], $2 = a3 ? M ? M.props.value : a3.__ : i3, t3.__c ? _2 = (h3 = u4.__c = t3.__c).__ = h3.__E : (x2 ? u4.__c = h3 = new T3(k3, $2) : (u4.__c = h3 = new C(k3, $2), h3.constructor = T3, h3.render = Q), M && M.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x2 && null == h3.__s && (h3.__s = h3.state), x2 && null != T3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T3.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) x2 && null == T3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
    else {
      if (x2 && null == T3.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $2), u4.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $2)) {
        u4.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
          n3 && (n3.__ = u4);
        }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
        break n;
      }
      null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $2), x2 && null != h3.componentDidUpdate && h3.__h.push(function() {
        h3.componentDidUpdate(v3, y3, d3);
      });
    }
    if (h3.context = $2, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P2 = 0, x2) h3.state = h3.__s, h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
    else do {
      h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
    } while (h3.__d && ++P2 < 25);
    h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x2 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A3 = null != a3 && a3.type === S && null == a3.key ? E(a3.props.children) : a3, f4 = L(n2, g(A3) ? A3 : [A3], u4, t3, i3, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), _2 && (h3.__E = h3.__ = null);
  } catch (n3) {
    if (u4.__v = null, c3 || null != o3) if (n3.then) {
      for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
      o3[o3.indexOf(f4)] = null, u4.__e = f4;
    } else {
      for (H2 = o3.length; H2--; ) b(o3[H2]);
      B(u4);
    }
    else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || B(u4);
    l.__e(n3, u4, t3);
  }
  else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = G(t3.__e, u4, t3, i3, r3, o3, e3, c3, s3);
  return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
}
function B(n2) {
  n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
}
function D(n2, u4, t3) {
  for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
  l.__c && l.__c(u4, n2), n2.some(function(u5) {
    try {
      n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
        n3.call(u5);
      });
    } catch (n3) {
      l.__e(n3, u5.__v);
    }
  });
}
function E(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : m({}, n2);
}
function G(u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, w3, _2, m3 = i3.props || d, k3 = t3.props, x2 = t3.type;
  if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
    for (a3 = 0; a3 < e3.length; a3++) if ((y3 = e3[a3]) && "setAttribute" in y3 == !!x2 && (x2 ? y3.localName == x2 : 3 == y3.nodeType)) {
      u4 = y3, e3[a3] = null;
      break;
    }
  }
  if (null == u4) {
    if (null == x2) return document.createTextNode(k3);
    u4 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
  }
  if (null == x2) m3 === k3 || c3 && u4.data == k3 || (u4.data = k3);
  else {
    if (e3 = e3 && n.call(u4.childNodes), !c3 && null != e3) for (m3 = {}, a3 = 0; a3 < u4.attributes.length; a3++) m3[(y3 = u4.attributes[a3]).name] = y3.value;
    for (a3 in m3) y3 = m3[a3], "dangerouslySetInnerHTML" == a3 ? p3 = y3 : "children" == a3 || a3 in k3 || "value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3 || N(u4, a3, null, y3, o3);
    for (a3 in k3) y3 = k3[a3], "children" == a3 ? v3 = y3 : "dangerouslySetInnerHTML" == a3 ? h3 = y3 : "value" == a3 ? w3 = y3 : "checked" == a3 ? _2 = y3 : c3 && "function" != typeof y3 || m3[a3] === y3 || N(u4, a3, y3, m3[a3], o3);
    if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
    else if (p3 && (u4.innerHTML = ""), L("template" == t3.type ? u4.content : u4, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i3.__k && $(i3, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) b(e3[a3]);
    c3 || (a3 = "value", "progress" == x2 && null == w3 ? u4.removeAttribute("value") : null != w3 && (w3 !== u4[a3] || "progress" == x2 && !w3 || "option" == x2 && w3 != m3[a3]) && N(u4, a3, w3, m3[a3], o3), a3 = "checked", null != _2 && _2 != u4[a3] && N(u4, a3, _2, m3[a3], o3));
  }
  return u4;
}
function J(n2, u4, t3) {
  try {
    if ("function" == typeof n2) {
      var i3 = "function" == typeof n2.__u;
      i3 && n2.__u(), i3 && null == u4 || (n2.__u = n2(u4));
    } else n2.current = u4;
  } catch (n3) {
    l.__e(n3, t3);
  }
}
function K(n2, u4, t3) {
  var i3, r3;
  if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u4)), null != (i3 = n2.__c)) {
    if (i3.componentWillUnmount) try {
      i3.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u4);
    }
    i3.base = i3.__P = null;
  }
  if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u4, t3 || "function" != typeof n2.type);
  t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function Q(n2, l3, u4) {
  return this.constructor(n2, u4);
}
function R(u4, t3, i3) {
  var r3, o3, e3, f4;
  t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f4 = [], q(t3, u4 = (!r3 && i3 || t3).__k = k(S, null, [u4]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f4), D(e3, u4, f4);
}
n = w.slice, l = { __e: function(n2, l3, u4, t3) {
  for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
    if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
  } catch (l4) {
    n2 = l4;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, C.prototype.setState = function(n2, l3) {
  var u4;
  u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u4), this.props)), n2 && m(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
}, C.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
}, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
  return n2.__v.__b - l3.__v.__b;
}, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, s = "__a" + f, a = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;

// node_modules/preact/hooks/dist/hooks.module.js
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = l;
var e2 = c2.__b;
var a2 = c2.__r;
var v2 = c2.diffed;
var l2 = c2.__c;
var m2 = c2.unmount;
var s2 = c2.__;
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u4, i3) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u4) : D2(void 0, u4), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f4 = function(n3, t3, r3) {
      if (!o3.__c.__H) return true;
      var u5 = o3.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u5.every(function(n4) {
        return !n4.__N;
      })) return !c3 || c3.call(this, n3, t3, r3);
      var i4 = o3.__c.props !== n3;
      return u5.some(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i4;
    };
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u5 = c3;
        c3 = void 0, f4(n3, t3, r3), c3 = u5;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f4;
  }
  return o3.__N || o3.__;
}
function y2(n2, u4) {
  var i3 = p2(t2++, 3);
  !c2.__s && C2(i3.__H, u4) && (i3.__ = n2, i3.u = u4, r2.__H.__h.push(i3));
}
function A2(n2) {
  return o2 = 5, T2(function() {
    return { current: n2 };
  }, []);
}
function T2(n2, r3) {
  var u4 = p2(t2++, 7);
  return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
}
function q2(n2, t3) {
  return o2 = 8, T2(function() {
    return n2;
  }, t3);
}
function j2() {
  for (var n2; n2 = f2.shift(); ) {
    var t3 = n2.__H;
    if (n2.__P && t3) try {
      t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
    } catch (r3) {
      t3.__h = [], c2.__e(r3, n2.__v);
    }
  }
}
c2.__b = function(n2) {
  r2 = null, e2 && e2(n2);
}, c2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
}, c2.__r = function(n2) {
  a2 && a2(n2), t2 = 0;
  var i3 = (r2 = n2.__c).__H;
  i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
}, c2.diffed = function(n2) {
  v2 && v2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u2 = r2 = null;
}, c2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], c2.__e(r3, n3.__v);
    }
  }), l2 && l2(n2, t3);
}, c2.unmount = function(n2) {
  m2 && m2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.some(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// client/src/api/client.ts
var ApiError = class extends Error {
  status;
  code;
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
};
async function parseJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
async function fetchHealth() {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
function pingServer() {
  void fetch("/api/ping", { method: "POST", keepalive: true }).catch(() => {
  });
}
async function requestServerShutdown() {
  try {
    const res = await fetch("/api/shutdown", { method: "POST", keepalive: true });
    return res.ok;
  } catch {
    return false;
  }
}
async function fetchWords() {
  const res = await fetch("/api/words");
  const data = await parseJson(res);
  if (!res.ok) {
    const msg = data?.error || "\u5358\u8A9E\u30EA\u30B9\u30C8\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F";
    throw new ApiError(msg, res.status, data?.code);
  }
  if (!data?.words?.length) throw new ApiError("\u5358\u8A9E\u30C7\u30FC\u30BF\u304C\u7A7A\u3067\u3059", res.status);
  return data.words;
}
async function fetchRanking(mode) {
  const res = await fetch(`/api/ranking/${mode}`);
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u30E9\u30F3\u30AD\u30F3\u30B0\u53D6\u5F97\u30A8\u30E9\u30FC", res.status);
  return data?.items || [];
}
async function postEndlessRanking(name, score, wave) {
  const res = await fetch("/api/ranking/endless", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, wave })
  });
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F", res.status);
  return data.items || [];
}
async function postStoryRanking(name, accuracy, time_sec) {
  const res = await fetch("/api/ranking/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, accuracy, time_sec })
  });
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F", res.status);
  return data.items || [];
}
async function unlockAchievement(id) {
  const res = await fetch("/api/saves/achievement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  const data = await parseJson(res);
  if (!res.ok || !data) throw new ApiError("\u5B9F\u7E3E\u306E\u4FDD\u5B58\u306B\u5931\u6557", res.status);
  return data;
}

// client/src/game/monster.ts
var ENEMY_SKIN_COUNT = 6;
var RARE_SPAWN_CHANCE = 0.12;
var _id = 0;
function nextMonsterId() {
  _id += 1;
  return `m-${_id}`;
}
function pickSkinIndex() {
  return 1 + Math.floor(Math.random() * ENEMY_SKIN_COUNT);
}
function spawnMonster(word, playWidth, waveGlobal, isBoss, lane) {
  const speed = Math.min(200, 40 + waveGlobal * 3);
  const maxHp = isBoss ? 3 : 1;
  const isRare = !isBoss && Math.random() < RARE_SPAWN_CHANCE;
  return {
    id: nextMonsterId(),
    word,
    x: playWidth - 24,
    lane,
    hp: maxHp,
    maxHp,
    isBoss,
    speed,
    skinIndex: isBoss ? pickSkinIndex() : pickSkinIndex(),
    isRare
  };
}
function monsterImagePath(m3) {
  if (m3.isRare) return "/assets/enemies/rare.png";
  return `/assets/enemies/${m3.skinIndex}.png`;
}

// client/src/game/word_manager.ts
function inRange(len, minL, maxL) {
  return len >= minL && len <= maxL;
}
function pickWord(words, W) {
  const minLen = Math.min(12, 3 + Math.floor(W / 10));
  const maxLen = Math.min(15, 5 + Math.floor(W / 8));
  const pool = words.filter((r3) => inRange(r3.word.length, minLen, maxLen));
  const use = pool.length > 0 ? pool : words;
  const i3 = Math.floor(Math.random() * use.length);
  return use[i3].word;
}

// client/src/game/scoring.ts
function killScore(wordLen, combo, isBoss, isRare) {
  const base = 100 + wordLen * 20;
  let mult = 1 + Math.min(5, combo) * 0.12;
  if (isBoss) mult *= 3;
  if (isRare) mult *= 2.25;
  return Math.floor(base * mult);
}

// client/src/game/engine.ts
var FORTRESS_X = 44;
var ANNOUNCE_SEC = 3;
var INTERWAVE_SEC = 5;
var INITIAL_HP = 3;
var AIM_TOLERANCE_PX = 88;
var AIM_Y_TOLERANCE_PX = 46;
function laneCenterYpx(lane, playHeight) {
  return (18 + lane * 16) / 100 * playHeight;
}
function maxConcurrent(W) {
  return Math.min(8, Math.ceil(W / 5) + 1);
}
function spawnIntervalSec(W) {
  return Math.max(0.8, 3 - W * 0.05);
}
function monstersInWave(W) {
  return Math.min(40, 6 + W * 2);
}
var GameEngine = class {
  mode;
  stage;
  words;
  startTime = Date.now();
  phase = "announce";
  phaseTimer = ANNOUNCE_SEC;
  announceLabel = "";
  fortressHp = INITIAL_HP;
  maxHp = INITIAL_HP;
  waveInStage = 1;
  waveGlobal = 0;
  monsters = [];
  spawnTimer = 0;
  pendingSpawns = 0;
  bossSpawnedThisWave = false;
  inputBuffer = "";
  targetId = null;
  crosshairX = 400;
  crosshairY = 200;
  score = 0;
  combo = 0;
  totalTyped = 0;
  correctTyped = 0;
  missesThisWave = 0;
  paused = false;
  killTimes = [];
  totalWavesCleared = 0;
  lastWaveWasPerfect = false;
  /** 撃破演出用（タイピングは step 外で消えるため差分検出では拾えない） */
  defeatFxQueue = [];
  needBoss = false;
  /** 直近で倒した敵のスナップ（位置・見た目用）。取り出し後は空になる。 */
  pullDefeatFxMonsters() {
    const out = this.defeatFxQueue;
    this.defeatFxQueue = [];
    return out;
  }
  constructor(mode, startStage, words) {
    this.mode = mode;
    this.stage = mode === "story" ? startStage : 1;
    this.words = words;
    this.beginAnnounce();
  }
  pickSpawnLane() {
    const counts = [0, 0, 0, 0];
    for (const m3 of this.monsters) counts[m3.lane] += 1;
    let best = 0;
    for (let i3 = 1; i3 < 4; i3++) {
      if (counts[i3] < counts[best]) best = i3;
    }
    return best;
  }
  monsterUnderCrosshair(playWidth, playHeight) {
    const cx = this.crosshairX;
    const cy = this.crosshairY;
    let best = null;
    let bestD = 1e9;
    for (const m3 of this.monsters) {
      const my = laneCenterYpx(m3.lane, playHeight);
      const dx = Math.abs(m3.x - cx);
      const dy = Math.abs(cy - my);
      if (dx < AIM_TOLERANCE_PX && dy < AIM_Y_TOLERANCE_PX) {
        const d3 = dx + dy * 1.1;
        if (d3 < bestD) {
          best = m3;
          bestD = d3;
        }
      }
    }
    return best;
  }
  hoverTargetId(playWidth, playHeight) {
    if (this.targetId !== null) return null;
    return this.monsterUnderCrosshair(playWidth, playHeight)?.id ?? null;
  }
  /** Smooth aim: deltaX / deltaY in pixels. */
  moveCrosshair(deltaX, deltaY, playWidth, playHeight) {
    if (this.phase !== "playing" || this.paused) return;
    if (this.targetId !== null) return;
    const minX = FORTRESS_X + 56;
    const maxX = Math.max(minX + 40, playWidth - 32);
    const marginY = Math.max(20, playHeight * 0.06);
    this.crosshairX = Math.max(minX, Math.min(maxX, this.crosshairX + deltaX));
    this.crosshairY = Math.max(marginY, Math.min(playHeight - marginY, this.crosshairY + deltaY));
  }
  tryBeginTyping(playWidth, playHeight) {
    if (this.phase !== "playing" || this.paused) return false;
    if (this.targetId !== null) return false;
    const m3 = this.monsterUnderCrosshair(playWidth, playHeight);
    if (!m3) return false;
    this.targetId = m3.id;
    this.inputBuffer = "";
    return true;
  }
  cancelTyping() {
    this.inputBuffer = "";
    this.targetId = null;
  }
  snapshot(playWidth, playHeight) {
    return {
      phase: this.phase,
      phaseTimer: this.phaseTimer,
      announceLabel: this.announceLabel,
      fortressHp: this.fortressHp,
      maxHp: this.maxHp,
      waveInStage: this.waveInStage,
      waveGlobal: this.waveGlobal,
      stage: this.stage,
      mode: this.mode,
      monsters: this.monsters.map((m3) => ({ ...m3 })),
      inputBuffer: this.inputBuffer,
      targetId: this.targetId,
      hoverTargetId: this.hoverTargetId(playWidth, playHeight),
      crosshairX: this.crosshairX,
      crosshairY: this.crosshairY,
      score: this.score,
      combo: this.combo,
      totalTyped: this.totalTyped,
      correctTyped: this.correctTyped,
      missesThisWave: this.missesThisWave,
      paused: this.paused,
      reachedWave: this.waveGlobal,
      killTimes: [...this.killTimes],
      pendingSpawns: this.pendingSpawns,
      totalWavesCleared: this.totalWavesCleared,
      lastWaveWasPerfect: this.lastWaveWasPerfect
    };
  }
  togglePause() {
    if (this.phase !== "playing" && this.phase !== "paused") return;
    if (this.phase === "paused") {
      this.phase = "playing";
      this.paused = false;
    } else {
      this.phase = "paused";
      this.paused = true;
    }
  }
  beginAnnounce() {
    this.waveGlobal += 1;
    this.needBoss = this.waveGlobal > 0 && this.waveGlobal % 5 === 0;
    this.bossSpawnedThisWave = false;
    if (this.mode === "story") {
      this.announceLabel = `WAVE ${this.waveInStage} / 10 \u2014 STAGE ${this.stage}`;
    } else {
      this.announceLabel = `WAVE ${this.waveGlobal}`;
    }
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.inputBuffer = "";
    this.targetId = null;
    this.missesThisWave = 0;
  }
  startPlaying(playWidth, playHeight) {
    this.phase = "playing";
    this.paused = false;
    const W = this.waveGlobal;
    this.pendingSpawns = monstersInWave(W);
    this.spawnTimer = 0;
    this.monsters = [];
    this.crosshairX = Math.min(playWidth * 0.62, playWidth - 80);
    this.crosshairY = laneCenterYpx(1, playHeight);
    this.targetId = null;
    this.inputBuffer = "";
    this.spawnNext(playWidth);
  }
  spawnNext(playWidth) {
    if (this.pendingSpawns <= 0) return;
    const W = this.waveGlobal;
    if (this.monsters.length >= maxConcurrent(W)) return;
    const isBoss = this.needBoss && !this.bossSpawnedThisWave;
    const word = pickWord(this.words, W);
    const lane = this.pickSpawnLane();
    const m3 = spawnMonster(word, playWidth, W, isBoss, lane);
    this.monsters.push(m3);
    this.pendingSpawns -= 1;
    if (isBoss) this.bossSpawnedThisWave = true;
    this.spawnTimer = spawnIntervalSec(W);
  }
  keyDown(key, now, playWidth) {
    if (this.phase !== "playing" || this.paused) return;
    if (!this.targetId) return;
    if (key.length !== 1) return;
    const ch = key.toLowerCase();
    if (ch < "a" || ch > "z") return;
    const mon = this.monsters.find((m3) => m3.id === this.targetId);
    if (!mon) {
      this.targetId = null;
      this.inputBuffer = "";
      return;
    }
    const next = this.inputBuffer + ch;
    this.totalTyped += 1;
    const word = mon.word.toLowerCase();
    if (!word.startsWith(next)) {
      this.missesThisWave += 1;
      this.combo = 0;
      this.inputBuffer = "";
      return;
    }
    if (word === next) {
      this.correctTyped += 1;
      this.applyKill(mon, now);
      this.inputBuffer = "";
      this.targetId = null;
      return;
    }
    this.correctTyped += 1;
    this.inputBuffer = next;
  }
  applyKill(m3, now) {
    if (m3.isBoss && m3.hp > 1) {
      const idx = this.monsters.findIndex((x2) => x2.id === m3.id);
      if (idx >= 0) {
        this.monsters[idx] = { ...m3, hp: m3.hp - 1 };
      }
      return;
    }
    const isBoss = m3.isBoss;
    const len = m3.word.length;
    this.score += killScore(len, this.combo, isBoss, m3.isRare);
    this.combo += 1;
    this.killTimes.push(now);
    this.killTimes = this.killTimes.filter((t3) => now - t3 <= 5e3);
    this.defeatFxQueue.push({ ...m3 });
    this.monsters = this.monsters.filter((x2) => x2.id !== m3.id);
  }
  step(dt, now, playWidth, playHeight) {
    if (this.phase === "gameover" || this.phase === "ending") return;
    if (this.phase === "announce") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.startPlaying(playWidth, playHeight);
      return;
    }
    if (this.phase === "interwave") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.beginAnnounce();
      }
      return;
    }
    if (this.phase === "paused") return;
    if (this.phase !== "playing") return;
    if (this.targetId && !this.monsters.some((m3) => m3.id === this.targetId)) {
      this.targetId = null;
      this.inputBuffer = "";
    }
    this.spawnTimer -= dt;
    while (this.pendingSpawns > 0 && this.spawnTimer <= 0 && this.monsters.length < maxConcurrent(this.waveGlobal)) {
      this.spawnNext(playWidth);
    }
    const left = [];
    for (const m3 of this.monsters) {
      const nx = m3.x - m3.speed * dt;
      if (nx <= FORTRESS_X) {
        this.fortressHp -= 1;
        this.combo = 0;
        if (m3.id === this.targetId) {
          this.targetId = null;
          this.inputBuffer = "";
        }
        this.defeatFxQueue.push({ ...m3, x: Math.max(FORTRESS_X + 4, nx) });
        if (this.fortressHp <= 0) {
          this.phase = "gameover";
          return;
        }
        continue;
      }
      left.push({ ...m3, x: nx });
    }
    this.monsters = left;
    if (this.pendingSpawns <= 0 && this.monsters.length === 0) {
      this.totalWavesCleared += 1;
      this.lastWaveWasPerfect = this.missesThisWave === 0;
      if (this.mode === "story" && this.waveInStage === 10) {
        if (this.stage < 5) {
          this.stage += 1;
          this.waveInStage = 1;
        } else {
          this.phase = "ending";
          return;
        }
      } else {
        this.waveInStage += 1;
      }
      this.phase = "interwave";
      this.phaseTimer = INTERWAVE_SEC;
    }
  }
};

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f3 = 0;
function u3(e3, t3, n2, o3, i3, u4) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
}

// client/src/ui/ControlsHelp.tsx
var LINES = {
  title: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u30E1\u30CB\u30E5\u30FC\u79FB\u52D5",
    "Enter \u3067\u6C7A\u5B9A",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u540C\u3058\u64CD\u4F5C\u304C\u3067\u304D\u307E\u3059"
  ],
  stage: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u30B9\u30C6\u30FC\u30B8\u3092\u9078\u629E",
    "Enter \u3067\u958B\u59CB \xB7 Esc \u3067\u30BF\u30A4\u30C8\u30EB\u3078",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ],
  game: [
    "WASD / \u77E2\u5370\uFF08\u9577\u62BC\u3057\u53EF\uFF09\u3067\u7167\u6E96\u3092\u4E0A\u4E0B\u5DE6\u53F3\u306B\u6ED1\u3089\u304B\u306B\u79FB\u52D5",
    "Enter \u3067\u6575\u3092\u30ED\u30C3\u30AF\u3057\u3066\u30BF\u30A4\u30D4\u30F3\u30B0\u958B\u59CB",
    "Backspace \u3067\u5165\u529B\u30AD\u30E3\u30F3\u30BB\u30EB\uFF06\u30ED\u30C3\u30AF\u89E3\u9664",
    "Esc \u3067\u30DD\u30FC\u30BA"
  ],
  game_pause: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u9805\u76EE\u9078\u629E",
    "Enter \u3067\u6C7A\u5B9A",
    "Esc \u3067\u3082\u518D\u958B\u3067\u304D\u307E\u3059",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ],
  ranking: [
    "Tab \u307E\u305F\u306F \u2190 \u2192\uFF08A / D\uFF09\u3067\u30BF\u30D6\u5207\u66FF",
    "Enter \u307E\u305F\u306F Esc \u3067\u30BF\u30A4\u30C8\u30EB\u3078",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u30BF\u30D6\u3092\u5207\u308A\u66FF\u3048\u3089\u308C\u307E\u3059"
  ],
  result: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u9805\u76EE\u9078\u629E",
    "Enter \u3067\u6C7A\u5B9A",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ]
};
function ControlsHelp({
  variant,
  className = ""
}) {
  const lines = LINES[variant];
  return /* @__PURE__ */ u3(
    "aside",
    {
      class: `rounded-lg border border-slate-600/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 shadow-lg ${className}`,
      "aria-label": "\u64CD\u4F5C\u65B9\u6CD5",
      children: [
        /* @__PURE__ */ u3("div", { class: "font-semibold text-amber-400/90 mb-1.5 tracking-wide", children: "\u64CD\u4F5C\u65B9\u6CD5" }),
        /* @__PURE__ */ u3("ul", { class: "list-disc pl-4 space-y-0.5", children: lines.map((t3) => /* @__PURE__ */ u3("li", { children: t3 }, t3)) })
      ]
    }
  );
}

// node_modules/gsap/gsap-core.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
};
var _defaults = {
  duration: 0.5,
  overwrite: false,
  delay: 0
};
var _suppressOverwrites;
var _reverting;
var _context;
var _bigNum = 1e8;
var _tinyNum = 1 / _bigNum;
var _2PI = Math.PI * 2;
var _HALF_PI = _2PI / 4;
var _gsID = 0;
var _sqrt = Math.sqrt;
var _cos = Math.cos;
var _sin = Math.sin;
var _isString = function _isString2(value) {
  return typeof value === "string";
};
var _isFunction = function _isFunction2(value) {
  return typeof value === "function";
};
var _isNumber = function _isNumber2(value) {
  return typeof value === "number";
};
var _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
};
var _isObject = function _isObject2(value) {
  return typeof value === "object";
};
var _isNotFalse = function _isNotFalse2(value) {
  return value !== false;
};
var _windowExists = function _windowExists2() {
  return typeof window !== "undefined";
};
var _isFuncOrString = function _isFuncOrString2(value) {
  return _isFunction(value) || _isString(value);
};
var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
};
var _isArray = Array.isArray;
var _randomExp = /random\([^)]+\)/g;
var _commaDelimExp = /,\s*/g;
var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
var _relExp = /[+-]=-?[.\d]+/;
var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
var _globalTimeline;
var _win;
var _coreInitted;
var _doc;
var _globals = {};
var _installScope = {};
var _coreReady;
var _install = function _install2(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
};
var _missingPlugin = function _missingPlugin2(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
};
var _warn = function _warn2(message, suppress) {
  return !suppress && console.warn(message);
};
var _addGlobal = function _addGlobal2(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
};
var _emptyFunc = function _emptyFunc2() {
  return 0;
};
var _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
};
var _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
};
var _revertConfig = {
  suppressEvents: true
};
var _reservedProps = {};
var _lazyTweens = [];
var _lazyLookup = {};
var _lastRenderedFrame;
var _plugins = {};
var _effects = {};
var _nextGCFrame = 30;
var _harnessPlugins = [];
var _callbackNames = "";
var _harness = function _harness2(targets) {
  var target = targets[0], harnessPlugin, i3;
  _isObject(target) || _isFunction(target) || (targets = [targets]);
  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i3 = _harnessPlugins.length;
    while (i3-- && !_harnessPlugins[i3].targetTest(target)) {
    }
    harnessPlugin = _harnessPlugins[i3];
  }
  i3 = targets.length;
  while (i3--) {
    targets[i3] && (targets[i3]._gsap || (targets[i3]._gsap = new GSCache(targets[i3], harnessPlugin))) || targets.splice(i3, 1);
  }
  return targets;
};
var _getCache = function _getCache2(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
};
var _getProperty = function _getProperty2(target, property, v3) {
  return (v3 = target[property]) && _isFunction(v3) ? target[property]() : _isUndefined(v3) && target.getAttribute && target.getAttribute(property) || v3;
};
var _forEachName = function _forEachName2(names, func) {
  return (names = names.split(",")).forEach(func) || names;
};
var _round = function _round2(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
};
var _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e7) / 1e7 || 0;
};
var _parseRelative = function _parseRelative2(start, value) {
  var operator = value.charAt(0), end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
};
var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
  var l3 = toFind.length, i3 = 0;
  for (; toSearch.indexOf(toFind[i3]) < 0 && ++i3 < l3; ) {
  }
  return i3 < l3;
};
var _lazyRender = function _lazyRender2() {
  var l3 = _lazyTweens.length, a3 = _lazyTweens.slice(0), i3, tween;
  _lazyLookup = {};
  _lazyTweens.length = 0;
  for (i3 = 0; i3 < l3; i3++) {
    tween = a3[i3];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
};
var _isRevertWorthy = function _isRevertWorthy2(animation) {
  return !!(animation._initted || animation._startAt || animation.add);
};
var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting && _lazyRender();
  animation.render(time, suppressEvents, force || !!(_reverting && time < 0 && _isRevertWorthy(animation)));
  _lazyTweens.length && !_reverting && _lazyRender();
};
var _numericIfPossible = function _numericIfPossible2(value) {
  var n2 = parseFloat(value);
  return (n2 || n2 === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n2 : _isString(value) ? value.trim() : value;
};
var _passThrough = function _passThrough2(p3) {
  return p3;
};
var _setDefaults = function _setDefaults2(obj, defaults2) {
  for (var p3 in defaults2) {
    p3 in obj || (obj[p3] = defaults2[p3]);
  }
  return obj;
};
var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
  return function(obj, defaults2) {
    for (var p3 in defaults2) {
      p3 in obj || p3 === "duration" && excludeDuration || p3 === "ease" || (obj[p3] = defaults2[p3]);
    }
  };
};
var _merge = function _merge2(base, toMerge) {
  for (var p3 in toMerge) {
    base[p3] = toMerge[p3];
  }
  return base;
};
var _mergeDeep = function _mergeDeep2(base, toMerge) {
  for (var p3 in toMerge) {
    p3 !== "__proto__" && p3 !== "constructor" && p3 !== "prototype" && (base[p3] = _isObject(toMerge[p3]) ? _mergeDeep2(base[p3] || (base[p3] = {}), toMerge[p3]) : toMerge[p3]);
  }
  return base;
};
var _copyExcluding = function _copyExcluding2(obj, excluding) {
  var copy = {}, p3;
  for (p3 in obj) {
    p3 in excluding || (copy[p3] = obj[p3]);
  }
  return copy;
};
var _inheritDefaults = function _inheritDefaults2(vars) {
  var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }
  return vars;
};
var _arraysMatch = function _arraysMatch2(a1, a22) {
  var i3 = a1.length, match = i3 === a22.length;
  while (match && i3-- && a1[i3] === a22[i3]) {
  }
  return i3 < 0;
};
var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = parent[lastProp], t3;
  if (sortBy) {
    t3 = child[sortBy];
    while (prev && prev[sortBy] > t3) {
      prev = prev._prev;
    }
  }
  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }
  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }
  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
};
var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = child._prev, next = child._next;
  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }
  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }
  child._next = child._prev = child.parent = null;
};
var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
  child._act = 0;
};
var _uncache = function _uncache2(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    var a3 = animation;
    while (a3) {
      a3._dirty = 1;
      a3 = a3.parent;
    }
  }
  return animation;
};
var _recacheAncestors = function _recacheAncestors2(animation) {
  var parent = animation.parent;
  while (parent && parent.parent) {
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }
  return animation;
};
var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
};
var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
};
var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
};
var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
  var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
  return tTime && whole === tTime ? whole - 1 : whole;
};
var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
};
var _setEnd = function _setEnd2(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
};
var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
  var parent = animation._dp;
  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
    _setEnd(animation);
    parent._dirty || _uncache(parent, animation);
  }
  return animation;
};
var _postAddChecks = function _postAddChecks2(timeline2, child) {
  var t3;
  if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
    t3 = _parentToChildTotalTime(timeline2.rawTime(), child);
    if (!child._dur || _clamp(0, child.totalDuration(), t3) - child._tTime > _tinyNum) {
      child.render(t3, true);
    }
  }
  if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
    if (timeline2._dur < timeline2.duration()) {
      t3 = timeline2;
      while (t3._dp) {
        t3.rawTime() >= 0 && t3.totalTime(t3._tTime);
        t3 = t3._dp;
      }
    }
    timeline2._zTime = -_tinyNum;
  }
};
var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
  _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
  _isFromOrFromStart(child) || (timeline2._recent = child);
  skipChecks || _postAddChecks(timeline2, child);
  timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
  return timeline2;
};
var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
};
var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);
  if (!tween._initted) {
    return 1;
  }
  if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);
    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
};
var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
};
var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
};
var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
  if (repeatDelay && tween._repeat) {
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }
  if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      return;
    }
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
    suppressEvents || (suppressEvents = totalTime && !prevIteration);
    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);
      if (!suppressEvents && !_reverting) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
};
var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
  var child;
  if (time > prevTime) {
    child = animation._first;
    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }
      child = child._next;
    }
  } else {
    child = animation._last;
    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }
      child = child._prev;
    }
  }
};
var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
};
var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
};
var _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
};
var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
  var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i3, offset, isPercent;
  if (_isString(position) && (isNaN(position) || position in labels)) {
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i3 = position.indexOf("=");
    if (offset === "<" || offset === ">") {
      i3 >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i3 < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }
    if (i3 < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }
    offset = parseFloat(position.charAt(i3 - 1) + position.substr(i3 + 1));
    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }
    return i3 > 1 ? _parsePosition2(animation, position.substr(0, i3 - 1), percentAnimation) + offset : clippedDuration + offset;
  }
  return position == null ? clippedDuration : +position;
};
var _createTweenType = function _createTweenType2(type, params, timeline2) {
  var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline2;
  if (type) {
    irVars = vars;
    parent = timeline2;
    while (parent && !("immediateRender" in irVars)) {
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }
    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
  }
  return new Tween(params[0], vars, params[varsIndex + 1]);
};
var _conditionalReturn = function _conditionalReturn2(value, func) {
  return value || value === 0 ? func(value) : func;
};
var _clamp = function _clamp2(min, max, value) {
  return value < min ? min : value > max ? max : value;
};
var getUnit = function getUnit2(value, v3) {
  return !_isString(value) || !(v3 = _unitExp.exec(value)) ? "" : v3[1];
};
var clamp = function clamp2(min, max, value) {
  return _conditionalReturn(value, function(v3) {
    return _clamp(min, max, v3);
  });
};
var _slice = [].slice;
var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
};
var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }
  return ar.forEach(function(value) {
    var _accumulator;
    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
};
var toArray = function toArray2(value, scope, leaveStrings) {
  return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
};
var selector = function selector2(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function(v3) {
    var el = value.current || value.nativeElement || value;
    return toArray(v3, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
};
var shuffle = function shuffle2(a3) {
  return a3.sort(function() {
    return 0.5 - Math.random();
  });
};
var distribute = function distribute2(v3) {
  if (_isFunction(v3)) {
    return v3;
  }
  var vars = _isObject(v3) ? v3 : {
    each: v3
  }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
  if (_isString(from)) {
    ratioX = ratioY = {
      center: 0.5,
      edges: 0.5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }
  return function(i3, target, a3) {
    var l3 = (a3 || vars).length, distances = cache[l3], originX, originY, x2, y3, d3, j3, max, min, wrapAt;
    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
      if (!wrapAt) {
        max = -_bigNum;
        while (max < (max = a3[wrapAt++].getBoundingClientRect().left) && wrapAt < l3) {
        }
        wrapAt < l3 && wrapAt--;
      }
      distances = cache[l3] = [];
      originX = ratios ? Math.min(wrapAt, l3) * ratioX - 0.5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l3 * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;
      for (j3 = 0; j3 < l3; j3++) {
        x2 = j3 % wrapAt - originX;
        y3 = originY - (j3 / wrapAt | 0);
        distances[j3] = d3 = !axis ? _sqrt(x2 * x2 + y3 * y3) : Math.abs(axis === "y" ? y3 : x2);
        d3 > max && (max = d3);
        d3 < min && (min = d3);
      }
      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l3 = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l3 ? l3 - 1 : !axis ? Math.max(wrapAt, l3 / wrapAt) : axis === "y" ? l3 / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l3 < 0 ? base - l3 : base;
      distances.u = getUnit(vars.amount || vars.each) || 0;
      ease = ease && l3 < 0 ? _invertEase(ease) : ease;
    }
    l3 = (distances[i3] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l3) : l3) * distances.v) + distances.u;
  };
};
var _roundModifier = function _roundModifier2(v3) {
  var p3 = Math.pow(10, ((v3 + "").split(".")[1] || "").length);
  return function(raw) {
    var n2 = _roundPrecise(Math.round(parseFloat(raw) / v3) * v3 * p3);
    return (n2 - n2 % 1) / p3 + (_isNumber(raw) ? 0 : getUnit(raw));
  };
};
var snap = function snap2(snapTo, value) {
  var isArray = _isArray(snapTo), radius, is2D;
  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;
    if (snapTo.values) {
      snapTo = toArray(snapTo.values);
      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius;
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }
  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function(raw) {
    var x2 = parseFloat(is2D ? raw.x : raw), y3 = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i3 = snapTo.length, dx, dy;
    while (i3--) {
      if (is2D) {
        dx = snapTo[i3].x - x2;
        dy = snapTo[i3].y - y3;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i3] - x2);
      }
      if (dx < min) {
        min = dx;
        closest = i3;
      }
    }
    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
};
var random = function random2(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
};
var pipe = function pipe2() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }
  return function(value) {
    return functions.reduce(function(v3, f4) {
      return f4(v3);
    }, value);
  };
};
var unitize = function unitize2(func, unit) {
  return function(value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
};
var normalize = function normalize2(min, max, value) {
  return mapRange(min, max, 0, 1, value);
};
var _wrapArray = function _wrapArray2(a3, wrapper, value) {
  return _conditionalReturn(value, function(index) {
    return a3[~~wrapper(index)];
  });
};
var wrap = function wrap2(min, max, value) {
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
    return (range + (value2 - min) % range) % range + min;
  });
};
var wrapYoyo = function wrapYoyo2(min, max, value) {
  var range = max - min, total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
    value2 = (total + (value2 - min) % total) % total || 0;
    return min + (value2 > range ? total - value2 : value2);
  });
};
var _replaceRandom = function _replaceRandom2(s3) {
  return s3.replace(_randomExp, function(match) {
    var arIndex = match.indexOf("[") + 1, values = match.substring(arIndex || 7, arIndex ? match.indexOf("]") : match.length - 1).split(_commaDelimExp);
    return random(arIndex ? values : +values[0], arIndex ? 0 : +values[1], +values[2] || 1e-5);
  });
};
var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
  var inRange2 = inMax - inMin, outRange = outMax - outMin;
  return _conditionalReturn(value, function(value2) {
    return outMin + ((value2 - inMin) / inRange2 * outRange || 0);
  });
};
var interpolate = function interpolate2(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function(p4) {
    return (1 - p4) * start + p4 * end;
  };
  if (!func) {
    var isString = _isString(start), master = {}, p3, i3, interpolators, l3, il;
    progress === true && (mutate = 1) && (progress = null);
    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l3 = start.length;
      il = l3 - 2;
      for (i3 = 1; i3 < l3; i3++) {
        interpolators.push(interpolate2(start[i3 - 1], start[i3]));
      }
      l3--;
      func = function func2(p4) {
        p4 *= l3;
        var i4 = Math.min(il, ~~p4);
        return interpolators[i4](p4 - i4);
      };
      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }
    if (!interpolators) {
      for (p3 in end) {
        _addPropTween.call(master, start, p3, "get", end[p3]);
      }
      func = function func2(p4) {
        return _renderPropTweens(p4, master) || (isString ? start.p : start);
      };
    }
  }
  return _conditionalReturn(progress, func);
};
var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
  var labels = timeline2.labels, min = _bigNum, p3, distance, label;
  for (p3 in labels) {
    distance = labels[p3] - fromTime;
    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p3;
      min = distance;
    }
  }
  return label;
};
var _callback = function _callback2(animation, type, executeLazyFirst) {
  var v3 = animation.vars, callback = v3[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
  if (!callback) {
    return;
  }
  params = v3[type + "Params"];
  scope = v3.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender();
  context3 && (_context = context3);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context = prevContext;
  return result;
};
var _interrupt = function _interrupt2(animation) {
  _removeFromParent(animation);
  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
};
var _quickTween;
var _registerPluginQueue = [];
var _createPlugin = function _createPlugin2(config3) {
  if (!config3) return;
  config3 = !config3.name && config3["default"] || config3;
  if (_windowExists() || config3.headless) {
    var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
      this._props = [];
    } : config3, instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    }, statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };
    _wake();
    if (config3 !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
      _plugins[Plugin.prop = name] = Plugin;
      if (config3.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }
    _addGlobal(name, Plugin);
    config3.register && config3.register(gsap, Plugin, PropTween);
  } else {
    _registerPluginQueue.push(config3);
  }
};
var _255 = 255;
var _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
};
var _hue = function _hue2(h3, m1, m22) {
  h3 += h3 < 0 ? 1 : h3 > 1 ? -1 : 0;
  return (h3 * 6 < 1 ? m1 + (m22 - m1) * h3 * 6 : h3 < 0.5 ? m22 : h3 * 3 < 2 ? m1 + (m22 - m1) * (2 / 3 - h3) * 6 : m1) * _255 + 0.5 | 0;
};
var splitColor = function splitColor2(v3, toHSL, forceAlpha) {
  var a3 = !v3 ? _colorLookup.black : _isNumber(v3) ? [v3 >> 16, v3 >> 8 & _255, v3 & _255] : 0, r3, g2, b2, h3, s3, l3, max, min, d3, wasHSL;
  if (!a3) {
    if (v3.substr(-1) === ",") {
      v3 = v3.substr(0, v3.length - 1);
    }
    if (_colorLookup[v3]) {
      a3 = _colorLookup[v3];
    } else if (v3.charAt(0) === "#") {
      if (v3.length < 6) {
        r3 = v3.charAt(1);
        g2 = v3.charAt(2);
        b2 = v3.charAt(3);
        v3 = "#" + r3 + r3 + g2 + g2 + b2 + b2 + (v3.length === 5 ? v3.charAt(4) + v3.charAt(4) : "");
      }
      if (v3.length === 9) {
        a3 = parseInt(v3.substr(1, 6), 16);
        return [a3 >> 16, a3 >> 8 & _255, a3 & _255, parseInt(v3.substr(7), 16) / 255];
      }
      v3 = parseInt(v3.substr(1), 16);
      a3 = [v3 >> 16, v3 >> 8 & _255, v3 & _255];
    } else if (v3.substr(0, 3) === "hsl") {
      a3 = wasHSL = v3.match(_strictNumExp);
      if (!toHSL) {
        h3 = +a3[0] % 360 / 360;
        s3 = +a3[1] / 100;
        l3 = +a3[2] / 100;
        g2 = l3 <= 0.5 ? l3 * (s3 + 1) : l3 + s3 - l3 * s3;
        r3 = l3 * 2 - g2;
        a3.length > 3 && (a3[3] *= 1);
        a3[0] = _hue(h3 + 1 / 3, r3, g2);
        a3[1] = _hue(h3, r3, g2);
        a3[2] = _hue(h3 - 1 / 3, r3, g2);
      } else if (~v3.indexOf("=")) {
        a3 = v3.match(_numExp);
        forceAlpha && a3.length < 4 && (a3[3] = 1);
        return a3;
      }
    } else {
      a3 = v3.match(_strictNumExp) || _colorLookup.transparent;
    }
    a3 = a3.map(Number);
  }
  if (toHSL && !wasHSL) {
    r3 = a3[0] / _255;
    g2 = a3[1] / _255;
    b2 = a3[2] / _255;
    max = Math.max(r3, g2, b2);
    min = Math.min(r3, g2, b2);
    l3 = (max + min) / 2;
    if (max === min) {
      h3 = s3 = 0;
    } else {
      d3 = max - min;
      s3 = l3 > 0.5 ? d3 / (2 - max - min) : d3 / (max + min);
      h3 = max === r3 ? (g2 - b2) / d3 + (g2 < b2 ? 6 : 0) : max === g2 ? (b2 - r3) / d3 + 2 : (r3 - g2) / d3 + 4;
      h3 *= 60;
    }
    a3[0] = ~~(h3 + 0.5);
    a3[1] = ~~(s3 * 100 + 0.5);
    a3[2] = ~~(l3 * 100 + 0.5);
  }
  forceAlpha && a3.length < 4 && (a3[3] = 1);
  return a3;
};
var _colorOrderData = function _colorOrderData2(v3) {
  var values = [], c3 = [], i3 = -1;
  v3.split(_colorExp).forEach(function(v4) {
    var a3 = v4.match(_numWithUnitExp) || [];
    values.push.apply(values, a3);
    c3.push(i3 += a3.length + 1);
  });
  values.c = c3;
  return values;
};
var _formatColors = function _formatColors2(s3, toHSL, orderMatchData) {
  var result = "", colors = (s3 + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i3 = 0, c3, shell, d3, l3;
  if (!colors) {
    return s3;
  }
  colors = colors.map(function(color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });
  if (orderMatchData) {
    d3 = _colorOrderData(s3);
    c3 = orderMatchData.c;
    if (c3.join(result) !== d3.c.join(result)) {
      shell = s3.replace(_colorExp, "1").split(_numWithUnitExp);
      l3 = shell.length - 1;
      for (; i3 < l3; i3++) {
        result += shell[i3] + (~c3.indexOf(i3) ? colors.shift() || type + "0,0,0,0)" : (d3.length ? d3 : colors.length ? colors : orderMatchData).shift());
      }
    }
  }
  if (!shell) {
    shell = s3.split(_colorExp);
    l3 = shell.length - 1;
    for (; i3 < l3; i3++) {
      result += shell[i3] + colors[i3];
    }
  }
  return result + shell[l3];
};
var _colorExp = (function() {
  var s3 = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p3;
  for (p3 in _colorLookup) {
    s3 += "|" + p3 + "\\b";
  }
  return new RegExp(s3 + ")", "gi");
})();
var _hslExp = /hsl[a]?\(/;
var _colorStringFilter = function _colorStringFilter2(a3) {
  var combined = a3.join(" "), toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a3[1] = _formatColors(a3[1], toHSL);
    a3[0] = _formatColors(a3[0], toHSL, _colorOrderData(a3[1]));
    return true;
  }
};
var _tickerActive;
var _ticker = (function() {
  var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id2, _req, _raf, _self, _delta, _i, _tick = function _tick2(v3) {
    var elapsed = _getTime() - _lastUpdate, manual = v3 === true, overlap, dispatch, time, frame;
    (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;
    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1e3;
      _self.time = time = time / 1e3;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }
    manual || (_id2 = _req(_tick2));
    if (dispatch) {
      for (_i = 0; _i < _listeners2.length; _i++) {
        _listeners2[_i](time, _delta, frame, v3);
      }
    }
  };
  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1e3 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
          _registerPluginQueue.forEach(_createPlugin);
        }
        _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
        _id2 && _self.sleep();
        _req = _raf || function(f4) {
          return setTimeout(f4, _nextTime - _self.time * 1e3 + 1 | 0);
        };
        _tickerActive = 1;
        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? cancelAnimationFrame : clearTimeout)(_id2);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity;
      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1e3 / (_fps || 240);
      _nextTime = _self.time * 1e3 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function(t3, d3, f4, v3) {
        callback(t3, d3, f4, v3);
        _self.remove(func);
      } : callback;
      _self.remove(callback);
      _listeners2[prioritize ? "unshift" : "push"](func);
      _wake();
      return func;
    },
    remove: function remove(callback, i3) {
      ~(i3 = _listeners2.indexOf(callback)) && _listeners2.splice(i3, 1) && _i >= i3 && _i--;
    },
    _listeners: _listeners2
  };
  return _self;
})();
var _wake = function _wake2() {
  return !_tickerActive && _ticker.wake();
};
var _easeMap = {};
var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
var _quotesExp = /["']/g;
var _parseObjectInString = function _parseObjectInString2(value) {
  var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i3 = 1, l3 = split.length, index, val, parsedVal;
  for (; i3 < l3; i3++) {
    val = split[i3];
    index = i3 !== l3 - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }
  return obj;
};
var _valueInParentheses = function _valueInParentheses2(value) {
  var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
};
var _configEaseFromString = function _configEaseFromString2(name) {
  var split = (name + "").split("("), ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
};
var _invertEase = function _invertEase2(ease) {
  return function(p3) {
    return 1 - ease(1 - p3);
  };
};
var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
  var child = timeline2._first, ease;
  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase2(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase2(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }
    child = child._next;
  }
};
var _parseEase = function _parseEase2(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
};
var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut2(p3) {
      return 1 - easeIn(1 - p3);
    };
  }
  if (easeInOut === void 0) {
    easeInOut = function easeInOut2(p3) {
      return p3 < 0.5 ? easeIn(p3 * 2) / 2 : 1 - easeIn((1 - p3) * 2) / 2;
    };
  }
  var ease = {
    easeIn,
    easeOut,
    easeInOut
  }, lowercaseName;
  _forEachName(names, function(name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
    for (var p3 in ease) {
      _easeMap[lowercaseName + (p3 === "easeIn" ? ".in" : p3 === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p3] = ease[p3];
    }
  });
  return ease;
};
var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
  return function(p3) {
    return p3 < 0.5 ? (1 - easeOut(1 - p3 * 2)) / 2 : 0.5 + easeOut((p3 - 0.5) * 2) / 2;
  };
};
var _configElastic = function _configElastic2(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1, p22 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p22 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p4) {
    return p4 === 1 ? 1 : p1 * Math.pow(2, -10 * p4) * _sin((p4 - p3) * p22) + 1;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p4) {
    return 1 - easeOut(1 - p4);
  } : _easeInOutFromOut(easeOut);
  p22 = _2PI / p22;
  ease.config = function(amplitude2, period2) {
    return _configElastic2(type, amplitude2, period2);
  };
  return ease;
};
var _configBack = function _configBack2(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }
  var easeOut = function easeOut2(p3) {
    return p3 ? --p3 * p3 * ((overshoot + 1) * p3 + overshoot) + 1 : 0;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p3) {
    return 1 - easeOut(1 - p3);
  } : _easeInOutFromOut(easeOut);
  ease.config = function(overshoot2) {
    return _configBack2(type, overshoot2);
  };
  return ease;
};
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i3) {
  var power = i3 < 5 ? i3 + 1 : i3;
  _insertEase(name + ",Power" + (power - 1), i3 ? function(p3) {
    return Math.pow(p3, power);
  } : function(p3) {
    return p3;
  }, function(p3) {
    return 1 - Math.pow(1 - p3, power);
  }, function(p3) {
    return p3 < 0.5 ? Math.pow(p3 * 2, power) / 2 : 1 - Math.pow((1 - p3) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function(n2, c3) {
  var n1 = 1 / c3, n22 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p3) {
    return p3 < n1 ? n2 * p3 * p3 : p3 < n22 ? n2 * Math.pow(p3 - 1.5 / c3, 2) + 0.75 : p3 < n3 ? n2 * (p3 -= 2.25 / c3) * p3 + 0.9375 : n2 * Math.pow(p3 - 2.625 / c3, 2) + 0.984375;
  };
  _insertEase("Bounce", function(p3) {
    return 1 - easeOut(1 - p3);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function(p3) {
  return Math.pow(2, 10 * (p3 - 1)) * p3 + p3 * p3 * p3 * p3 * p3 * p3 * (1 - p3);
});
_insertEase("Circ", function(p3) {
  return -(_sqrt(1 - p3 * p3) - 1);
});
_insertEase("Sine", function(p3) {
  return p3 === 1 ? 1 : -_cos(p3 * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps, p22 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
    return function(p4) {
      return ((p22 * _clamp(0, max, p4) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
  return _callbackNames += name + "," + name + "Params,";
});
var GSCache = function GSCache2(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
var Animation = /* @__PURE__ */ (function() {
  function Animation2(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context) {
      this._ctx = _context;
      _context.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation2.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this);
      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !this._initted && this._dur && _totalTime || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      this._ts || (this._pTime = _totalTime);
      _lazySafeRender(this, _totalTime, suppressEvents);
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  };
  _proto.timeScale = function timeScale(value, suppressEvents) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts;
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
    this.totalTime(_clamp(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
    _setEnd(this);
    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
        this._ts = this._act = 0;
      } else {
        _wake();
        this._ts = this._rts;
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = _roundPrecise(value);
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, this._start - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp;
    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config3) {
    if (config3 === void 0) {
      config3 = _revertConfig;
    }
    var prevIsReverting = _reverting;
    _reverting = config3;
    if (_isRevertWorthy(this)) {
      this.timeline && this.timeline.revert(config3);
      this.totalTime(-0.01, config3.suppressEvents);
    }
    this.data !== "nested" && config3.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this, time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (Math.abs(animation._ts) || 1);
      animation = animation._dp;
    }
    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    this._dur || (this._zTime = -_tinyNum);
    return this;
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp, start = this._start, rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self = this, prevProm = self._prom;
    return new Promise(function(resolve) {
      var f4 = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
        var _then = self.then;
        self.then = null;
        prevProm && prevProm();
        _isFunction(f4) && (f4 = f4(self)) && (f4.then || f4 === self) && (self.then = _then);
        resolve(f4);
        self.then = _then;
      };
      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation2;
})();
_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
var Timeline = /* @__PURE__ */ (function(_Animation) {
  _inheritsLoose(Timeline2, _Animation);
  function Timeline2(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline2.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  };
  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime);
        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          if (this.vars.repeatRefresh && !isYoyo) {
            this.invalidate()._lock = 1;
            prevIteration = iteration;
          }
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            return this;
          }
          dur = this._dur;
          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -1e-4;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          }
          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale;
      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0;
      }
      if (!prevTime && tTime && dur && !suppressEvents && !prevIteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum);
              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time;
        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && _isRevertWorthy(child));
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          this._start = prevStart;
          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
        if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
          if (!this._lock) {
            (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
            if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
              _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
              this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
            }
          }
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber(position) || (position = _parsePosition(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function(obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this;
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }
    var a3 = [], child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a3.push(child);
        } else {
          timelines && a3.push(child);
          nested && a3.push.apply(a3, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a3;
  };
  _proto2.getById = function getById2(id) {
    var animations = this.getChildren(1, 1, 1), i3 = animations.length;
    while (i3--) {
      if (animations[i3].vars.id === id) {
        return animations[i3];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }
    child.parent === this && _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t3 = Tween.delayedCall(0, callback || _emptyFunc, params);
    t3.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t3, _parsePosition(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive), i3 = tweens.length;
    while (i3--) {
      _overwritingTween !== tweens[i3] && tweens[i3].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
    var a3 = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          a3.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a3.push.apply(a3, children);
      }
      child = child._next;
    }
    return a3;
  };
  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }
        _onStart && _onStart.apply(tween, onStartParams || []);
      }
    }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first, labels = this.labels, p3;
    amount = _roundPrecise(amount);
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p3 in labels) {
        if (labels[p3] >= ignoreBeforeTime) {
          labels[p3] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first, next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0, self = this, child = self._last, prevStart = _bigNum, prev, start, parent;
    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }
    if (self._dirty) {
      parent = self.parent;
      while (child) {
        prev = child._prev;
        child._dirty && child.totalDuration();
        start = child._start;
        if (start > prevStart && self._sort && child._ts && !self._lock) {
          self._lock = 1;
          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          max -= start;
          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += _roundPrecise(start / self._ts);
            self._time -= start;
            self._tTime -= start;
          }
          self.shiftChildren(-start, false, -Infinity);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
      self._dirty = 0;
    }
    return self._tDur;
  };
  Timeline2.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) {
        if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    }
  };
  return Timeline2;
})(Animation);
_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a3;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }
  if (stringFilter) {
    a3 = [start, end];
    stringFilter(a3, target, prop);
    start = a3[0];
    end = a3[1];
  }
  startNums = start.match(_complexStringNumExp) || [];
  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);
    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }
    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0;
      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }
  pt.c = index < end.length ? end.substring(index, end.length) : "";
  pt.fp = funcParam;
  if (_relExp.test(end) || hasRandom) {
    pt.e = 0;
  }
  this._pt = pt;
  return pt;
};
var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
      if (pt || pt === 0) {
        end = pt;
      }
    }
  }
  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }
    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
};
var _processVars = function _processVars2(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }
  var copy = {}, p3;
  for (p3 in vars) {
    copy[p3] = _parseFuncOrString(vars[p3], tween, index, target, targets);
  }
  return copy;
};
var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i3;
  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
      i3 = plugin._props.length;
      while (i3--) {
        ptLookup[plugin._props[i3]] = pt;
      }
    }
  }
  return plugin;
};
var _overwritingTween;
var _forceAllPropTweens;
var _initTween = function _initTween2(tween, time, tTime) {
  var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i3, p3, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
  if (yoyoEase && tween._yoyo && !tween._repeat) {
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }
  tween._from = !tl && !!vars.runBackwards;
  if (!tl || keyframes && !vars.stagger) {
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop];
    cleanVars = _copyExcluding(vars, _reservedProps);
    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1);
      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
      prevStartAt._lazy = 0;
    }
    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate && function() {
          return _callback(tween, "onUpdate");
        },
        stagger: 0
      }, startAt)));
      tween._startAt._dp = 0;
      tween._startAt._sat = tween;
      time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          time && (tween._zTime = time);
          return;
        }
      }
    } else if (runBackwards && dur) {
      if (!prevStartAt) {
        time && (immediateRender = false);
        p3 = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent
          //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
        }, cleanVars);
        harnessVars && (p3[harness.prop] = harnessVars);
        _removeFromParent(tween._startAt = Tween.set(targets, p3));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;
        if (!immediateRender) {
          _initTween2(tween._startAt, _tinyNum, _tinyNum);
        } else if (!time) {
          return;
        }
      }
    }
    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;
    for (i3 = 0; i3 < targets.length; i3++) {
      target = targets[i3];
      gsData = target._gsap || _harness(targets)[i3]._gsap;
      tween._ptLookup[i3] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
      index = fullTargets === targets ? i3 : fullTargets.indexOf(target);
      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
        plugin._props.forEach(function(name) {
          ptLookup[name] = pt;
        });
        plugin.priority && (hasPriority = 1);
      }
      if (!harness || harnessVars) {
        for (p3 in cleanVars) {
          if (_plugins[p3] && (plugin = _checkPlugin(p3, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p3] = pt = _addPropTween.call(tween, target, p3, "get", cleanVars[p3], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }
      tween._op && tween._op[i3] && tween.kill(target, tween._op[i3]);
      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;
        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
        overwritten = !tween.parent;
        _overwritingTween = 0;
      }
      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }
    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween);
  }
  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten;
  keyframes && time <= 0 && tl.render(_bigNum, true, true);
};
var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i3;
  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i3 = tween._targets.length;
    while (i3--) {
      pt = lookup[i3][property];
      if (pt && pt.d && pt.d._pt) {
        pt = pt.d._pt;
        while (pt && pt.p !== property && pt.fp !== property) {
          pt = pt._next;
        }
      }
      if (!pt) {
        _forceAllPropTweens = 1;
        tween.vars[property] = "+=0";
        _initTween(tween, time);
        _forceAllPropTweens = 0;
        return skipRecursion ? _warn(property + " not eligible for reset") : 1;
      }
      ptCache.push(pt);
    }
  }
  i3 = ptCache.length;
  while (i3--) {
    rootPT = ptCache[i3];
    pt = rootPT._pt || rootPT;
    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
  }
};
var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p3, i3, aliases;
  if (!propertyAliases) {
    return vars;
  }
  copy = _merge({}, vars);
  for (p3 in propertyAliases) {
    if (p3 in copy) {
      aliases = propertyAliases[p3].split(",");
      i3 = aliases.length;
      while (i3--) {
        copy[aliases[i3]] = copy[p3];
      }
    }
  }
  return copy;
};
var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut", p3, a3;
  if (_isArray(obj)) {
    a3 = allProps[prop] || (allProps[prop] = []);
    obj.forEach(function(value, i3) {
      return a3.push({
        t: i3 / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p3 in obj) {
      a3 = allProps[p3] || (allProps[p3] = []);
      p3 === "ease" || a3.push({
        t: parseFloat(prop),
        v: obj[p3],
        e: ease
      });
    }
  }
};
var _parseFuncOrString = function _parseFuncOrString2(value, tween, i3, target, targets) {
  return _isFunction(value) ? value.call(tween, i3, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
};
var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
var _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
  return _staggerPropsToSkip[name] = 1;
});
var Tween = /* @__PURE__ */ (function(_Animation2) {
  _inheritsLoose(Tween2, _Animation2);
  function Tween2(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i3, copy, l3, p3, curTarget, staggerFunc, staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = [];
    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults2 || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l3 = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject(stagger)) {
          for (p3 in stagger) {
            if (~_staggerTweenProps.indexOf(p3)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p3] = stagger[p3];
            }
          }
        }
        for (i3 = 0; i3 < l3; i3++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i3];
          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i3, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i3, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l3 === 1 && copy.delay) {
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i3, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0, a3, kf, v3;
        if (_isArray(keyframes)) {
          keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration();
        } else {
          copy = {};
          for (p3 in keyframes) {
            p3 === "ease" || p3 === "easeEach" || _parseKeyframe(p3, keyframes[p3], copy, keyframes.easeEach);
          }
          for (p3 in copy) {
            a3 = copy[p3].sort(function(a4, b2) {
              return a4.t - b2.t;
            });
            time = 0;
            for (i3 = 0; i3 < a3.length; i3++) {
              kf = a3[i3];
              v3 = {
                ease: kf.e,
                duration: (kf.t - (i3 ? a3[i3 - 1].t : 0)) / 100 * duration
              };
              v3[p3] = kf.v;
              tl.to(parsedTargets, v3, time);
              time += v3.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          });
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0;
    }
    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum;
      _this3.render(Math.max(0, -delay) || 0);
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween2.prototype;
  _proto3.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
      time = tTime;
      timeline2 = this.timeline;
      if (this._repeat) {
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          } else if (time > dur) {
            time = dur;
          }
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
          if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
            this._lock = force = 1;
            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0;
          return this;
        }
        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
          return this;
        }
        if (dur !== this._dur) {
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1;
        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (!prevTime && tTime && !suppressEvents && !prevIteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
        _callback(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur);
    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
      return this.resetTo(property, value, start, startIsRelative, 1);
    }
    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
      return this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
      return this;
    }
    var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p3, pt, i3;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      if (_isString(vars)) {
        p3 = {};
        _forEachName(vars, function(name) {
          return p3[name] = 1;
        });
        vars = p3;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i3 = parsedTargets.length;
    while (i3--) {
      if (~killingTargets.indexOf(parsedTargets[i3])) {
        curLookup = propTweenLookup[i3];
        if (vars === "all") {
          overwrittenProps[i3] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i3] = overwrittenProps[i3] || {};
          props = vars;
        }
        for (p3 in props) {
          pt = curLookup && curLookup[p3];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p3) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p3];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p3] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this);
    return this;
  };
  Tween2.to = function to(targets, vars) {
    return new Tween2(targets, vars, arguments[2]);
  };
  Tween2.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween2(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };
  Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween2.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween2(targets, vars);
  };
  Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween2;
})(Animation);
_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
  Tween[name] = function() {
    var tl = new Timeline(), params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
var _setterPlain = function _setterPlain2(target, property, value) {
  return target[property] = value;
};
var _setterFunc = function _setterFunc2(target, property, value) {
  return target[property](value);
};
var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
  return target[property](data.fp, value);
};
var _setterAttribute = function _setterAttribute2(target, property, value) {
  return target.setAttribute(property, value);
};
var _getSetter = function _getSetter2(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
};
var _renderPlain = function _renderPlain2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
};
var _renderBoolean = function _renderBoolean2(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
};
var _renderComplexString = function _renderComplexString2(ratio, data) {
  var pt = data._pt, s3 = "";
  if (!ratio && data.b) {
    s3 = data.b;
  } else if (ratio === 1 && data.e) {
    s3 = data.e;
  } else {
    while (pt) {
      s3 = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s3;
      pt = pt._next;
    }
    s3 += data.c;
  }
  data.set(data.t, data.p, s3, data);
};
var _renderPropTweens = function _renderPropTweens2(ratio, data) {
  var pt = data._pt;
  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
};
var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
  var pt = this._pt, next;
  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
};
var _killPropTweensOf = function _killPropTweensOf2(property) {
  var pt = this._pt, hasNonDependentRemaining, next;
  while (pt) {
    next = pt._next;
    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }
    pt = next;
  }
  return !hasNonDependentRemaining;
};
var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
};
var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
  var pt = parent._pt, next, pt2, first, last;
  while (pt) {
    next = pt._next;
    pt2 = first;
    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }
    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }
    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }
    pt = next;
  }
  parent._pt = first;
};
var PropTween = /* @__PURE__ */ (function() {
  function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween2.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set;
    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target;
    this.tween = tween;
  };
  return PropTween2;
})();
_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [];
var _listeners = {};
var _emptyArray = [];
var _lastMediaTime = 0;
var _contextID = 0;
var _dispatch = function _dispatch2(type) {
  return (_listeners[type] || _emptyArray).map(function(f4) {
    return f4();
  });
};
var _onMediaChange = function _onMediaChange2() {
  var time = Date.now(), matches = [];
  if (time - _lastMediaTime > 2) {
    _dispatch("matchMediaInit");
    _media.forEach(function(c3) {
      var queries = c3.queries, conditions = c3.conditions, match, p3, anyMatch, toggled;
      for (p3 in queries) {
        match = _win.matchMedia(queries[p3]).matches;
        match && (anyMatch = 1);
        if (match !== conditions[p3]) {
          conditions[p3] = match;
          toggled = 1;
        }
      }
      if (toggled) {
        c3.revert();
        anyMatch && matches.push(c3);
      }
    });
    _dispatch("matchMediaRevert");
    matches.forEach(function(c3) {
      return c3.onMatch(c3, function(func) {
        return c3.add(null, func);
      });
    });
    _lastMediaTime = time;
    _dispatch("matchMedia");
  }
};
var Context = /* @__PURE__ */ (function() {
  function Context2(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = [];
    this.isReverted = false;
    this.id = _contextID++;
    func && this.add(func);
  }
  var _proto5 = Context2.prototype;
  _proto5.add = function add(name, func, scope) {
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }
    var self = this, f4 = function f5() {
      var prev = _context, prevSelector = self.selector, result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context = self;
      result = func.apply(self, arguments);
      _isFunction(result) && self._r.push(result);
      _context = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };
    self.last = f4;
    return name === _isFunction ? f4(self, function(func2) {
      return self.add(null, func2);
    }) : name ? self[name] = f4 : f4;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a3 = [];
    this.data.forEach(function(e3) {
      return e3 instanceof Context2 ? a3.push.apply(a3, e3.getTweens()) : e3 instanceof Tween && !(e3.parent && e3.parent.data === "nested") && a3.push(e3);
    });
    return a3;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia2) {
    var _this4 = this;
    if (revert) {
      (function() {
        var tweens = _this4.getTweens(), i4 = _this4.data.length, t3;
        while (i4--) {
          t3 = _this4.data[i4];
          if (t3.data === "isFlip") {
            t3.revert();
            t3.getChildren(true, true, false).forEach(function(tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        }
        tweens.map(function(t4) {
          return {
            g: t4._dur || t4._delay || t4._sat && !t4._sat.vars.immediateRender ? t4.globalTime(0) : -Infinity,
            t: t4
          };
        }).sort(function(a3, b2) {
          return b2.g - a3.g || -Infinity;
        }).forEach(function(o3) {
          return o3.t.revert(revert);
        });
        i4 = _this4.data.length;
        while (i4--) {
          t3 = _this4.data[i4];
          if (t3 instanceof Timeline) {
            if (t3.data !== "nested") {
              t3.scrollTrigger && t3.scrollTrigger.revert();
              t3.kill();
            }
          } else {
            !(t3 instanceof Tween) && t3.revert && t3.revert(revert);
          }
        }
        _this4._r.forEach(function(f4) {
          return f4(revert, _this4);
        });
        _this4.isReverted = true;
      })();
    } else {
      this.data.forEach(function(e3) {
        return e3.kill && e3.kill();
      });
    }
    this.clear();
    if (matchMedia2) {
      var i3 = _media.length;
      while (i3--) {
        _media[i3].id === this.id && _media.splice(i3, 1);
      }
    }
  };
  _proto5.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  return Context2;
})();
var MatchMedia = /* @__PURE__ */ (function() {
  function MatchMedia2(scope) {
    this.contexts = [];
    this.scope = scope;
    _context && _context.data.push(this);
  }
  var _proto6 = MatchMedia2.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p3, active;
    _context && !context3.selector && (context3.selector = _context.selector);
    this.contexts.push(context3);
    func = context3.add("onMatch", func);
    context3.queries = conditions;
    for (p3 in conditions) {
      if (p3 === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p3]);
        if (mq) {
          _media.indexOf(context3) < 0 && _media.push(context3);
          (cond[p3] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context3, function(f4) {
      return context3.add(null, f4);
    });
    return this;
  };
  _proto6.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function(c3) {
      return c3.kill(revert, true);
    });
  };
  return MatchMedia2;
})();
var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function(config3) {
      return _createPlugin(config3);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]);
    var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function(property2, unit2, uncache2) {
      return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function(t3) {
        return gsap.quickSetter(t3, property, unit);
      }), l3 = setters.length;
      return function(value) {
        var i3 = l3;
        while (i3--) {
          setters[i3](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property], cache = _getCache(target), p3 = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
      var p4 = new Plugin();
      _quickTween._pt = 0;
      p4.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p4.render(1, p4);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p3);
    return Plugin ? setter : function(value) {
      return setter(target, p3, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _setDefaults22;
    var tween = gsap.to(target, _setDefaults((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config2(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function(pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function(targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults2), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function(targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars), child, next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0;
    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function(c3) {
      var cond = c3.conditions, found, p3;
      for (p3 in cond) {
        if (cond[p3]) {
          cond[p3] = false;
          found = 1;
        }
      }
      found && c3.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a3 = _listeners[type] || (_listeners[type] = []);
    ~a3.indexOf(callback) || a3.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a3 = _listeners[type], i3 = a3 && a3.indexOf(callback);
    i3 >= 0 && a3.splice(i3, 1);
  },
  utils: {
    wrap,
    wrapYoyo,
    distribute,
    random,
    snap,
    normalize,
    getUnit,
    clamp,
    splitColor,
    toArray,
    selector,
    mapRange,
    pipe,
    unitize,
    interpolate,
    shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween,
    globals: _addGlobal,
    Tween,
    Timeline,
    Animation,
    getCache: _getCache,
    _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context2(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);
        toAdd._ctx = _context;
      }
      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
});
var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
  var pt = plugin._pt;
  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }
  return pt;
};
var _addModifiers = function _addModifiers2(tween, modifiers) {
  var targets = tween._targets, p3, i3, pt;
  for (p3 in modifiers) {
    i3 = targets.length;
    while (i3--) {
      pt = tween._ptLookup[i3][p3];
      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          pt = _getPluginPropTween(pt, p3);
        }
        pt && pt.modifier && pt.modifier(modifiers[p3], tween, targets[i3], p3);
      }
    }
  }
};
var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
  return {
    name,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init4(target, vars, tween) {
      tween._onInit = function(tween2) {
        var temp, p3;
        if (_isString(vars)) {
          temp = {};
          _forEachName(vars, function(name2) {
            return temp[name2] = 1;
          });
          vars = temp;
        }
        if (modifier) {
          temp = {};
          for (p3 in vars) {
            temp[p3] = modifier(vars[p3]);
          }
          vars = temp;
        }
        _addModifiers(tween2, vars);
      };
    }
  };
};
var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p3, pt, v3;
    this.tween = tween;
    for (p3 in vars) {
      v3 = target.getAttribute(p3) || "";
      pt = this.add(target, "setAttribute", (v3 || 0) + "", vars[p3], index, targets, 0, 0, p3);
      pt.op = p3;
      pt.b = v3;
      this._props.push(p3);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  headless: 1,
  init: function init2(target, value) {
    var i3 = value.length;
    while (i3--) {
      this.add(target, i3, target[i3] || 0, value[i3], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
Tween.version = Timeline.version = gsap.version = "3.14.2";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0;
var Power1 = _easeMap.Power1;
var Power2 = _easeMap.Power2;
var Power3 = _easeMap.Power3;
var Power4 = _easeMap.Power4;
var Linear = _easeMap.Linear;
var Quad = _easeMap.Quad;
var Cubic = _easeMap.Cubic;
var Quart = _easeMap.Quart;
var Quint = _easeMap.Quint;
var Strong = _easeMap.Strong;
var Elastic = _easeMap.Elastic;
var Back = _easeMap.Back;
var SteppedEase = _easeMap.SteppedEase;
var Bounce = _easeMap.Bounce;
var Sine = _easeMap.Sine;
var Expo = _easeMap.Expo;
var Circ = _easeMap.Circ;

// node_modules/gsap/CSSPlugin.js
var _win2;
var _doc2;
var _docElement;
var _pluginInitted;
var _tempDiv;
var _tempDivStyler;
var _recentSetterPlugin;
var _reverting2;
var _windowExists3 = function _windowExists4() {
  return typeof window !== "undefined";
};
var _transformProps = {};
var _RAD2DEG = 180 / Math.PI;
var _DEG2RAD = Math.PI / 180;
var _atan2 = Math.atan2;
var _bigNum2 = 1e8;
var _capsExp = /([A-Z])/g;
var _horizontalExp = /(left|right|width|margin|padding|x)/i;
var _complexExp = /[\s,\(]\S/;
var _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
};
var _renderCSSProp = function _renderCSSProp2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
};
var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
};
var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
};
var _renderCSSPropWithBeginningAndEnd = function _renderCSSPropWithBeginningAndEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
};
var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
};
var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
};
var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
};
var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
  return target.style[property] = value;
};
var _setterCSSProp = function _setterCSSProp2(target, property, value) {
  return target.style.setProperty(property, value);
};
var _setterTransform = function _setterTransform2(target, property, value) {
  return target._gsap[property] = value;
};
var _setterScale = function _setterScale2(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
};
var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
};
var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
};
var _transformProp = "transform";
var _transformOriginProp = _transformProp + "Origin";
var _saveStyle = function _saveStyle2(property, isNotCSS) {
  var _this = this;
  var target = this.target, style = target.style, cache = target._gsap;
  if (property in _transformProps && style) {
    this.tfm = this.tfm || {};
    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function(a3) {
        return _this.tfm[a3] = _get(target, a3);
      }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
      property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
    } else {
      return _propertyAliases.transform.split(",").forEach(function(p3) {
        return _saveStyle2.call(_this, p3, isNotCSS);
      });
    }
    if (this.props.indexOf(_transformProp) >= 0) {
      return;
    }
    if (cache.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }
    property = _transformProp;
  }
  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
};
var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
};
var _revertStyle = function _revertStyle2() {
  var props = this.props, target = this.target, style = target.style, cache = target._gsap, i3, p3;
  for (i3 = 0; i3 < props.length; i3 += 3) {
    if (!props[i3 + 1]) {
      props[i3 + 2] ? style[props[i3]] = props[i3 + 2] : style.removeProperty(props[i3].substr(0, 2) === "--" ? props[i3] : props[i3].replace(_capsExp, "-$1").toLowerCase());
    } else if (props[i3 + 1] === 2) {
      target[props[i3]](props[i3 + 2]);
    } else {
      target[props[i3]] = props[i3 + 2];
    }
  }
  if (this.tfm) {
    for (p3 in this.tfm) {
      cache[p3] = this.tfm[p3];
    }
    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }
    i3 = _reverting2();
    if ((!i3 || !i3.isStart) && !style[_transformProp]) {
      _removeIndependentTransforms(style);
      if (cache.zOrigin && style[_transformOriginProp]) {
        style[_transformOriginProp] += " " + cache.zOrigin + "px";
        cache.zOrigin = 0;
        cache.renderTransform();
      }
      cache.uncache = 1;
    }
  }
};
var _getStyleSaver = function _getStyleSaver2(target, properties) {
  var saver = {
    target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || gsap.core.getCache(target);
  properties && target.style && target.nodeType && properties.split(",").forEach(function(p3) {
    return saver.save(p3);
  });
  return saver;
};
var _supports3D;
var _createElement = function _createElement2(type, ns) {
  var e3 = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
  return e3 && e3.style ? e3 : _doc2.createElement(type);
};
var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
};
var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
  var e3 = element || _tempDiv, s3 = e3.style, i3 = 5;
  if (property in s3 && !preferPrefix) {
    return property;
  }
  property = property.charAt(0).toUpperCase() + property.substr(1);
  while (i3-- && !(_prefixes[i3] + property in s3)) {
  }
  return i3 < 0 ? null : (i3 === 3 ? "ms" : i3 >= 0 ? _prefixes[i3] : "") + property;
};
var _initCore = function _initCore2() {
  if (_windowExists3() && window.document) {
    _win2 = window;
    _doc2 = _win2.document;
    _docElement = _doc2.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
    _supports3D = !!_checkPropPrefix("perspective");
    _reverting2 = gsap.core.reverting;
    _pluginInitted = 1;
  }
};
var _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
  var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
  clone.style.display = "block";
  svg.appendChild(clone);
  _docElement.appendChild(svg);
  try {
    bbox = clone.getBBox();
  } catch (e3) {
  }
  svg.removeChild(clone);
  _docElement.removeChild(svg);
  return bbox;
};
var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
  var i3 = attributesArray.length;
  while (i3--) {
    if (target.hasAttribute(attributesArray[i3])) {
      return target.getAttribute(attributesArray[i3]);
    }
  }
};
var _getBBox = function _getBBox2(target) {
  var bounds, cloned;
  try {
    bounds = target.getBBox();
  } catch (error) {
    bounds = _getReparentedCloneBBox(target);
    cloned = 1;
  }
  bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
};
var _isSVG = function _isSVG2(e3) {
  return !!(e3.getCTM && (!e3.parentNode || e3.ownerSVGElement) && _getBBox(e3));
};
var _removeProperty = function _removeProperty2(target, property) {
  if (property) {
    var style = target.style, first2Chars;
    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }
    if (style.removeProperty) {
      first2Chars = property.substr(0, 2);
      if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
        property = "-" + property;
      }
      style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      style.removeAttribute(property);
    }
  }
};
var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;
  plugin._props.push(property);
  return pt;
};
var _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
};
var _nonStandardLayouts = {
  grid: 1,
  flex: 1
};
var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
  var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }
  curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);
  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
  }
  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }
  if (!parent || parent === _doc2 || !parent.appendChild) {
    parent = _doc2.body;
  }
  cache = parent._gsap;
  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
    return _round(curValue / cache.width * amount);
  } else {
    if (toPercent && (property === "height" || property === "width")) {
      var v3 = target.style[property];
      target.style[property] = amount + unit;
      px = target[measureProperty];
      v3 ? target.style[property] = v3 : _removeProperty(target, property);
    } else {
      (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
    }
    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }
  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
};
var _get = function _get2(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();
  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];
    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }
  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];
    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
    }
  }
  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
};
var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
  if (!start || start === "none") {
    var p3 = _checkPropPrefix(prop, target, 1), s3 = p3 && _getComputedProperty(target, p3, 1);
    if (s3 && s3 !== start) {
      prop = p3;
      start = s3;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor");
    }
  }
  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a3, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (end.substring(0, 6) === "var(--") {
    end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
  }
  if (end === "auto") {
    startValue = target.style[prop];
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
  }
  a3 = [start, end];
  _colorStringFilter(a3);
  start = a3[0];
  end = a3[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];
  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }
      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;
        if (!endUnit) {
          endUnit = endUnit || _config.units[prop] || startUnit;
          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }
        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        }
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }
  _relExp.test(end) && (pt.e = 0);
  this._pt = pt;
  return pt;
};
var _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
};
var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
  var split = value.split(" "), x2 = split[0], y3 = split[1] || "50%";
  if (x2 === "top" || x2 === "bottom" || y3 === "left" || y3 === "right") {
    value = x2;
    x2 = y3;
    y3 = value;
  }
  split[0] = _keywordToPercent[x2] || x2;
  split[1] = _keywordToPercent[y3] || y3;
  return split.join(" ");
};
var _renderClearProps = function _renderClearProps2(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i3;
    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i3 = props.length;
      while (--i3 > -1) {
        prop = props[i3];
        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }
        _removeProperty(target, prop);
      }
    }
    if (clearTransforms) {
      _removeProperty(target, _transformProp);
      if (cache) {
        cache.svg && target.removeAttribute("transform");
        style.scale = style.rotate = style.translate = "none";
        _parseTransform(target, 1);
        cache.uncache = 1;
        _removeIndependentTransforms(style);
      }
    }
  }
};
var _specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;
      plugin._props.push(property);
      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
};
var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
var _rotationalProperties = {};
var _isNullTransform = function _isNullTransform2(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
};
var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
  var matrixString = _getComputedProperty(target, _transformProp);
  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
};
var _getMatrix = function _getMatrix2(target, force2D) {
  var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix;
    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;
    if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
      addedToDOM = 1;
      nextSibling = target.nextElementSibling;
      _docElement.appendChild(target);
    }
    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");
    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }
  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
};
var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a3 = matrix[0], b2 = matrix[1], c3 = matrix[2], d3 = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x2, y3;
  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a3 * d3 - b2 * c3)) {
    x2 = xOrigin * (d3 / determinant) + yOrigin * (-c3 / determinant) + (c3 * ty - d3 * tx) / determinant;
    y3 = xOrigin * (-b2 / determinant) + yOrigin * (a3 / determinant) - (a3 * ty - b2 * tx) / determinant;
    xOrigin = x2;
    yOrigin = y3;
  }
  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a3 + ty * c3) - tx;
    cache.yOffset = yOffsetOld + (tx * b2 + ty * d3) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }
  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px";
  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
};
var _parseTransform = function _parseTransform2(target, uncache) {
  var cache = target._gsap || new GSCache(target);
  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }
  var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x2, y3, z3, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a3, b2, c3, d3, a12, a22, t1, t22, t3, a13, a23, a33, a42, a43, a32;
  x2 = y3 = z3 = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  if (cs.translate) {
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
    }
    style.scale = style.rotate = style.translate = "none";
  }
  matrix = _getMatrix(target, cache.svg);
  if (cache.svg) {
    if (cache.uncache) {
      t22 = target.getBBox();
      origin = cache.xOrigin - t22.x + "px " + (cache.yOrigin - t22.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin");
    }
    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }
  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;
  if (matrix !== _identity2DMatrix) {
    a3 = matrix[0];
    b2 = matrix[1];
    c3 = matrix[2];
    d3 = matrix[3];
    x2 = a12 = matrix[4];
    y3 = a22 = matrix[5];
    if (matrix.length === 6) {
      scaleX = Math.sqrt(a3 * a3 + b2 * b2);
      scaleY = Math.sqrt(d3 * d3 + c3 * c3);
      rotation = a3 || b2 ? _atan2(b2, a3) * _RAD2DEG : 0;
      skewX = c3 || d3 ? _atan2(c3, d3) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
      if (cache.svg) {
        x2 -= xOrigin - (xOrigin * a3 + yOrigin * c3);
        y3 -= yOrigin - (xOrigin * b2 + yOrigin * d3);
      }
    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x2 = matrix[12];
      y3 = matrix[13];
      z3 = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t22 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t22;
        a32 = t3;
      }
      angle = _atan2(-c3, a33);
      rotationY = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a3 * cos - a13 * sin;
        t22 = b2 * cos - a23 * sin;
        t3 = c3 * cos - a33 * sin;
        a43 = d3 * sin + a43 * cos;
        a3 = t1;
        b2 = t22;
        c3 = t3;
      }
      angle = _atan2(b2, a3);
      rotation = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a3 * cos + b2 * sin;
        t22 = a12 * cos + a22 * sin;
        b2 = b2 * cos - a3 * sin;
        a22 = a22 * cos - a12 * sin;
        a3 = t1;
        a12 = t22;
      }
      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }
      scaleX = _round(Math.sqrt(a3 * a3 + b2 * b2 + c3 * c3));
      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }
    if (cache.svg) {
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }
  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }
  uncache = uncache || cache.uncache;
  cache.x = x2 - ((cache.xPercent = x2 && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x2) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y3 - ((cache.yPercent = y3 && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y3) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z3 + px;
  cache.scaleX = _round(scaleX);
  cache.scaleY = _round(scaleY);
  cache.rotation = _round(rotation) + deg;
  cache.rotationX = _round(rotationX) + deg;
  cache.rotationY = _round(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;
  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }
  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
};
var _firstTwoOnly = function _firstTwoOnly2(value) {
  return (value = value.split(" "))[0] + " " + value[1];
};
var _addPxTranslate = function _addPxTranslate2(target, start, value) {
  var unit = getUnit(start);
  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
};
var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;
  _renderCSSTransforms(ratio, cache);
};
var _zeroDeg = "0deg";
var _zeroPx = "0px";
var _endParenthesis = ") ";
var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
  var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x2 = _ref.x, y3 = _ref.y, z3 = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x2 = _addPxTranslate(target, x2, a13 * cos * -zOrigin);
    y3 = _addPxTranslate(target, y3, -Math.sin(angle) * -zOrigin);
    z3 = _addPxTranslate(target, z3, a33 * cos * -zOrigin + zOrigin);
  }
  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }
  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }
  if (use3D || x2 !== _zeroPx || y3 !== _zeroPx || z3 !== _zeroPx) {
    transforms += z3 !== _zeroPx || use3D ? "translate3d(" + x2 + ", " + y3 + ", " + z3 + ") " : "translate(" + x2 + ", " + y3 + _endParenthesis;
  }
  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }
  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }
  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }
  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }
  target.style[_transformProp] = transforms || "translate(0, 0)";
};
var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
  var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x2 = _ref2.x, y3 = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x2), ty = parseFloat(y3), a11, a21, a12, a22, temp;
  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);
  if (skewY) {
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }
  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;
    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;
      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }
    a11 = _round(a11);
    a21 = _round(a21);
    a12 = _round(a12);
    a22 = _round(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }
  if (tx && !~(x2 + "").indexOf("px") || ty && !~(y3 + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x2, "px");
    ty = _convertToUnit(target, "y", y3, "px");
  }
  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }
  if (xPercent || yPercent) {
    temp = target.getBBox();
    tx = _round(tx + xPercent / 100 * temp.width);
    ty = _round(ty + yPercent / 100 * temp.height);
  }
  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp);
};
var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
  var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
  if (isString) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";
  plugin._props.push(property);
  return pt;
};
var _assign = function _assign2(target, source) {
  for (var p3 in source) {
    target[p3] = source[p3];
  }
  return target;
};
var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
  var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p3, startValue, endValue, startNum, endNum, startUnit, endUnit;
  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    _removeProperty(target, _transformProp);
    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }
  for (p3 in _transformProps) {
    startValue = startCache[p3];
    endValue = endCache[p3];
    if (startValue !== endValue && exclude.indexOf(p3) < 0) {
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p3, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p3, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;
      plugin._props.push(p3);
    }
  }
  _assign(endCache, startCache);
};
_forEachName("padding,margin,Width,Radius", function(name, index) {
  var t3 = "Top", r3 = "Right", b2 = "Bottom", l3 = "Left", props = (index < 3 ? [t3, r3, b2, l3] : [t3 + l3, t3 + r3, b2 + r3, b2 + l3]).map(function(side) {
    return index < 2 ? name + side : "border" + side + name;
  });
  _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
    var a3, vars;
    if (arguments.length < 4) {
      a3 = props.map(function(prop) {
        return _get(plugin, prop, property);
      });
      vars = a3.join(" ");
      return vars.split(a3[0]).length === 5 ? a3[0] : vars;
    }
    a3 = (endValue + "").split(" ");
    vars = {};
    props.forEach(function(prop, i3) {
      return vars[prop] = a3[i3] = a3[i3] || a3[(i3 - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init3(target, vars, tween, index, targets) {
    var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p3, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps, finalTransformValue;
    _pluginInitted || _initCore();
    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p3 in vars) {
      if (p3 === "autoRound") {
        continue;
      }
      endValue = vars[p3];
      if (_plugins[p3] && _checkPlugin(p3, vars, tween, index, target, targets)) {
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p3];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p3, endValue, tween) && (hasPriority = 1);
      } else if (p3.substr(0, 2) === "--") {
        startValue = (getComputedStyle(target).getPropertyValue(p3) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p3, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        }
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p3);
        props.push(p3);
        inlineProps.push(p3, 0, style[p3]);
      } else if (type !== "undefined") {
        if (startAt && p3 in startAt) {
          startValue = typeof startAt[p3] === "function" ? startAt[p3].call(tween, index, target, targets) : startAt[p3];
          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p3] || getUnit(_get(target, p3)) || "");
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p3));
        } else {
          startValue = _get(target, p3);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p3 in _propertyAliases) {
          if (p3 === "autoAlpha") {
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p3 !== "scale" && p3 !== "transform") {
            p3 = _propertyAliases[p3];
            ~p3.indexOf(",") && (p3 = p3.split(",")[0]);
          }
        }
        isTransformRelated = p3 in _transformProps;
        if (isTransformRelated) {
          this.styles.save(p3);
          finalTransformValue = endValue;
          if (type === "string" && endValue.substring(0, 6) === "var(--") {
            endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
            if (endValue.substring(0, 5) === "calc(") {
              var origPerspective = target.style.perspective;
              target.style.perspective = endValue;
              endValue = _getComputedProperty(target, "perspective");
              origPerspective ? target.style.perspective = origPerspective : _removeProperty(target, "perspective");
            }
            endNum = parseFloat(endValue);
          }
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
            transformPropTween.dep = 1;
          }
          if (p3 === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p3);
            p3 += "X";
          } else if (p3 === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue);
            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0;
              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p3, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p3 === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p3 in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p3, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
            continue;
          } else if (p3 === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p3 === "force3D") {
            cache[p3] = endValue;
            continue;
          } else if (p3 === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p3 in style)) {
          p3 = _checkPropPrefix(p3) || p3;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p3 in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0);
          endUnit = getUnit(endValue) || (p3 in _config.units ? _config.units[p3] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p3, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p3, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p3 === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (isTransformRelated && finalTransformValue !== endValue) {
            this._pt.b = startValue;
            this._pt.e = finalTransformValue;
            this._pt.r = _renderCSSPropWithBeginningAndEnd;
          } else if (startUnit !== endUnit && endUnit !== "%") {
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p3 in style)) {
          if (p3 in target) {
            this.add(target, p3, startValue || target[p3], relative ? relative + endValue : endValue, index, targets);
          } else if (p3 !== "parseTransform") {
            _missingPlugin(p3, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p3, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p3 in style ? inlineProps.push(p3, 0, style[p3]) : typeof target[p3] === "function" ? inlineProps.push(p3, 2, target[p3]()) : inlineProps.push(p3, 1, startValue || target[p3]));
        props.push(p3);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  render: function render2(ratio, data) {
    if (data.tween._time || !_reverting2()) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    var p3 = _propertyAliases[property];
    p3 && p3.indexOf(",") < 0 && (property = p3);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty,
    _getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;
gsap.core.getStyleSaver = _getStyleSaver;
(function(positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function(name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function(name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
  _config.units[name] = "px";
});
gsap.registerPlugin(CSSPlugin);

// node_modules/gsap/index.js
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
var TweenMaxWithCSS = gsapWithCSS.core.Tween;

// client/src/ui/DefeatEffect.tsx
function DefeatEffect({ fxKey, x: x2, y: y3, src, onRemove }) {
  const rootRef = A2(null);
  const imgRef = A2(null);
  const ringRef = A2(null);
  const onRemoveRef = A2(onRemove);
  onRemoveRef.current = onRemove;
  y2(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const ring = ringRef.current;
    if (!root || !img || !ring) return;
    let tl = null;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onRemoveRef.current(fxKey);
    };
    const raf = requestAnimationFrame(() => {
      gsapWithCSS.set([img, ring], { transformOrigin: "50% 50%" });
      gsapWithCSS.set(img, { scale: 1, opacity: 1, rotation: 0, clearProps: "filter" });
      gsapWithCSS.set(ring, { scale: 1, opacity: 0.95 });
      tl = gsapWithCSS.timeline({
        onComplete: finish,
        defaults: { overwrite: "auto" }
      });
      tl.to(img, { scale: 1.2, duration: 0.12, ease: "power2.out" }).to(
        img,
        {
          scale: 0.05,
          opacity: 0,
          rotation: 40,
          duration: 0.5,
          ease: "power3.in"
        },
        "<0.03"
      ).to(
        ring,
        {
          scale: 3,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out"
        },
        0
      );
    });
    return () => {
      cancelAnimationFrame(raf);
      if (tl) tl.kill();
      if (!done) finish();
    };
  }, [fxKey]);
  return /* @__PURE__ */ u3(
    "div",
    {
      ref: rootRef,
      class: "absolute pointer-events-none flex items-center justify-center z-[60]",
      style: { left: x2, top: y3, transform: "translate(-50%, -50%)" },
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ u3(
          "div",
          {
            ref: ringRef,
            class: "absolute rounded-full border-2 border-amber-300 w-16 h-16 shadow-[0_0_24px_rgba(251,191,36,0.95)]"
          }
        ),
        /* @__PURE__ */ u3(
          "img",
          {
            ref: imgRef,
            src,
            alt: "",
            class: "relative h-12 w-auto max-w-[80px] object-contain drop-shadow-lg",
            draggable: false
          }
        )
      ]
    }
  );
}

// client/src/ui/DPad.tsx
function Btn({
  label,
  sub,
  onClick,
  disabled,
  rounded
}) {
  return /* @__PURE__ */ u3(
    "button",
    {
      type: "button",
      disabled,
      onClick: () => !disabled && onClick(),
      class: `flex flex-col items-center justify-center border border-amber-500/60 bg-slate-900/90 text-amber-100 shadow-inner transition hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${rounded} min-w-[3rem] min-h-[2.5rem] touch-manipulation select-none`,
      "aria-label": label,
      children: [
        /* @__PURE__ */ u3("span", { class: "text-lg leading-none", children: label }),
        sub ? /* @__PURE__ */ u3("span", { class: "text-[10px] text-slate-400 mt-0.5", children: sub }) : null
      ]
    }
  );
}
function DPad({ onDirection, disabled, variant = "cross", className = "" }) {
  const v3 = variant === "vertical";
  return /* @__PURE__ */ u3(
    "div",
    {
      class: `inline-grid gap-1 ${v3 ? "grid-cols-1" : "grid-cols-3"} place-items-center ${className}`,
      role: "group",
      "aria-label": "\u5341\u5B57\u30AD\u30FC\uFF08\u753B\u9762\u64CD\u4F5C\uFF09",
      children: [
        !v3 && /* @__PURE__ */ u3("div", { class: "col-start-2", children: /* @__PURE__ */ u3(Btn, { label: "\u4E0A", sub: "W", onClick: () => onDirection("up"), disabled, rounded: "rounded-lg" }) }),
        v3 && /* @__PURE__ */ u3(Btn, { label: "\u4E0A", sub: "W", onClick: () => onDirection("up"), disabled, rounded: "rounded-lg" }),
        !v3 && /* @__PURE__ */ u3(S, { children: [
          /* @__PURE__ */ u3(Btn, { label: "\u5DE6", sub: "A", onClick: () => onDirection("left"), disabled, rounded: "rounded-lg" }),
          /* @__PURE__ */ u3("div", { class: "w-12 h-10 rounded-lg border border-dashed border-slate-600 bg-slate-950/50 flex items-center justify-center text-[10px] text-slate-500", children: "WASD" }),
          /* @__PURE__ */ u3(Btn, { label: "\u53F3", sub: "D", onClick: () => onDirection("right"), disabled, rounded: "rounded-lg" })
        ] }),
        /* @__PURE__ */ u3("div", { class: v3 ? "" : "col-start-2", children: /* @__PURE__ */ u3(Btn, { label: "\u4E0B", sub: "S", onClick: () => onDirection("down"), disabled, rounded: "rounded-lg" }) })
      ]
    }
  );
}

// client/src/ui/Game.tsx
var PAUSE_MENU = [
  { id: "resume", label: "RESUME" },
  { id: "quit", label: "QUIT TO TITLE" }
];
function laneTopPct(lane) {
  return 18 + lane * 16;
}
function GamePlay({ words, mode, startStage, onFinish }) {
  const fieldRef = A2(null);
  const engineRef = A2(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine(mode, startStage, words);
  }
  const [, setTick] = d2(0);
  const [pauseIdx, setPauseIdx] = d2(0);
  const pauseIdxRef = A2(0);
  pauseIdxRef.current = pauseIdx;
  const finishedRef = A2(false);
  const prevPhaseRef = A2(engineRef.current.snapshot(800, 440).phase);
  const unlockedRef = A2(/* @__PURE__ */ new Set());
  const keysHeld = A2(/* @__PURE__ */ new Set());
  const [deathFx, setDeathFx] = d2([]);
  const deathKey = A2(0);
  const removeDeathFx = q2((k3) => {
    setDeathFx((xs) => xs.filter((z3) => z3.key !== k3));
  }, []);
  const safeUnlock = (id) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    void unlockAchievement(id).catch(() => {
    });
  };
  const pushDeathFx = (m3, playHeight) => {
    deathKey.current += 1;
    const fx = {
      id: m3.id,
      x: m3.x,
      yPx: laneCenterYpx(m3.lane, playHeight),
      src: monsterImagePath(m3),
      key: `d-${deathKey.current}`
    };
    safeUnlock("first_blood");
    setDeathFx((xs) => [...xs, fx]);
  };
  y2(() => {
    const down = (e3) => {
      const k3 = e3.key.length === 1 ? e3.key.toLowerCase() : e3.key;
      keysHeld.current.add(k3);
    };
    const up = (e3) => {
      const k3 = e3.key.length === 1 ? e3.key.toLowerCase() : e3.key;
      keysHeld.current.delete(k3);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  y2(() => {
    const eng = engineRef.current;
    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1e3);
      last = now;
      const w4 = fieldRef.current?.clientWidth ?? 800;
      const h4 = fieldRef.current?.clientHeight ?? 440;
      for (const m3 of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m3, h4);
      }
      const beforeSnap = eng.snapshot(w4, h4);
      if (beforeSnap.phase === "playing" && !beforeSnap.paused && !beforeSnap.targetId) {
        const v3 = 300 * dt;
        if (keysHeld.current.has("a") || keysHeld.current.has("arrowleft")) {
          eng.moveCrosshair(-v3, 0, w4, h4);
        }
        if (keysHeld.current.has("d") || keysHeld.current.has("arrowright")) {
          eng.moveCrosshair(v3, 0, w4, h4);
        }
        if (keysHeld.current.has("w") || keysHeld.current.has("arrowup")) {
          eng.moveCrosshair(0, -v3, w4, h4);
        }
        if (keysHeld.current.has("s") || keysHeld.current.has("arrowdown")) {
          eng.moveCrosshair(0, v3, w4, h4);
        }
      }
      eng.step(dt, now, w4, h4);
      for (const m3 of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m3, h4);
      }
      const s4 = eng.snapshot(w4, h4);
      if (s4.killTimes.length >= 3) safeUnlock("speed_demon");
      const pp = prevPhaseRef.current;
      if (pp === "playing" && s4.phase === "interwave" && s4.lastWaveWasPerfect) {
        safeUnlock("perfect_wave");
      }
      if (s4.mode === "endless" && s4.waveGlobal >= 50) {
        safeUnlock("wave_survivor_50");
      }
      if (s4.phase === "ending") {
        safeUnlock("fortress_guardian");
      }
      prevPhaseRef.current = s4.phase;
      if ((s4.phase === "gameover" || s4.phase === "ending") && !finishedRef.current) {
        finishedRef.current = true;
        const acc = s4.totalTyped > 0 ? s4.correctTyped / s4.totalTyped : 0;
        const timeSec = Math.floor((Date.now() - eng.startTime) / 1e3);
        onFinish({
          outcome: s4.phase === "ending" ? "ending" : "gameover",
          score: s4.score,
          waveReached: s4.waveGlobal,
          accuracy: acc,
          timeSec,
          mode: s4.mode,
          stage: s4.stage
        });
      }
      setTick((x2) => x2 + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);
  const w3 = fieldRef.current?.clientWidth ?? 800;
  const h3 = fieldRef.current?.clientHeight ?? 440;
  const s3 = engineRef.current.snapshot(w3, h3);
  const locked = s3.monsters.find((m3) => m3.id === s3.targetId) ?? null;
  y2(() => {
    const eng = engineRef.current;
    const onKey = (e3) => {
      const sw = fieldRef.current?.clientWidth ?? 800;
      const sh = fieldRef.current?.clientHeight ?? 440;
      const snap3 = eng.snapshot(sw, sh);
      if (finishedRef.current) return;
      if (snap3.phase === "paused") {
        if (e3.key === "ArrowUp" || e3.key === "w" || e3.key === "W") {
          e3.preventDefault();
          setPauseIdx((x2) => (x2 - 1 + PAUSE_MENU.length) % PAUSE_MENU.length);
        }
        if (e3.key === "ArrowDown" || e3.key === "s" || e3.key === "S") {
          e3.preventDefault();
          setPauseIdx((x2) => (x2 + 1) % PAUSE_MENU.length);
        }
        if (e3.key === "Enter") {
          e3.preventDefault();
          const pi = pauseIdxRef.current;
          if (pi === 0) {
            eng.togglePause();
            setPauseIdx(0);
          } else {
            finishedRef.current = true;
            const acc = snap3.totalTyped > 0 ? snap3.correctTyped / snap3.totalTyped : 0;
            const timeSec = Math.floor((Date.now() - eng.startTime) / 1e3);
            onFinish({
              outcome: "quit",
              score: snap3.score,
              waveReached: snap3.waveGlobal,
              accuracy: acc,
              timeSec,
              mode: snap3.mode,
              stage: snap3.stage
            });
          }
        }
        if (e3.key === "Escape") {
          e3.preventDefault();
          eng.togglePause();
          setPauseIdx(0);
        }
        return;
      }
      if (snap3.phase === "playing" && !snap3.paused) {
        if (e3.key === "Escape") {
          e3.preventDefault();
          eng.togglePause();
          setPauseIdx(0);
          return;
        }
        if (!snap3.targetId) {
          if (e3.key === "Enter") {
            e3.preventDefault();
            if (!e3.repeat) eng.tryBeginTyping(sw, sh);
          }
          return;
        }
        if (e3.key === "Backspace") {
          e3.preventDefault();
          eng.cancelTyping();
          return;
        }
        if (e3.key.length === 1) {
          const ch = e3.key.toLowerCase();
          if (ch >= "a" && ch <= "z") {
            e3.preventDefault();
            eng.keyDown(e3.key, performance.now(), sw);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFinish]);
  const hearts = Array.from({ length: s3.maxHp }, (_2, i3) => i3 < s3.fortressHp);
  return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col", children: [
    /* @__PURE__ */ u3("header", { class: "flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80 shrink-0", children: [
      /* @__PURE__ */ u3("div", { class: "flex gap-1", "aria-label": "\u8981\u585EHP", children: hearts.map((ok, i3) => /* @__PURE__ */ u3("span", { class: ok ? "text-red-500 text-xl" : "text-slate-700 text-xl", children: "\u2665" }, i3)) }),
      /* @__PURE__ */ u3("div", { class: "font-mono text-amber-300 text-sm flex-1", children: [
        s3.mode === "story" ? `STAGE ${s3.stage} \xB7 WAVE ${s3.waveInStage}/10` : `WAVE ${s3.waveGlobal}`,
        /* @__PURE__ */ u3("span", { class: "text-slate-500 ml-2", children: [
          "\xB7 W#",
          s3.waveGlobal
        ] })
      ] }),
      /* @__PURE__ */ u3("div", { class: "font-mono text-emerald-400", children: [
        "SCORE ",
        s3.score
      ] }),
      /* @__PURE__ */ u3("div", { class: "font-mono text-slate-500 text-xs", children: [
        "COMBO \xD7",
        s3.combo
      ] }),
      /* @__PURE__ */ u3("div", { class: "text-slate-500 text-xs hidden sm:block", children: "[Esc] \u30DD\u30FC\u30BA" })
    ] }),
    /* @__PURE__ */ u3(
      "div",
      {
        ref: fieldRef,
        class: "relative flex-1 min-h-[280px] bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden mx-2 mt-2 rounded-lg border border-slate-800",
        children: [
          s3.phase === "announce" ? /* @__PURE__ */ u3("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ u3("div", { class: "text-center", children: [
            /* @__PURE__ */ u3("div", { class: "text-3xl font-black text-amber-400 drop-shadow-lg", children: s3.announceLabel }),
            /* @__PURE__ */ u3("div", { class: "text-slate-400 mt-2 font-mono", children: Math.ceil(s3.phaseTimer) })
          ] }) }) : null,
          s3.phase === "interwave" ? /* @__PURE__ */ u3("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ u3("div", { class: "text-center", children: [
            /* @__PURE__ */ u3("div", { class: "text-xl font-bold text-slate-300", children: "INTERVAL" }),
            /* @__PURE__ */ u3("div", { class: "text-slate-500 mt-2 text-sm", children: [
              "\u6B21\u306E\u30A6\u30A7\u30FC\u30D6\u307E\u3067\u2026 ",
              Math.ceil(s3.phaseTimer),
              "s"
            ] })
          ] }) }) : null,
          s3.phase === "paused" ? /* @__PURE__ */ u3("div", { class: "absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 gap-6 px-4", children: [
            /* @__PURE__ */ u3("div", { class: "text-4xl font-black tracking-widest text-amber-200", children: "PAUSED" }),
            /* @__PURE__ */ u3("div", { class: "flex flex-col gap-2 w-full max-w-xs", children: PAUSE_MENU.map((it, idx) => /* @__PURE__ */ u3(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (it.id === "resume") {
                    engineRef.current.togglePause();
                    setPauseIdx(0);
                  } else {
                    finishedRef.current = true;
                    const eng = engineRef.current;
                    const sw = fieldRef.current?.clientWidth ?? 800;
                    const sh = fieldRef.current?.clientHeight ?? 440;
                    const sh2 = eng.snapshot(sw, sh);
                    const acc = sh2.totalTyped > 0 ? sh2.correctTyped / sh2.totalTyped : 0;
                    onFinish({
                      outcome: "quit",
                      score: sh2.score,
                      waveReached: sh2.waveGlobal,
                      accuracy: acc,
                      timeSec: Math.floor((Date.now() - eng.startTime) / 1e3),
                      mode: sh2.mode,
                      stage: sh2.stage
                    });
                  }
                },
                class: `rounded-xl border px-4 py-3 font-mono text-left w-full ${idx === pauseIdx ? "border-amber-400 bg-amber-500/15 text-amber-100" : "border-slate-600 bg-slate-900/60"}`,
                children: [
                  "[",
                  it.label,
                  "]"
                ]
              },
              it.id
            )) }),
            /* @__PURE__ */ u3("div", { class: "flex flex-col sm:flex-row items-start gap-4 w-full max-w-lg justify-center", children: [
              /* @__PURE__ */ u3(ControlsHelp, { variant: "game_pause", className: "flex-1 max-w-md" }),
              /* @__PURE__ */ u3("div", { class: "flex flex-col items-center gap-2 mx-auto sm:mx-0", children: [
                /* @__PURE__ */ u3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
                /* @__PURE__ */ u3(
                  DPad,
                  {
                    variant: "vertical",
                    onDirection: (d3) => {
                      if (d3 === "up") setPauseIdx((x2) => (x2 - 1 + PAUSE_MENU.length) % PAUSE_MENU.length);
                      if (d3 === "down") setPauseIdx((x2) => (x2 + 1) % PAUSE_MENU.length);
                    }
                  }
                )
              ] })
            ] })
          ] }) : null,
          /* @__PURE__ */ u3("div", { class: "absolute left-2 z-[5] text-2xl select-none", style: { top: `${laneTopPct(1)}%`, transform: "translateY(-50%)" }, "aria-hidden": true, children: "\u25A3" }),
          /* @__PURE__ */ u3(
            "div",
            {
              class: "absolute left-10 z-[5] text-xs text-slate-500 -rotate-90 origin-left",
              style: { top: `${laneTopPct(1)}%`, transform: "translateY(-50%)" },
              children: "\u8981\u585E"
            }
          ),
          deathFx.map((fx) => /* @__PURE__ */ u3(
            DefeatEffect,
            {
              fxKey: fx.key,
              x: fx.x,
              y: fx.yPx,
              src: fx.src,
              onRemove: removeDeathFx
            },
            fx.key
          )),
          s3.phase === "playing" && !s3.paused ? /* @__PURE__ */ u3(
            "div",
            {
              class: `absolute z-[25] pointer-events-none flex flex-col items-center ${s3.targetId ? "opacity-40" : ""}`,
              style: {
                left: `${s3.crosshairX}px`,
                top: `${s3.crosshairY}px`,
                transform: "translate(-50%, -50%)"
              },
              "aria-hidden": true,
              children: [
                /* @__PURE__ */ u3("div", { class: "relative h-[4.5rem] w-[4.5rem] flex items-center justify-center", children: [
                  /* @__PURE__ */ u3("div", { class: "absolute inset-0 rounded-full border-2 border-cyan-400/90 shadow-[0_0_14px_rgba(34,211,238,0.55)]" }),
                  /* @__PURE__ */ u3("div", { class: "absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400/80 -translate-x-1/2" }),
                  /* @__PURE__ */ u3("div", { class: "absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/80 -translate-y-1/2" })
                ] }),
                /* @__PURE__ */ u3("span", { class: "mt-0.5 text-[10px] font-bold text-cyan-300 tracking-wider", children: "AIM" })
              ]
            }
          ) : null,
          s3.monsters.map((m3) => {
            const lockedHere = m3.id === s3.targetId;
            const hoverHere = !s3.targetId && m3.id === s3.hoverTargetId;
            const topPct = laneTopPct(m3.lane);
            return /* @__PURE__ */ u3(
              "div",
              {
                class: `absolute flex flex-col items-center gap-0.5 transition-[left] duration-75 z-10 ${lockedHere ? "ring-2 ring-amber-400 rounded-xl p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.45)]" : hoverHere ? "ring-2 ring-cyan-400/80 rounded-xl p-0.5" : "opacity-95"}`,
                style: { left: `${m3.x}px`, top: `${topPct}%`, transform: "translate(-50%, -50%)" },
                children: [
                  lockedHere ? /* @__PURE__ */ u3("span", { class: "text-[9px] font-bold uppercase text-amber-300", children: "LOCK" }) : hoverHere ? /* @__PURE__ */ u3("span", { class: "text-[9px] font-bold uppercase text-cyan-300", children: "AIM" }) : null,
                  /* @__PURE__ */ u3(
                    "img",
                    {
                      src: monsterImagePath(m3),
                      alt: "",
                      class: `h-11 sm:h-12 w-auto max-w-[72px] object-contain select-none ${m3.isRare ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : ""}`,
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ u3(
                    "span",
                    {
                      class: `font-mono text-[10px] sm:text-xs px-1.5 py-0.5 rounded max-w-[min(220px,70vw)] break-all text-center leading-tight ${lockedHere ? "bg-amber-950/95 border border-amber-400 text-amber-50" : "bg-slate-900/95 border border-slate-600 text-slate-100"}`,
                      children: [
                        lockedHere ? /* @__PURE__ */ u3(S, { children: [
                          /* @__PURE__ */ u3("span", { class: "text-emerald-400 font-semibold", children: m3.word.slice(0, s3.inputBuffer.length) }),
                          /* @__PURE__ */ u3("span", { class: "text-slate-200", children: m3.word.slice(s3.inputBuffer.length) })
                        ] }) : m3.word,
                        m3.isRare ? /* @__PURE__ */ u3("span", { class: "ml-1 text-yellow-300 font-bold", children: "RARE" }) : null,
                        m3.isBoss ? /* @__PURE__ */ u3("span", { class: "text-red-400 ml-1", children: [
                          "(",
                          m3.hp,
                          "/",
                          m3.maxHp,
                          ")"
                        ] }) : null
                      ]
                    }
                  )
                ]
              },
              m3.id
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ u3("footer", { class: "shrink-0 border-t border-slate-800 bg-slate-900/90 px-4 py-3 space-y-3", children: [
      /* @__PURE__ */ u3("div", { class: "rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2", children: [
        /* @__PURE__ */ u3("div", { class: "text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1", children: "\u3044\u307E\u6253\u3063\u3066\u3044\u308B\u5358\u8A9E" }),
        locked ? /* @__PURE__ */ u3("div", { class: "text-slate-400 text-sm", children: [
          "\u30BF\u30A4\u30D7\u306E\u9032\u6357\u306F\u3001",
          /* @__PURE__ */ u3("span", { class: "text-amber-200 font-medium", children: "\u753B\u9762\u4E0A\u306E\u6575\u306E\u4E0B\u306E\u5358\u8A9E" }),
          "\u304C\u7DD1\u8272\u306B\u4F38\u3073\u3066\u3044\u304D\u307E\u3059\u3002"
        ] }) : /* @__PURE__ */ u3("div", { class: "text-slate-500 text-sm", children: "\u7167\u6E96\u3092\u5408\u308F\u305B\u3066 Enter \u3067\u30ED\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002" })
      ] }),
      /* @__PURE__ */ u3("div", { class: "mt-2 flex flex-col sm:flex-row gap-4 items-start justify-between", children: [
        /* @__PURE__ */ u3(ControlsHelp, { variant: "game", className: "flex-1 max-w-lg" }),
        /* @__PURE__ */ u3("p", { class: "text-[10px] text-slate-600 max-w-md sm:max-w-xs leading-relaxed", children: [
          "WASD\uFF08\u9577\u62BC\u3057\u53EF\uFF09\u3067\u7167\u6E96\u3092\u6ED1\u3089\u304B\u306B\u79FB\u52D5 \xB7",
          " ",
          /* @__PURE__ */ u3("span", { class: "text-cyan-300/90 font-semibold", children: "Enter" }),
          " \u3067\u30ED\u30C3\u30AF\u3002 \u6483\u7834\u6642\u306F\u30EA\u30F3\u30B0\u62E1\u6563\u3068\u30B9\u30D7\u30E9\u30A4\u30C8\u306E\u7E2E\u5C0F\u30A2\u30CB\u30E1\uFF08GSAP\uFF09\u304C\u6700\u524D\u9762\u306B\u8868\u793A\u3055\u308C\u307E\u3059\u3002"
        ] })
      ] })
    ] })
  ] });
}

// client/src/ui/Result.tsx
var MENU = [
  { id: "retry", label: "RETRY" },
  { id: "title", label: "TITLE" }
];
function Result({
  data,
  onRetry,
  onTitle,
  onSubmitEndless,
  onSubmitStory
}) {
  const [i3, setI] = d2(0);
  const [name, setName] = d2("AAA");
  const [submitted, setSubmitted] = d2(false);
  const [busy, setBusy] = d2(false);
  const [err, setErr] = d2(null);
  const showEndlessSubmit = data.outcome === "gameover" && data.mode === "endless" && onSubmitEndless;
  const showStorySubmit = data.outcome === "ending" && onSubmitStory;
  const move = (d3) => {
    if (d3 === "up") setI((x2) => (x2 - 1 + MENU.length) % MENU.length);
    if (d3 === "down") setI((x2) => (x2 + 1) % MENU.length);
  };
  y2(() => {
    const onKey = (e3) => {
      const t3 = e3.target;
      if (t3 && (t3.tagName === "INPUT" || t3.tagName === "TEXTAREA")) return;
      if (e3.key === "ArrowUp" || e3.key === "w" || e3.key === "W") {
        e3.preventDefault();
        move("up");
      }
      if (e3.key === "ArrowDown" || e3.key === "s" || e3.key === "S") {
        e3.preventDefault();
        move("down");
      }
      if (e3.key === "Enter") {
        e3.preventDefault();
        if (MENU[i3].id === "retry") onRetry();
        else onTitle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i3, onRetry, onTitle]);
  const submit = async () => {
    const n2 = name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "AAA";
    setBusy(true);
    setErr(null);
    try {
      if (showEndlessSubmit && onSubmitEndless) {
        await onSubmitEndless(n2);
      } else if (showStorySubmit && onSubmitStory) {
        await onSubmitStory(n2);
      }
      setSubmitted(true);
    } catch (e3) {
      setErr(e3.message || "\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
    } finally {
      setBusy(false);
    }
  };
  const title = data.outcome === "ending" ? "STORY \u5168\u30AF\u30EA\u30A2\uFF01" : data.outcome === "quit" ? "\u4E2D\u65AD" : "GAME OVER";
  return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ u3("h2", { class: "text-4xl font-black text-amber-400 mb-2", children: title }),
    /* @__PURE__ */ u3("div", { class: "text-slate-400 mb-6 font-mono text-sm space-y-1 text-center", children: [
      /* @__PURE__ */ u3("div", { children: [
        "\u5230\u9054\u30A6\u30A7\u30FC\u30D6: ",
        data.waveReached
      ] }),
      /* @__PURE__ */ u3("div", { children: [
        "\u30B9\u30B3\u30A2: ",
        data.score
      ] }),
      /* @__PURE__ */ u3("div", { children: [
        "\u6B63\u78BA\u7387:",
        " ",
        data.accuracy > 0 ? `${(data.accuracy * 100).toFixed(1)}%` : "\u2014"
      ] }),
      data.mode === "story" ? /* @__PURE__ */ u3("div", { children: [
        "\u30D7\u30EC\u30A4\u6642\u9593: ",
        data.timeSec,
        "s"
      ] }) : null
    ] }),
    (showEndlessSubmit || showStorySubmit) && !submitted ? /* @__PURE__ */ u3("div", { class: "mb-6 flex flex-col items-center gap-2 w-full max-w-xs", children: [
      /* @__PURE__ */ u3("label", { class: "text-sm text-slate-400", children: "\u540D\u524D\uFF08\u82F1\u5927\u6587\u5B57\u30FB\u6700\u59278\uFF09" }),
      /* @__PURE__ */ u3(
        "input",
        {
          class: "w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono uppercase",
          maxLength: 8,
          value: name,
          onInput: (e3) => setName(e3.target.value.toUpperCase())
        }
      ),
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          disabled: busy,
          onClick: () => void submit(),
          class: "rounded-lg border border-amber-500 px-4 py-2 text-amber-200 hover:bg-amber-500/10 disabled:opacity-50",
          children: "\u30E9\u30F3\u30AD\u30F3\u30B0\u306B\u767B\u9332"
        }
      ),
      err ? /* @__PURE__ */ u3("p", { class: "text-red-400 text-sm", children: err }) : null
    ] }) : null,
    submitted ? /* @__PURE__ */ u3("p", { class: "text-emerald-400 text-sm mb-4", children: "\u767B\u9332\u3057\u307E\u3057\u305F" }) : null,
    /* @__PURE__ */ u3("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: MENU.map((m3, idx) => /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        onClick: () => m3.id === "retry" ? onRetry() : onTitle(),
        class: `rounded-xl border px-5 py-3 text-left font-mono ${idx === i3 ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
        children: [
          "[",
          m3.label,
          "]"
        ]
      },
      m3.id
    )) }),
    /* @__PURE__ */ u3("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ u3(ControlsHelp, { variant: "result", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ u3("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ u3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ u3(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] })
  ] });
}

// client/src/ui/Ranking.tsx
function RankingView({ onBack }) {
  const [tab, setTab] = d2("endless");
  const [endless, setEndless] = d2([]);
  const [story, setStory] = d2([]);
  const [err, setErr] = d2(null);
  y2(() => {
    let cancelled = false;
    (async () => {
      try {
        const [e3, s3] = await Promise.all([
          fetchRanking("endless"),
          fetchRanking("story")
        ]);
        if (!cancelled) {
          setEndless(e3);
          setStory(s3);
        }
      } catch (e3) {
        if (!cancelled) setErr(e3.message || "\u8AAD\u307F\u8FBC\u307F\u30A8\u30E9\u30FC");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const moveTab = (d3) => {
    if (d3 === "left" || d3 === "up") setTab("endless");
    if (d3 === "right" || d3 === "down") setTab("story");
  };
  y2(() => {
    const onKey = (e3) => {
      if (e3.key === "Escape" || e3.key === "Enter") {
        e3.preventDefault();
        onBack();
        return;
      }
      if (e3.key === "Tab") {
        e3.preventDefault();
        setTab((t3) => t3 === "endless" ? "story" : "endless");
      }
      if (e3.key === "ArrowLeft" || e3.key === "a" || e3.key === "A") {
        e3.preventDefault();
        setTab("endless");
      }
      if (e3.key === "ArrowRight" || e3.key === "d" || e3.key === "D") {
        e3.preventDefault();
        setTab("story");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);
  return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex flex-col items-center", children: [
    /* @__PURE__ */ u3("h2", { class: "text-3xl font-bold text-amber-400 mb-6", children: "RANKING" }),
    /* @__PURE__ */ u3("div", { class: "flex gap-2 mb-4", children: [
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: () => setTab("endless"),
          class: `rounded-lg px-4 py-2 border ${tab === "endless" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`,
          children: "ENDLESS"
        }
      ),
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: () => setTab("story"),
          class: `rounded-lg px-4 py-2 border ${tab === "story" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`,
          children: "STORY"
        }
      )
    ] }),
    err ? /* @__PURE__ */ u3("p", { class: "text-red-400 mb-4", children: err }) : null,
    /* @__PURE__ */ u3("div", { class: "w-full max-w-2xl overflow-x-auto rounded-lg border border-slate-700 mb-8", children: tab === "endless" ? /* @__PURE__ */ u3("table", { class: "w-full text-sm", children: [
      /* @__PURE__ */ u3("thead", { class: "bg-slate-900 text-slate-400", children: /* @__PURE__ */ u3("tr", { children: [
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "#" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "NAME" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-right", children: "SCORE" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-right", children: "WAVE" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "DATE" })
      ] }) }),
      /* @__PURE__ */ u3("tbody", { children: [
        endless.map((r3, idx) => /* @__PURE__ */ u3("tr", { class: "border-t border-slate-800", children: [
          /* @__PURE__ */ u3("td", { class: "p-2", children: idx + 1 }),
          /* @__PURE__ */ u3("td", { class: "p-2 font-mono", children: r3.name }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-right", children: r3.score }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-right", children: r3.wave }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-slate-400", children: r3.date })
        ] }, `${r3.name}-${idx}`)),
        endless.length === 0 ? /* @__PURE__ */ u3("tr", { children: /* @__PURE__ */ u3("td", { colSpan: 5, class: "p-4 text-center text-slate-500", children: "\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093" }) }) : null
      ] })
    ] }) : /* @__PURE__ */ u3("table", { class: "w-full text-sm", children: [
      /* @__PURE__ */ u3("thead", { class: "bg-slate-900 text-slate-400", children: /* @__PURE__ */ u3("tr", { children: [
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "#" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "NAME" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-right", children: "ACC" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-right", children: "TIME" }),
        /* @__PURE__ */ u3("th", { class: "p-2 text-left", children: "DATE" })
      ] }) }),
      /* @__PURE__ */ u3("tbody", { children: [
        story.map((r3, idx) => /* @__PURE__ */ u3("tr", { class: "border-t border-slate-800", children: [
          /* @__PURE__ */ u3("td", { class: "p-2", children: idx + 1 }),
          /* @__PURE__ */ u3("td", { class: "p-2 font-mono", children: r3.name }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-right", children: [
            (r3.accuracy * 100).toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-right", children: [
            r3.time_sec,
            "s"
          ] }),
          /* @__PURE__ */ u3("td", { class: "p-2 text-slate-400", children: r3.cleared_at })
        ] }, `${r3.name}-${idx}`)),
        story.length === 0 ? /* @__PURE__ */ u3("tr", { children: /* @__PURE__ */ u3("td", { colSpan: 5, class: "p-4 text-center text-slate-500", children: "\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093" }) }) : null
      ] })
    ] }) }),
    /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        onClick: onBack,
        class: "rounded-xl border border-slate-500 px-6 py-2 mb-8 hover:bg-slate-800",
        children: "TITLE \u3078\u623B\u308B"
      }
    ),
    /* @__PURE__ */ u3("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ u3(ControlsHelp, { variant: "ranking", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ u3("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ u3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u30BF\u30D6\u5207\u66FF" }),
        /* @__PURE__ */ u3(DPad, { variant: "cross", onDirection: moveTab })
      ] })
    ] })
  ] });
}

// client/src/ui/StageSelect.tsx
var STAGES = [1, 2, 3, 4, 5];
function StageSelect({ onSelect, onBack }) {
  const [i3, setI] = d2(0);
  const move = (d3) => {
    if (d3 === "up") setI((x2) => (x2 - 1 + STAGES.length + 1) % (STAGES.length + 1));
    if (d3 === "down") setI((x2) => (x2 + 1) % (STAGES.length + 1));
  };
  y2(() => {
    const onKey = (e3) => {
      if (e3.key === "Escape") {
        e3.preventDefault();
        onBack();
        return;
      }
      if (e3.key === "ArrowUp" || e3.key === "w" || e3.key === "W") {
        e3.preventDefault();
        move("up");
      }
      if (e3.key === "ArrowDown" || e3.key === "s" || e3.key === "S") {
        e3.preventDefault();
        move("down");
      }
      if (e3.key === "Enter") {
        e3.preventDefault();
        if (i3 === STAGES.length) onBack();
        else onSelect(STAGES[i3]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i3, onSelect, onBack]);
  return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ u3("h2", { class: "text-3xl font-bold text-amber-400 mb-2", children: "STORY MODE" }),
    /* @__PURE__ */ u3("p", { class: "text-slate-400 mb-8", children: "\u30B9\u30C6\u30FC\u30B8\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\uFF08\u540410\u30A6\u30A7\u30FC\u30D6\uFF09" }),
    /* @__PURE__ */ u3("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: [
      STAGES.map((s3, idx) => /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: () => onSelect(s3),
          class: `rounded-xl border px-5 py-3 text-left font-mono ${idx === i3 ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: [
            "STAGE ",
            s3
          ]
        },
        s3
      )),
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: onBack,
          class: `rounded-xl border px-5 py-3 text-left font-mono ${i3 === STAGES.length ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: "\u2190 TITLE"
        }
      )
    ] }),
    /* @__PURE__ */ u3("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ u3(ControlsHelp, { variant: "stage", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ u3("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ u3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ u3(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] })
  ] });
}

// client/src/ui/Title.tsx
var ITEMS = [
  { id: "story", label: "STORY MODE" },
  { id: "endless", label: "ENDLESS MODE" },
  { id: "ranking", label: "RANKING" }
];
function Title({ onPick }) {
  const [i3, setI] = d2(0);
  const [serverStopped, setServerStopped] = d2(false);
  const [stopBusy, setStopBusy] = d2(false);
  const move = (d3) => {
    if (d3 === "up") setI((x2) => (x2 - 1 + ITEMS.length) % ITEMS.length);
    if (d3 === "down") setI((x2) => (x2 + 1) % ITEMS.length);
  };
  y2(() => {
    const onKey = (e3) => {
      if (e3.key === "ArrowUp" || e3.key === "w" || e3.key === "W") {
        e3.preventDefault();
        move("up");
      }
      if (e3.key === "ArrowDown" || e3.key === "s" || e3.key === "S") {
        e3.preventDefault();
        move("down");
      }
      if (e3.key === "Enter") {
        e3.preventDefault();
        onPick(ITEMS[i3].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i3, onPick]);
  return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ u3("h1", { class: "text-5xl sm:text-6xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)]", children: "WORD SIEGE" }),
    /* @__PURE__ */ u3("p", { class: "text-slate-400 mb-10 text-center max-w-md", children: "\u30BF\u30A4\u30D4\u30F3\u30B0\u3067\u6575\u3092\u6483\u9000\u3059\u308B\u30BF\u30EF\u30FC\u30C7\u30A3\u30D5\u30A7\u30F3\u30B9" }),
    /* @__PURE__ */ u3("nav", { class: "flex flex-col gap-3 w-full max-w-sm mb-8", "aria-label": "\u30E1\u30A4\u30F3\u30E1\u30CB\u30E5\u30FC", children: ITEMS.map((it, idx) => /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        onClick: () => onPick(it.id),
        class: `rounded-xl border px-6 py-3 text-left font-mono tracking-wide transition ${idx === i3 ? "border-amber-400 bg-amber-500/15 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.2)]" : "border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-500"}`,
        children: [
          "[",
          it.label,
          "]"
        ]
      },
      it.id
    )) }),
    /* @__PURE__ */ u3("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ u3(ControlsHelp, { variant: "title", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ u3("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ u3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ u3(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] }),
    /* @__PURE__ */ u3("div", { class: "mt-10 w-full max-w-sm text-center border-t border-slate-800 pt-6", children: [
      /* @__PURE__ */ u3("p", { class: "text-xs text-slate-500 mb-2", children: "\u30BF\u30D6\u3092\u9589\u3058\u308B\u3068 ping \u304C\u6B62\u307E\u308A\u3001\u3057\u3070\u3089\u304F\u3059\u308B\u3068\u30B5\u30FC\u30D0\u30FC\u304C\u81EA\u52D5\u7D42\u4E86\u3057\u307E\u3059\uFF08\u30B5\u30FC\u30D0\u30FC\u7528\u306E\u9ED2\u3044\u7A93\u3082\u9589\u3058\u307E\u3059\uFF09\u3002\u3059\u3050\u6B62\u3081\u308B\u5834\u5408\u306F\u4E0B\u306E\u30DC\u30BF\u30F3\u3092\u4F7F\u3044\u307E\u3059\u3002" }),
      serverStopped ? /* @__PURE__ */ u3("p", { class: "text-sm text-amber-300/90 mb-2", children: "\u30B5\u30FC\u30D0\u30FC\u306F\u505C\u6B62\u3057\u307E\u3057\u305F\u3002\u3053\u306E\u30BF\u30D6\u306F\u624B\u52D5\u3067\u9589\u3058\u3066\u304F\u3060\u3055\u3044\uFF08\u81EA\u52D5\u3067\u306F\u9589\u3058\u3089\u308C\u306A\u3044\u3053\u3068\u304C\u3042\u308A\u307E\u3059\uFF09\u3002" }) : null,
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          disabled: stopBusy || serverStopped,
          class: "text-sm text-slate-400 underline underline-offset-2 hover:text-amber-300 disabled:opacity-40 disabled:no-underline",
          onClick: () => {
            void (async () => {
              if (!confirm(
                "Flask \u30B5\u30FC\u30D0\u30FC\u3092\u7D42\u4E86\u3057\u307E\u3059\u304B\uFF1F\n\uFF08\u7D9A\u3051\u308B\u3068\u304D\u306F start.bat \u304B\u3089\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\uFF09"
              )) {
                return;
              }
              setStopBusy(true);
              await requestServerShutdown();
              setStopBusy(false);
              setServerStopped(true);
              window.close();
            })();
          },
          children: stopBusy ? "\u7D42\u4E86\u51E6\u7406\u4E2D\u2026" : "\u30B5\u30FC\u30D0\u30FC\u3092\u7D42\u4E86\u3059\u308B"
        }
      )
    ] })
  ] });
}

// client/src/main.tsx
function App() {
  const [screen, setScreen] = d2({ t: "title" });
  const [words, setWords] = d2(null);
  const [loadErr, setLoadErr] = d2(null);
  const [gameKey, setGameKey] = d2(0);
  y2(() => {
    pingServer();
    const pingId = window.setInterval(() => pingServer(), 8e3);
    return () => window.clearInterval(pingId);
  }, []);
  y2(() => {
    let cancelled = false;
    (async () => {
      const ok = await fetchHealth();
      if (!ok) {
        if (!cancelled) {
          setLoadErr(
            "\u30B5\u30FC\u30D0\u30FC\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E start.bat \u304B\u3089\u8D77\u52D5\u3057\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
          );
        }
        return;
      }
      try {
        const w3 = await fetchWords();
        if (!cancelled) {
          setWords(w3);
          setLoadErr(null);
        }
      } catch (e3) {
        if (!cancelled) {
          if (e3 instanceof ApiError && e3.code === "WORDS_MISSING") {
            setLoadErr(
              "\u5358\u8A9E\u30D5\u30A1\u30A4\u30EB\uFF08data/words.csv\uFF09\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u30B2\u30FC\u30E0\u3092\u8D77\u52D5\u3067\u304D\u307E\u305B\u3093\u3002"
            );
          } else {
            setLoadErr(e3.message || "\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const goTitle = q2(() => setScreen({ t: "title" }), []);
  const onTitlePick = q2((id) => {
    if (id === "story") setScreen({ t: "stage" });
    else if (id === "endless") {
      setGameKey((k3) => k3 + 1);
      setScreen({ t: "game", mode: "endless", stage: 1 });
    } else setScreen({ t: "ranking" });
  }, []);
  const onStage = q2((stage) => {
    setGameKey((k3) => k3 + 1);
    setScreen({ t: "game", mode: "story", stage });
  }, []);
  const onGameFinish = q2((data) => {
    setScreen({ t: "result", data });
  }, []);
  const onRetry = q2(() => {
    const r3 = screen.t === "result" ? screen.data : null;
    if (!r3) return;
    setGameKey((k3) => k3 + 1);
    if (r3.mode === "endless") setScreen({ t: "game", mode: "endless", stage: 1 });
    else if (r3.outcome === "ending") setScreen({ t: "game", mode: "story", stage: 1 });
    else setScreen({ t: "game", mode: "story", stage: r3.stage });
  }, [screen]);
  if (loadErr) {
    return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-red-300 flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ u3("p", { class: "max-w-lg", children: loadErr }) });
  }
  if (!words) {
    return /* @__PURE__ */ u3("div", { class: "min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026" });
  }
  if (screen.t === "title") {
    return /* @__PURE__ */ u3(Title, { onPick: onTitlePick });
  }
  if (screen.t === "stage") {
    return /* @__PURE__ */ u3(StageSelect, { onSelect: onStage, onBack: goTitle });
  }
  if (screen.t === "ranking") {
    return /* @__PURE__ */ u3(RankingView, { onBack: goTitle });
  }
  if (screen.t === "game") {
    return /* @__PURE__ */ u3(
      GamePlay,
      {
        words,
        mode: screen.mode,
        startStage: screen.stage,
        onFinish: onGameFinish
      },
      gameKey
    );
  }
  if (screen.t === "result") {
    return /* @__PURE__ */ u3(
      Result,
      {
        data: screen.data,
        onRetry,
        onTitle: goTitle,
        onSubmitEndless: screen.data.mode === "endless" && screen.data.outcome === "gameover" ? async (name) => {
          await postEndlessRanking(name, screen.data.score, screen.data.waveReached);
        } : void 0,
        onSubmitStory: screen.data.mode === "story" && screen.data.outcome === "ending" ? async (name) => {
          await postStoryRanking(name, screen.data.accuracy, screen.data.timeSec);
        } : void 0
      }
    );
  }
  return /* @__PURE__ */ u3(Title, { onPick: onTitlePick });
}
R(/* @__PURE__ */ u3(App, {}), document.getElementById("root"));
export {
  App
};
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.14.2
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.14.2
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
