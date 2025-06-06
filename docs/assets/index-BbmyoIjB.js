(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
const Pt = !1,
  $t = (e, t) => e === t,
  fe = Symbol("solid-proxy"),
  et = typeof Proxy == "function",
  de = { equals: $t };
let tt = ft;
const W = 1,
  he = 2,
  nt = { owned: null, cleanups: null, context: null, owner: null };
var w = null;
let xe = null,
  Tt = null,
  S = null,
  P = null,
  M = null,
  ye = 0;
function rt(e, t) {
  const n = S,
    r = w,
    s = e.length === 0,
    o = t === void 0 ? r : t,
    i = s ? nt : { owned: null, cleanups: null, context: o ? o.context : null, owner: o },
    c = s ? e : () => e(() => C(() => Y(i)));
  (w = i), (S = null);
  try {
    return k(c, !0);
  } finally {
    (S = n), (w = r);
  }
}
function L(e, t) {
  t = t ? Object.assign({}, de, t) : de;
  const n = { value: e, observers: null, observerSlots: null, comparator: t.equals || void 0 },
    r = (s) => (typeof s == "function" && (s = s(n.value)), ut(n, s));
  return [at.bind(n), r];
}
function v(e, t, n) {
  const r = ke(e, t, !1, W);
  ee(r);
}
function Rt(e, t, n) {
  tt = Nt;
  const r = ke(e, t, !1, W);
  (r.user = !0), M ? M.push(r) : ee(r);
}
function x(e, t, n) {
  n = n ? Object.assign({}, de, n) : de;
  const r = ke(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    ee(r),
    at.bind(r)
  );
}
function Ot(e) {
  return k(e, !1);
}
function C(e) {
  if (S === null) return e();
  const t = S;
  S = null;
  try {
    return e();
  } finally {
    S = t;
  }
}
function Me(e, t, n) {
  const r = Array.isArray(e);
  let s,
    o = n && n.defer;
  return (i) => {
    let c;
    if (r) {
      c = Array(e.length);
      for (let a = 0; a < e.length; a++) c[a] = e[a]();
    } else c = e();
    if (o) return (o = !1), i;
    const l = C(() => t(c, s, i));
    return (s = c), l;
  };
}
function st(e) {
  Rt(() => C(e));
}
function ot(e) {
  return w === null || (w.cleanups === null ? (w.cleanups = [e]) : w.cleanups.push(e)), e;
}
function it() {
  return w;
}
function ct(e, t) {
  const n = w,
    r = S;
  (w = e), (S = null);
  try {
    return k(t, !0);
  } catch (s) {
    Ue(s);
  } finally {
    (w = n), (S = r);
  }
}
function Lt(e) {
  const t = S,
    n = w;
  return Promise.resolve().then(() => {
    (S = t), (w = n);
    let r;
    return k(e, !1), (S = w = null), r ? r.done : void 0;
  });
}
const [zn, Zn] = L(!1);
function lt(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: jt(n), defaultValue: e };
}
function Fe(e) {
  let t;
  return w && w.context && (t = w.context[e.id]) !== void 0 ? t : e.defaultValue;
}
function We(e) {
  const t = x(e),
    n = x(() => Oe(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
function at() {
  if (this.sources && this.state)
    if (this.state === W) ee(this);
    else {
      const e = P;
      (P = null), k(() => be(this), !1), (P = e);
    }
  if (S) {
    const e = this.observers ? this.observers.length : 0;
    S.sources
      ? (S.sources.push(this), S.sourceSlots.push(e))
      : ((S.sources = [this]), (S.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(S), this.observerSlots.push(S.sources.length - 1))
        : ((this.observers = [S]), (this.observerSlots = [S.sources.length - 1]));
  }
  return this.value;
}
function ut(e, t, n) {
  let r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        k(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const o = e.observers[s],
              i = xe && xe.running;
            i && xe.disposed.has(o),
              (i ? !o.tState : !o.state) && (o.pure ? P.push(o) : M.push(o), o.observers && dt(o)),
              i || (o.state = W);
          }
          if (P.length > 1e6) throw ((P = []), new Error());
        }, !1)),
    t
  );
}
function ee(e) {
  if (!e.fn) return;
  Y(e);
  const t = ye;
  vt(e, e.value, t);
}
function vt(e, t, n) {
  let r;
  const s = w,
    o = S;
  S = w = e;
  try {
    r = e.fn(t);
  } catch (i) {
    return (
      e.pure && ((e.state = W), e.owned && e.owned.forEach(Y), (e.owned = null)),
      (e.updatedAt = n + 1),
      Ue(i)
    );
  } finally {
    (S = o), (w = s);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? ut(e, r) : (e.value = r), (e.updatedAt = n));
}
function ke(e, t, n, r = W, s) {
  const o = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: w,
    context: w ? w.context : null,
    pure: n,
  };
  return w === null || (w !== nt && (w.owned ? w.owned.push(o) : (w.owned = [o]))), o;
}
function ge(e) {
  if (e.state === 0) return;
  if (e.state === he) return be(e);
  if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ye); ) e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === W)) ee(e);
    else if (e.state === he) {
      const r = P;
      (P = null), k(() => be(e, t[0]), !1), (P = r);
    }
}
function k(e, t) {
  if (P) return e();
  let n = !1;
  t || (P = []), M ? (n = !0) : (M = []), ye++;
  try {
    const r = e();
    return Ct(n), r;
  } catch (r) {
    n || (M = null), (P = null), Ue(r);
  }
}
function Ct(e) {
  if ((P && (ft(P), (P = null)), e)) return;
  const t = M;
  (M = null), t.length && k(() => tt(t), !1);
}
function ft(e) {
  for (let t = 0; t < e.length; t++) ge(e[t]);
}
function Nt(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : ge(r);
  }
  for (t = 0; t < n; t++) ge(e[t]);
}
function be(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const s = r.state;
      s === W ? r !== t && (!r.updatedAt || r.updatedAt < ye) && ge(r) : s === he && be(r, t);
    }
  }
}
function dt(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || ((n.state = he), n.pure ? P.push(n) : M.push(n), n.observers && dt(n));
  }
}
function Y(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const o = s.pop(),
          i = n.observerSlots.pop();
        r < s.length && ((o.sourceSlots[i] = r), (s[r] = o), (n.observerSlots[r] = i));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Y(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Y(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function It(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Ue(e, t = w) {
  throw It(e);
}
function Oe(e) {
  if (typeof e == "function" && !e.length) return Oe(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = Oe(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function jt(e, t) {
  return function (r) {
    let s;
    return (
      v(
        () => (s = C(() => ((w.context = { ...w.context, [e]: r.value }), We(() => r.children)))),
        void 0
      ),
      s
    );
  };
}
function T(e, t) {
  return C(() => e(t || {}));
}
function ie() {
  return !0;
}
const Le = {
  get(e, t, n) {
    return t === fe ? n : e.get(t);
  },
  has(e, t) {
    return t === fe ? !0 : e.has(t);
  },
  set: ie,
  deleteProperty: ie,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: ie,
      deleteProperty: ie,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function Pe(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Dt() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function ve(...e) {
  let t = !1;
  for (let i = 0; i < e.length; i++) {
    const c = e[i];
    (t = t || (!!c && fe in c)), (e[i] = typeof c == "function" ? ((t = !0), x(c)) : c);
  }
  if (et && t)
    return new Proxy(
      {
        get(i) {
          for (let c = e.length - 1; c >= 0; c--) {
            const l = Pe(e[c])[i];
            if (l !== void 0) return l;
          }
        },
        has(i) {
          for (let c = e.length - 1; c >= 0; c--) if (i in Pe(e[c])) return !0;
          return !1;
        },
        keys() {
          const i = [];
          for (let c = 0; c < e.length; c++) i.push(...Object.keys(Pe(e[c])));
          return [...new Set(i)];
        },
      },
      Le
    );
  const n = {},
    r = Object.create(null);
  for (let i = e.length - 1; i >= 0; i--) {
    const c = e[i];
    if (!c) continue;
    const l = Object.getOwnPropertyNames(c);
    for (let a = l.length - 1; a >= 0; a--) {
      const u = l[a];
      if (u === "__proto__" || u === "constructor") continue;
      const d = Object.getOwnPropertyDescriptor(c, u);
      if (!r[u])
        r[u] = d.get
          ? { enumerable: !0, configurable: !0, get: Dt.bind((n[u] = [d.get.bind(c)])) }
          : d.value !== void 0
          ? d
          : void 0;
      else {
        const f = n[u];
        f && (d.get ? f.push(d.get.bind(c)) : d.value !== void 0 && f.push(() => d.value));
      }
    }
  }
  const s = {},
    o = Object.keys(r);
  for (let i = o.length - 1; i >= 0; i--) {
    const c = o[i],
      l = r[c];
    l && l.get ? Object.defineProperty(s, c, l) : (s[c] = l ? l.value : void 0);
  }
  return s;
}
function Mt(e, ...t) {
  if (et && fe in e) {
    const s = new Set(t.length > 1 ? t.flat() : t[0]),
      o = t.map(
        (i) =>
          new Proxy(
            {
              get(c) {
                return i.includes(c) ? e[c] : void 0;
              },
              has(c) {
                return i.includes(c) && c in e;
              },
              keys() {
                return i.filter((c) => c in e);
              },
            },
            Le
          )
      );
    return (
      o.push(
        new Proxy(
          {
            get(i) {
              return s.has(i) ? void 0 : e[i];
            },
            has(i) {
              return s.has(i) ? !1 : i in e;
            },
            keys() {
              return Object.keys(e).filter((i) => !s.has(i));
            },
          },
          Le
        )
      ),
      o
    );
  }
  const n = {},
    r = t.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(e)) {
    const o = Object.getOwnPropertyDescriptor(e, s),
      i = !o.get && !o.set && o.enumerable && o.writable && o.configurable;
    let c = !1,
      l = 0;
    for (const a of t)
      a.includes(s) && ((c = !0), i ? (r[l][s] = o.value) : Object.defineProperty(r[l], s, o)), ++l;
    c || (i ? (n[s] = o.value) : Object.defineProperty(n, s, o));
  }
  return [...r, n];
}
const Ft = (e) => `Stale read from <${e}>.`;
function ht(e) {
  const t = e.keyed,
    n = x(() => e.when, void 0, void 0),
    r = t ? n : x(n, void 0, { equals: (s, o) => !s == !o });
  return x(
    () => {
      const s = r();
      if (s) {
        const o = e.children;
        return typeof o == "function" && o.length > 0
          ? C(() =>
              o(
                t
                  ? s
                  : () => {
                      if (!C(r)) throw Ft("Show");
                      return n();
                    }
              )
            )
          : o;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
const Wt = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  kt = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...Wt,
  ]),
  Ut = new Set(["innerHTML", "textContent", "innerText", "children"]),
  Bt = Object.assign(Object.create(null), { className: "class", htmlFor: "for" }),
  qt = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
function Vt(e, t) {
  const n = qt[e];
  return typeof n == "object" ? (n[t] ? n.$ : void 0) : n;
}
const Ht = new Set([
  "beforeinput",
  "click",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart",
]);
function Gt(e, t, n) {
  let r = n.length,
    s = t.length,
    o = r,
    i = 0,
    c = 0,
    l = t[s - 1].nextSibling,
    a = null;
  for (; i < s || c < o; ) {
    if (t[i] === n[c]) {
      i++, c++;
      continue;
    }
    for (; t[s - 1] === n[o - 1]; ) s--, o--;
    if (s === i) {
      const u = o < r ? (c ? n[c - 1].nextSibling : n[o - c]) : l;
      for (; c < o; ) e.insertBefore(n[c++], u);
    } else if (o === c) for (; i < s; ) (!a || !a.has(t[i])) && t[i].remove(), i++;
    else if (t[i] === n[o - 1] && n[c] === t[s - 1]) {
      const u = t[--s].nextSibling;
      e.insertBefore(n[c++], t[i++].nextSibling), e.insertBefore(n[--o], u), (t[s] = n[o]);
    } else {
      if (!a) {
        a = new Map();
        let d = c;
        for (; d < o; ) a.set(n[d], d++);
      }
      const u = a.get(t[i]);
      if (u != null)
        if (c < u && u < o) {
          let d = i,
            f = 1,
            b;
          for (; ++d < s && d < o && !((b = a.get(t[d])) == null || b !== u + f); ) f++;
          if (f > u - c) {
            const E = t[i];
            for (; c < u; ) e.insertBefore(n[c++], E);
          } else e.replaceChild(n[c++], t[i++]);
        } else i++;
      else t[i++].remove();
    }
  }
}
const Ke = "_$DX_DELEGATE";
function Kt(e, t, n, r = {}) {
  let s;
  return (
    rt((o) => {
      (s = o), t === document ? e() : D(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function te(e, t, n, r) {
  let s;
  const o = () => {
      const c = document.createElement("template");
      return (c.innerHTML = e), c.content.firstChild;
    },
    i = () => (s || (s = o())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function _e(e, t = window.document) {
  const n = t[Ke] || (t[Ke] = new Set());
  for (let r = 0, s = e.length; r < s; r++) {
    const o = e[r];
    n.has(o) || (n.add(o), t.addEventListener(o, rn));
  }
}
function we(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Jt(e, t, n) {
  n ? e.setAttribute(t, "") : e.removeAttribute(t);
}
function Xt(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Qt(e, t, n, r) {
  if (r) Array.isArray(n) ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1])) : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const s = n[0];
    e.addEventListener(t, (n[0] = (o) => s.call(e, n[1], o)));
  } else e.addEventListener(t, n, typeof n != "function" && n);
}
function Yt(e, t, n = {}) {
  const r = Object.keys(t || {}),
    s = Object.keys(n);
  let o, i;
  for (o = 0, i = s.length; o < i; o++) {
    const c = s[o];
    !c || c === "undefined" || t[c] || (Je(e, c, !1), delete n[c]);
  }
  for (o = 0, i = r.length; o < i; o++) {
    const c = r[o],
      l = !!t[c];
    !c || c === "undefined" || n[c] === l || !l || (Je(e, c, !0), (n[c] = l));
  }
  return n;
}
function zt(e, t, n) {
  if (!t) return n ? we(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return (r.cssText = t);
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let s, o;
  for (o in n) t[o] == null && r.removeProperty(o), delete n[o];
  for (o in t) (s = t[o]), s !== n[o] && (r.setProperty(o, s), (n[o] = s));
  return n;
}
function Zt(e, t = {}, n, r) {
  const s = {};
  return (
    v(() => (s.children = z(e, t.children, s.children))),
    v(() => typeof t.ref == "function" && en(t.ref, e)),
    v(() => tn(e, t, n, !0, s, !0)),
    s
  );
}
function en(e, t, n) {
  return C(() => e(t, n));
}
function D(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != "function")) return z(e, t, r, n);
  v((s) => z(e, t(), s, n), r);
}
function tn(e, t, n, r, s = {}, o = !1) {
  t || (t = {});
  for (const i in s)
    if (!(i in t)) {
      if (i === "children") continue;
      s[i] = Xe(e, i, null, s[i], n, o, t);
    }
  for (const i in t) {
    if (i === "children") continue;
    const c = t[i];
    s[i] = Xe(e, i, c, s[i], n, o, t);
  }
}
function nn(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Je(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let s = 0, o = r.length; s < o; s++) e.classList.toggle(r[s], n);
}
function Xe(e, t, n, r, s, o, i) {
  let c, l, a, u, d;
  if (t === "style") return zt(e, n, r);
  if (t === "classList") return Yt(e, n, r);
  if (n === r) return r;
  if (t === "ref") o || n(e);
  else if (t.slice(0, 3) === "on:") {
    const f = t.slice(3);
    r && e.removeEventListener(f, r, typeof r != "function" && r),
      n && e.addEventListener(f, n, typeof n != "function" && n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const f = t.slice(10);
    r && e.removeEventListener(f, r, !0), n && e.addEventListener(f, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const f = t.slice(2).toLowerCase(),
      b = Ht.has(f);
    if (!b && r) {
      const E = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(f, E);
    }
    (b || n) && (Qt(e, f, n, b), b && _e([f]));
  } else
    t.slice(0, 5) === "attr:"
      ? we(e, t.slice(5), n)
      : t.slice(0, 5) === "bool:"
      ? Jt(e, t.slice(5), n)
      : (d = t.slice(0, 5) === "prop:") ||
        (a = Ut.has(t)) ||
        (u = Vt(t, e.tagName)) ||
        (l = kt.has(t)) ||
        (c = e.nodeName.includes("-") || "is" in i)
      ? (d && ((t = t.slice(5)), (l = !0)),
        t === "class" || t === "className"
          ? Xt(e, n)
          : c && !l && !a
          ? (e[nn(t)] = n)
          : (e[u || t] = n))
      : we(e, Bt[t] || t, n);
  return n;
}
function rn(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    r = e.target,
    s = e.currentTarget,
    o = (l) => Object.defineProperty(e, "target", { configurable: !0, value: l }),
    i = () => {
      const l = t[n];
      if (l && !t.disabled) {
        const a = t[`${n}Data`];
        if ((a !== void 0 ? l.call(t, a, e) : l.call(t, e), e.cancelBubble)) return;
      }
      return (
        t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && o(t.host),
        !0
      );
    },
    c = () => {
      for (; i() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    e.composedPath)
  ) {
    const l = e.composedPath();
    o(l[0]);
    for (let a = 0; a < l.length - 2 && ((t = l[a]), !!i()); a++) {
      if (t._$host) {
        (t = t._$host), c();
        break;
      }
      if (t.parentNode === s) break;
    }
  } else c();
  o(r);
}
function z(e, t, n, r, s) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const o = typeof t,
    i = r !== void 0;
  if (((e = (i && n[0] && n[0].parentNode) || e), o === "string" || o === "number")) {
    if (o === "number" && ((t = t.toString()), t === n)) return n;
    if (i) {
      let c = n[0];
      c && c.nodeType === 3 ? c.data !== t && (c.data = t) : (c = document.createTextNode(t)),
        (n = G(e, n, r, c));
    } else n !== "" && typeof n == "string" ? (n = e.firstChild.data = t) : (n = e.textContent = t);
  } else if (t == null || o === "boolean") n = G(e, n, r);
  else {
    if (o === "function")
      return (
        v(() => {
          let c = t();
          for (; typeof c == "function"; ) c = c();
          n = z(e, c, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const c = [],
        l = n && Array.isArray(n);
      if (Ce(c, t, n, s)) return v(() => (n = z(e, c, n, r, !0))), () => n;
      if (c.length === 0) {
        if (((n = G(e, n, r)), i)) return n;
      } else l ? (n.length === 0 ? Qe(e, c, r) : Gt(e, n, c)) : (n && G(e), Qe(e, c));
      n = c;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (i) return (n = G(e, n, r, t));
        G(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Ce(e, t, n, r) {
  let s = !1;
  for (let o = 0, i = t.length; o < i; o++) {
    let c = t[o],
      l = n && n[e.length],
      a;
    if (!(c == null || c === !0 || c === !1))
      if ((a = typeof c) == "object" && c.nodeType) e.push(c);
      else if (Array.isArray(c)) s = Ce(e, c, l) || s;
      else if (a === "function")
        if (r) {
          for (; typeof c == "function"; ) c = c();
          s = Ce(e, Array.isArray(c) ? c : [c], Array.isArray(l) ? l : [l]) || s;
        } else e.push(c), (s = !0);
      else {
        const u = String(c);
        l && l.nodeType === 3 && l.data === u ? e.push(l) : e.push(document.createTextNode(u));
      }
  }
  return s;
}
function Qe(e, t, n = null) {
  for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n);
}
function G(e, t, n, r) {
  if (n === void 0) return (e.textContent = "");
  const s = r || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const c = t[i];
      if (s !== c) {
        const l = c.parentNode === e;
        !o && !i ? (l ? e.replaceChild(s, c) : e.insertBefore(s, n)) : l && c.remove();
      } else o = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
const sn = !1;
function gt() {
  let e = new Set();
  function t(s) {
    return e.add(s), () => e.delete(s);
  }
  let n = !1;
  function r(s, o) {
    if (n) return !(n = !1);
    const i = {
      to: s,
      options: o,
      defaultPrevented: !1,
      preventDefault: () => (i.defaultPrevented = !0),
    };
    for (const c of e)
      c.listener({
        ...i,
        from: c.location,
        retry: (l) => {
          l && (n = !0), c.navigate(s, { ...o, resolve: !1 });
        },
      });
    return !i.defaultPrevented;
  }
  return { subscribe: t, confirm: r };
}
let Ne;
function Be() {
  (!window.history.state || window.history.state._depth == null) &&
    window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""),
    (Ne = window.history.state._depth);
}
Be();
function on(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function cn(e, t) {
  let n = !1;
  return () => {
    const r = Ne;
    Be();
    const s = r == null ? null : Ne - r;
    if (n) {
      n = !1;
      return;
    }
    s && t(s) ? ((n = !0), window.history.go(-s)) : e();
  };
}
const ln = /^(?:[a-z0-9]+:)?\/\//i,
  an = /^\/+|(\/)\/+$/g,
  bt = "http://sr";
function H(e, t = !1) {
  const n = e.replace(an, "$1");
  return n ? (t || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function le(e, t, n) {
  if (ln.test(t)) return;
  const r = H(e),
    s = n && H(n);
  let o = "";
  return (
    !s || t.startsWith("/")
      ? (o = r)
      : s.toLowerCase().indexOf(r.toLowerCase()) !== 0
      ? (o = r + s)
      : (o = s),
    (o || "/") + H(t, !o)
  );
}
function un(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function fn(e, t) {
  return H(e).replace(/\/*(\*.*)?$/g, "") + H(t);
}
function wt(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      r in t ? (Array.isArray(t[r]) ? t[r].push(n) : (t[r] = [t[r], n])) : (t[r] = n);
    }),
    t
  );
}
function dn(e, t, n) {
  const [r, s] = e.split("/*", 2),
    o = r.split("/").filter(Boolean),
    i = o.length;
  return (c) => {
    const l = c.split("/").filter(Boolean),
      a = l.length - i;
    if (a < 0 || (a > 0 && s === void 0 && !t)) return null;
    const u = { path: i ? "" : "/", params: {} },
      d = (f) => (n === void 0 ? void 0 : n[f]);
    for (let f = 0; f < i; f++) {
      const b = o[f],
        E = b[0] === ":",
        h = E ? l[f] : l[f].toLowerCase(),
        g = E ? b.slice(1) : b.toLowerCase();
      if (E && $e(h, d(g))) u.params[g] = h;
      else if (E || !$e(h, g)) return null;
      u.path += `/${h}`;
    }
    if (s) {
      const f = a ? l.slice(-a).join("/") : "";
      if ($e(f, d(s))) u.params[s] = f;
      else return null;
    }
    return u;
  };
}
function $e(e, t) {
  const n = (r) => r === e;
  return t === void 0
    ? !0
    : typeof t == "string"
    ? n(t)
    : typeof t == "function"
    ? t(e)
    : Array.isArray(t)
    ? t.some(n)
    : t instanceof RegExp
    ? t.test(e)
    : !1;
}
function hn(e) {
  const [t, n] = e.pattern.split("/*", 2),
    r = t.split("/").filter(Boolean);
  return r.reduce((s, o) => s + (o.startsWith(":") ? 2 : 3), r.length - (n === void 0 ? 0 : 1));
}
function mt(e) {
  const t = new Map(),
    n = it();
  return new Proxy(
    {},
    {
      get(r, s) {
        return (
          t.has(s) ||
            ct(n, () =>
              t.set(
                s,
                x(() => e()[s])
              )
            ),
          t.get(s)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    }
  );
}
function yt(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    r = e.slice(t.index + t[0].length);
  const s = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); ) s.push((n += t[1])), (r = r.slice(t[0].length));
  return yt(r).reduce((o, i) => [...o, ...s.map((c) => c + i)], []);
}
const gn = 100,
  _t = lt(),
  qe = lt(),
  Ve = () => un(Fe(_t), "<A> and 'use' router primitives can be only used inside a Route."),
  bn = () => Fe(qe) || Ve().base,
  wn = (e) => {
    const t = bn();
    return x(() => t.resolvePath(e()));
  },
  mn = (e) => {
    const t = Ve();
    return x(() => {
      const n = e();
      return n !== void 0 ? t.renderPath(n) : n;
    });
  },
  yn = () => Ve().location;
function _n(e, t = "") {
  const { component: n, preload: r, load: s, children: o, info: i } = e,
    c = !o || (Array.isArray(o) && !o.length),
    l = { key: e, component: n, preload: r || s, info: i };
  return pt(e.path).reduce((a, u) => {
    for (const d of yt(u)) {
      const f = fn(t, d);
      let b = c ? f : f.split("/*", 1)[0];
      (b = b
        .split("/")
        .map((E) => (E.startsWith(":") || E.startsWith("*") ? E : encodeURIComponent(E)))
        .join("/")),
        a.push({ ...l, originalPath: u, pattern: b, matcher: dn(b, !c, e.matchFilters) });
    }
    return a;
  }, []);
}
function pn(e, t = 0) {
  return {
    routes: e,
    score: hn(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let s = e.length - 1; s >= 0; s--) {
        const o = e[s],
          i = o.matcher(n);
        if (!i) return null;
        r.unshift({ ...i, route: o });
      }
      return r;
    },
  };
}
function pt(e) {
  return Array.isArray(e) ? e : [e];
}
function St(e, t = "", n = [], r = []) {
  const s = pt(e);
  for (let o = 0, i = s.length; o < i; o++) {
    const c = s[o];
    if (c && typeof c == "object") {
      c.hasOwnProperty("path") || (c.path = "");
      const l = _n(c, t);
      for (const a of l) {
        n.push(a);
        const u = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !u) St(c.children, a.pattern, n, r);
        else {
          const d = pn([...n], r.length);
          r.push(d);
        }
        n.pop();
      }
    }
  }
  return n.length ? r : r.sort((o, i) => i.score - o.score);
}
function Te(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n].matcher(t);
    if (s) return s;
  }
  return [];
}
function Sn(e, t, n) {
  const r = new URL(bt),
    s = x(
      (u) => {
        const d = e();
        try {
          return new URL(d, r);
        } catch {
          return console.error(`Invalid path ${d}`), u;
        }
      },
      r,
      { equals: (u, d) => u.href === d.href }
    ),
    o = x(() => s().pathname),
    i = x(() => s().search, !0),
    c = x(() => s().hash),
    l = () => "",
    a = Me(i, () => wt(s()));
  return {
    get pathname() {
      return o();
    },
    get search() {
      return i();
    },
    get hash() {
      return c();
    },
    get state() {
      return t();
    },
    get key() {
      return l();
    },
    query: n ? n(a) : mt(a),
  };
}
let V;
function En() {
  return V;
}
function An(e, t, n, r = {}) {
  const {
      signal: [s, o],
      utils: i = {},
    } = e,
    c = i.parsePath || ((m) => m),
    l = i.renderPath || ((m) => m),
    a = i.beforeLeave || gt(),
    u = le("", r.base || "");
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !s().value && o({ value: u, replace: !0, scroll: !1 });
  const [d, f] = L(!1);
  let b;
  const E = (m, _) => {
      (_.value === h() && _.state === p()) ||
        (b === void 0 && f(!0),
        (V = m),
        (b = _),
        Lt(() => {
          b === _ && (g(b.value), y(b.state), N[1](($) => $.filter((j) => j.pending)));
        }).finally(() => {
          b === _ &&
            Ot(() => {
              (V = void 0), m === "navigate" && Ee(b), f(!1), (b = void 0);
            });
        }));
    },
    [h, g] = L(s().value),
    [p, y] = L(s().state),
    I = Sn(h, p, i.queryWrapper),
    R = [],
    N = L([]),
    F = x(() =>
      typeof r.transformUrl == "function"
        ? Te(t(), r.transformUrl(I.pathname))
        : Te(t(), I.pathname)
    ),
    K = () => {
      const m = F(),
        _ = {};
      for (let $ = 0; $ < m.length; $++) Object.assign(_, m[$].params);
      return _;
    },
    pe = i.paramsWrapper ? i.paramsWrapper(K, t) : mt(K),
    ne = {
      pattern: u,
      path: () => u,
      outlet: () => null,
      resolvePath(m) {
        return le(u, m);
      },
    };
  return (
    v(Me(s, (m) => E("native", m), { defer: !0 })),
    {
      base: ne,
      location: I,
      params: pe,
      isRouting: d,
      renderPath: l,
      parsePath: c,
      navigatorFactory: re,
      matches: F,
      beforeLeave: a,
      preloadRoute: se,
      singleFlight: r.singleFlight === void 0 ? !0 : r.singleFlight,
      submissions: N,
    }
  );
  function Se(m, _, $) {
    C(() => {
      if (typeof _ == "number") {
        _ &&
          (i.go ? i.go(_) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const j = !_ || _[0] === "?",
        {
          replace: J,
          resolve: O,
          scroll: Ae,
          state: X,
        } = { replace: !1, resolve: !j, scroll: !0, ...$ },
        oe = O ? m.resolvePath(_) : le((j && I.pathname) || "", _);
      if (oe === void 0) throw new Error(`Path '${_}' is not a routable path`);
      if (R.length >= gn) throw new Error("Too many redirects");
      const Ge = h();
      (oe !== Ge || X !== p()) &&
        (sn ||
          (a.confirm(oe, $) &&
            (R.push({ value: Ge, replace: J, scroll: Ae, state: p() }),
            E("navigate", { value: oe, state: X }))));
    });
  }
  function re(m) {
    return (m = m || Fe(qe) || ne), (_, $) => Se(m, _, $);
  }
  function Ee(m) {
    const _ = R[0];
    _ && (o({ ...m, replace: _.replace, scroll: _.scroll }), (R.length = 0));
  }
  function se(m, _) {
    const $ = Te(t(), m.pathname),
      j = V;
    V = "preload";
    for (let J in $) {
      const { route: O, params: Ae } = $[J];
      O.component && O.component.preload && O.component.preload();
      const { preload: X } = O;
      _ &&
        X &&
        ct(n(), () =>
          X({
            params: Ae,
            location: {
              pathname: m.pathname,
              search: m.search,
              hash: m.hash,
              query: wt(m),
              state: null,
              key: "",
            },
            intent: "preload",
          })
        );
    }
    V = j;
  }
}
function xn(e, t, n, r) {
  const { base: s, location: o, params: i } = e,
    { pattern: c, component: l, preload: a } = r().route,
    u = x(() => r().path);
  l && l.preload && l.preload();
  const d = a ? a({ params: i, location: o, intent: V || "initial" }) : void 0;
  return {
    parent: t,
    pattern: c,
    path: u,
    outlet: () =>
      l
        ? T(l, {
            params: i,
            location: o,
            data: d,
            get children() {
              return n();
            },
          })
        : n(),
    resolvePath(b) {
      return le(s.path(), b, u());
    },
  };
}
const Pn = (e) => (t) => {
  const { base: n } = t,
    r = We(() => t.children),
    s = x(() => St(r(), t.base || ""));
  let o;
  const i = An(e, s, () => o, {
    base: n,
    singleFlight: t.singleFlight,
    transformUrl: t.transformUrl,
  });
  return (
    e.create && e.create(i),
    T(_t.Provider, {
      value: i,
      get children() {
        return T($n, {
          routerState: i,
          get root() {
            return t.root;
          },
          get preload() {
            return t.rootPreload || t.rootLoad;
          },
          get children() {
            return [
              x(() => (o = it()) && null),
              T(Tn, {
                routerState: i,
                get branches() {
                  return s();
                },
              }),
            ];
          },
        });
      },
    })
  );
};
function $n(e) {
  const t = e.routerState.location,
    n = e.routerState.params,
    r = x(
      () =>
        e.preload &&
        C(() => {
          e.preload({ params: n, location: t, intent: En() || "initial" });
        })
    );
  return T(ht, {
    get when() {
      return e.root;
    },
    keyed: !0,
    get fallback() {
      return e.children;
    },
    children: (s) =>
      T(s, {
        params: n,
        location: t,
        get data() {
          return r();
        },
        get children() {
          return e.children;
        },
      }),
  });
}
function Tn(e) {
  const t = [];
  let n;
  const r = x(
    Me(e.routerState.matches, (s, o, i) => {
      let c = o && s.length === o.length;
      const l = [];
      for (let a = 0, u = s.length; a < u; a++) {
        const d = o && o[a],
          f = s[a];
        i && d && f.route.key === d.route.key
          ? (l[a] = i[a])
          : ((c = !1),
            t[a] && t[a](),
            rt((b) => {
              (t[a] = b),
                (l[a] = xn(
                  e.routerState,
                  l[a - 1] || e.routerState.base,
                  Ye(() => r()[a + 1]),
                  () => e.routerState.matches()[a]
                ));
            }));
      }
      return t.splice(s.length).forEach((a) => a()), i && c ? i : ((n = l[0]), l);
    })
  );
  return Ye(() => r() && n)();
}
const Ye = (e) => () =>
    T(ht, {
      get when() {
        return e();
      },
      keyed: !0,
      children: (t) =>
        T(qe.Provider, {
          value: t,
          get children() {
            return t.outlet();
          },
        }),
    }),
  Re = (e) => {
    const t = We(() => e.children);
    return ve(e, {
      get children() {
        return t();
      },
    });
  };
function Rn([e, t], n, r) {
  return [e, r ? (s) => t(r(s)) : t];
}
function On(e) {
  let t = !1;
  const n = (s) => (typeof s == "string" ? { value: s } : s),
    r = Rn(
      L(n(e.get()), { equals: (s, o) => s.value === o.value && s.state === o.state }),
      void 0,
      (s) => (!t && e.set(s), s)
    );
  return (
    e.init &&
      ot(
        e.init((s = e.get()) => {
          (t = !0), r[1](n(s)), (t = !1);
        })
      ),
    Pn({ signal: r, create: e.create, utils: e.utils })
  );
}
function Ln(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function vn(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
const Cn = new Map();
function Nn(e = !0, t = !1, n = "/_server", r) {
  return (s) => {
    const o = s.base.path(),
      i = s.navigatorFactory(s.base);
    let c, l;
    function a(h) {
      return h.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function u(h) {
      if (h.defaultPrevented || h.button !== 0 || h.metaKey || h.altKey || h.ctrlKey || h.shiftKey)
        return;
      const g = h.composedPath().find((F) => F instanceof Node && F.nodeName.toUpperCase() === "A");
      if (!g || (t && !g.hasAttribute("link"))) return;
      const p = a(g),
        y = p ? g.href.baseVal : g.href;
      if ((p ? g.target.baseVal : g.target) || (!y && !g.hasAttribute("state"))) return;
      const R = (g.getAttribute("rel") || "").split(/\s+/);
      if (g.hasAttribute("download") || (R && R.includes("external"))) return;
      const N = p ? new URL(y, document.baseURI) : new URL(y);
      if (
        !(
          N.origin !== window.location.origin ||
          (o && N.pathname && !N.pathname.toLowerCase().startsWith(o.toLowerCase()))
        )
      )
        return [g, N];
    }
    function d(h) {
      const g = u(h);
      if (!g) return;
      const [p, y] = g,
        I = s.parsePath(y.pathname + y.search + y.hash),
        R = p.getAttribute("state");
      h.preventDefault(),
        i(I, {
          resolve: !1,
          replace: p.hasAttribute("replace"),
          scroll: !p.hasAttribute("noscroll"),
          state: R ? JSON.parse(R) : void 0,
        });
    }
    function f(h) {
      const g = u(h);
      if (!g) return;
      const [p, y] = g;
      r && (y.pathname = r(y.pathname)), s.preloadRoute(y, p.getAttribute("preload") !== "false");
    }
    function b(h) {
      clearTimeout(c);
      const g = u(h);
      if (!g) return (l = null);
      const [p, y] = g;
      l !== p &&
        (r && (y.pathname = r(y.pathname)),
        (c = setTimeout(() => {
          s.preloadRoute(y, p.getAttribute("preload") !== "false"), (l = p);
        }, 20)));
    }
    function E(h) {
      if (h.defaultPrevented) return;
      let g =
        h.submitter && h.submitter.hasAttribute("formaction")
          ? h.submitter.getAttribute("formaction")
          : h.target.getAttribute("action");
      if (!g) return;
      if (!g.startsWith("https://action/")) {
        const y = new URL(g, bt);
        if (((g = s.parsePath(y.pathname + y.search)), !g.startsWith(n))) return;
      }
      if (h.target.method.toUpperCase() !== "POST")
        throw new Error("Only POST forms are supported for Actions");
      const p = Cn.get(g);
      if (p) {
        h.preventDefault();
        const y = new FormData(h.target, h.submitter);
        p.call(
          { r: s, f: h.target },
          h.target.enctype === "multipart/form-data" ? y : new URLSearchParams(y)
        );
      }
    }
    _e(["click", "submit"]),
      document.addEventListener("click", d),
      e &&
        (document.addEventListener("mousemove", b, { passive: !0 }),
        document.addEventListener("focusin", f, { passive: !0 }),
        document.addEventListener("touchstart", f, { passive: !0 })),
      document.addEventListener("submit", E),
      ot(() => {
        document.removeEventListener("click", d),
          e &&
            (document.removeEventListener("mousemove", b),
            document.removeEventListener("focusin", f),
            document.removeEventListener("touchstart", f)),
          document.removeEventListener("submit", E);
      });
  };
}
function In(e) {
  const t = () => {
      const r = window.location.pathname.replace(/^\/+/, "/") + window.location.search,
        s =
          window.history.state &&
          window.history.state._depth &&
          Object.keys(window.history.state).length === 1
            ? void 0
            : window.history.state;
      return { value: r + window.location.hash, state: s };
    },
    n = gt();
  return On({
    get: t,
    set({ value: r, replace: s, scroll: o, state: i }) {
      s ? window.history.replaceState(on(i), "", r) : window.history.pushState(i, "", r),
        vn(decodeURIComponent(window.location.hash.slice(1)), o),
        Be();
    },
    init: (r) =>
      Ln(
        window,
        "popstate",
        cn(r, (s) => {
          if (s && s < 0) return !n.confirm(s);
          {
            const o = t();
            return !n.confirm(o.value, { state: o.state });
          }
        })
      ),
    create: Nn(e.preload, e.explicitLinks, e.actionBase, e.transformUrl),
    utils: { go: (r) => window.history.go(r), beforeLeave: n },
  })(e);
}
var jn = te("<a>");
function ze(e) {
  e = ve({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, t] = Mt(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]),
    n = wn(() => e.href),
    r = mn(n),
    s = yn(),
    o = x(() => {
      const i = n();
      if (i === void 0) return [!1, !1];
      const c = H(i.split(/[?#]/, 1)[0]).toLowerCase(),
        l = decodeURI(H(s.pathname).toLowerCase());
      return [e.end ? c === l : l.startsWith(c + "/") || l === c, c === l];
    });
  return (() => {
    var i = jn();
    return (
      Zt(
        i,
        ve(t, {
          get href() {
            return r() || e.href;
          },
          get state() {
            return JSON.stringify(e.state);
          },
          get classList() {
            return {
              ...(e.class && { [e.class]: !0 }),
              [e.inactiveClass]: !o()[0],
              [e.activeClass]: o()[0],
              ...t.classList,
            };
          },
          link: "",
          get "aria-current"() {
            return o()[1] ? "page" : void 0;
          },
        }),
        !1
      ),
      i
    );
  })();
}
var Dn = te("<div><h1>Test WASM</h1><ul><li></li><li>");
function Mn() {
  return (() => {
    var e = Dn(),
      t = e.firstChild,
      n = t.nextSibling,
      r = n.firstChild,
      s = r.nextSibling;
    return (
      D(r, T(ze, { href: "/fibonacci", children: "피보나치 함수 성능 비교" })),
      D(s, T(ze, { href: "/sql", children: "sql on browser" })),
      e
    );
  })();
}
function Ie(e) {
  return e <= 1 ? e : Ie(e - 1) + Ie(e - 2);
}
let A;
function B(e) {
  const t = A.__externref_table_alloc();
  return A.__wbindgen_export_2.set(t, e), t;
}
function Ze(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    const r = B(n);
    A.__wbindgen_exn_store(r);
  }
}
const Et =
  typeof TextDecoder < "u"
    ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };
typeof TextDecoder < "u" && Et.decode();
let Q = null;
function ae() {
  return (Q === null || Q.byteLength === 0) && (Q = new Uint8Array(A.memory.buffer)), Q;
}
function me(e, t) {
  return (e = e >>> 0), Et.decode(ae().subarray(e, e + t));
}
function U(e) {
  return e == null;
}
function je(e) {
  const t = typeof e;
  if (t == "number" || t == "boolean" || e == null) return `${e}`;
  if (t == "string") return `"${e}"`;
  if (t == "symbol") {
    const s = e.description;
    return s == null ? "Symbol" : `Symbol(${s})`;
  }
  if (t == "function") {
    const s = e.name;
    return typeof s == "string" && s.length > 0 ? `Function(${s})` : "Function";
  }
  if (Array.isArray(e)) {
    const s = e.length;
    let o = "[";
    s > 0 && (o += je(e[0]));
    for (let i = 1; i < s; i++) o += ", " + je(e[i]);
    return (o += "]"), o;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let r;
  if (n && n.length > 1) r = n[1];
  else return toString.call(e);
  if (r == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error
    ? `${e.name}: ${e.message}
${e.stack}`
    : r;
}
let Z = 0;
const ue =
    typeof TextEncoder < "u"
      ? new TextEncoder("utf-8")
      : {
          encode: () => {
            throw Error("TextEncoder not available");
          },
        },
  Fn =
    typeof ue.encodeInto == "function"
      ? function (e, t) {
          return ue.encodeInto(e, t);
        }
      : function (e, t) {
          const n = ue.encode(e);
          return t.set(n), { read: e.length, written: n.length };
        };
function De(e, t, n) {
  if (n === void 0) {
    const c = ue.encode(e),
      l = t(c.length, 1) >>> 0;
    return (
      ae()
        .subarray(l, l + c.length)
        .set(c),
      (Z = c.length),
      l
    );
  }
  let r = e.length,
    s = t(r, 1) >>> 0;
  const o = ae();
  let i = 0;
  for (; i < r; i++) {
    const c = e.charCodeAt(i);
    if (c > 127) break;
    o[s + i] = c;
  }
  if (i !== r) {
    i !== 0 && (e = e.slice(i)), (s = n(s, r, (r = i + e.length * 3), 1) >>> 0);
    const c = ae().subarray(s + i, s + r),
      l = Fn(e, c);
    (i += l.written), (s = n(s, r, i, 1) >>> 0);
  }
  return (Z = i), s;
}
let q = null;
function ce() {
  return (
    (q === null ||
      q.buffer.detached === !0 ||
      (q.buffer.detached === void 0 && q.buffer !== A.memory.buffer)) &&
      (q = new DataView(A.memory.buffer)),
    q
  );
}
function Wn(e) {
  return A.fibonacci_rust(e) >>> 0;
}
function kn() {
  let e, t;
  try {
    const n = A.init_db();
    return (e = n[0]), (t = n[1]), me(n[0], n[1]);
  } finally {
    A.__wbindgen_free(e, t, 1);
  }
}
function At(e) {
  let t, n;
  try {
    const r = De(e, A.__wbindgen_malloc, A.__wbindgen_realloc),
      s = Z,
      o = A.run_query(r, s);
    return (t = o[0]), (n = o[1]), me(o[0], o[1]);
  } finally {
    A.__wbindgen_free(t, n, 1);
  }
}
async function Un(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (r) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            r
          );
        else throw r;
      }
    const n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  } else {
    const n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
function Bn() {
  const e = {};
  return (
    (e.wbg = {}),
    (e.wbg.__wbg_call_672a4d21634d4a24 = function () {
      return Ze(function (t, n) {
        return t.call(n);
      }, arguments);
    }),
    (e.wbg.__wbg_getDate_ef336e14594b35ce = function (t) {
      return t.getDate();
    }),
    (e.wbg.__wbg_getDay_3da98b461c969439 = function (t) {
      return t.getDay();
    }),
    (e.wbg.__wbg_getFullYear_17d3c9e4db748eb7 = function (t) {
      return t.getFullYear();
    }),
    (e.wbg.__wbg_getHours_70451b8de3ce8638 = function (t) {
      return t.getHours();
    }),
    (e.wbg.__wbg_getMinutes_e793d718371e18f7 = function (t) {
      return t.getMinutes();
    }),
    (e.wbg.__wbg_getMonth_d37edcd23642c97d = function (t) {
      return t.getMonth();
    }),
    (e.wbg.__wbg_getSeconds_755197b634cca692 = function (t) {
      return t.getSeconds();
    }),
    (e.wbg.__wbg_getTime_46267b1c24877e30 = function (t) {
      return t.getTime();
    }),
    (e.wbg.__wbg_getTimezoneOffset_6b5752021c499c47 = function (t) {
      return t.getTimezoneOffset();
    }),
    (e.wbg.__wbg_instanceof_ServiceWorkerGlobalScope_9662fcbac1190e8b = function (t) {
      let n;
      try {
        n = t instanceof ServiceWorkerGlobalScope;
      } catch {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_SharedWorkerGlobalScope_1796b9b4c3344538 = function (t) {
      let n;
      try {
        n = t instanceof SharedWorkerGlobalScope;
      } catch {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function (t) {
      let n;
      try {
        n = t instanceof Window;
      } catch {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_WorkerGlobalScope_dbdbdea7e3b56493 = function (t) {
      let n;
      try {
        n = t instanceof WorkerGlobalScope;
      } catch {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_length_d56737991078581b = function (t) {
      return t.length;
    }),
    (e.wbg.__wbg_new0_f788a2397c7ca929 = function () {
      return new Date();
    }),
    (e.wbg.__wbg_new_31a97dac4f10fab7 = function (t) {
      return new Date(t);
    }),
    (e.wbg.__wbg_newnoargs_105ed471475aaf50 = function (t, n) {
      return new Function(me(t, n));
    }),
    (e.wbg.__wbg_newwithyearmonthday_03748851282a850d = function (t, n, r) {
      return new Date(t >>> 0, n, r);
    }),
    (e.wbg.__wbg_now_d18023d54d4e5500 = function (t) {
      return t.now();
    }),
    (e.wbg.__wbg_performance_704644393c4d3310 = function (t) {
      const n = t.performance;
      return U(n) ? 0 : B(n);
    }),
    (e.wbg.__wbg_performance_c185c0cdc2766575 = function (t) {
      const n = t.performance;
      return U(n) ? 0 : B(n);
    }),
    (e.wbg.__wbg_random_3ad904d98382defe = function () {
      return Math.random();
    }),
    (e.wbg.__wbg_slice_972c243648c9fd2e = function (t, n, r) {
      return t.slice(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function () {
      const t = typeof global > "u" ? null : global;
      return U(t) ? 0 : B(t);
    }),
    (e.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function () {
      const t = typeof globalThis > "u" ? null : globalThis;
      return U(t) ? 0 : B(t);
    }),
    (e.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function () {
      const t = typeof self > "u" ? null : self;
      return U(t) ? 0 : B(t);
    }),
    (e.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function () {
      const t = typeof window > "u" ? null : window;
      return U(t) ? 0 : B(t);
    }),
    (e.wbg.__wbg_toString_ba82658ec370add0 = function () {
      return Ze(function (t, n) {
        return t.toString(n);
      }, arguments);
    }),
    (e.wbg.__wbindgen_bigint_from_i64 = function (t) {
      return t;
    }),
    (e.wbg.__wbindgen_debug_string = function (t, n) {
      const r = je(n),
        s = De(r, A.__wbindgen_malloc, A.__wbindgen_realloc),
        o = Z;
      ce().setInt32(t + 4 * 1, o, !0), ce().setInt32(t + 4 * 0, s, !0);
    }),
    (e.wbg.__wbindgen_init_externref_table = function () {
      const t = A.__wbindgen_export_2,
        n = t.grow(4);
      t.set(0, void 0),
        t.set(n + 0, void 0),
        t.set(n + 1, null),
        t.set(n + 2, !0),
        t.set(n + 3, !1);
    }),
    (e.wbg.__wbindgen_is_undefined = function (t) {
      return t === void 0;
    }),
    (e.wbg.__wbindgen_number_new = function (t) {
      return t;
    }),
    (e.wbg.__wbindgen_string_get = function (t, n) {
      const r = n,
        s = typeof r == "string" ? r : void 0;
      var o = U(s) ? 0 : De(s, A.__wbindgen_malloc, A.__wbindgen_realloc),
        i = Z;
      ce().setInt32(t + 4 * 1, i, !0), ce().setInt32(t + 4 * 0, o, !0);
    }),
    (e.wbg.__wbindgen_throw = function (t, n) {
      throw new Error(me(t, n));
    }),
    e
  );
}
function qn(e, t) {
  return (
    (A = e.exports),
    (He.__wbindgen_wasm_module = t),
    (q = null),
    (Q = null),
    A.__wbindgen_start(),
    A
  );
}
async function He(e) {
  if (A !== void 0) return A;
  typeof e < "u" &&
    (Object.getPrototypeOf(e) === Object.prototype
      ? ({ module_or_path: e } = e)
      : console.warn(
          "using deprecated parameters for the initialization function; pass a single object instead"
        )),
    typeof e > "u" &&
      (e = new URL("/test_wasm/assets/test_wasm_rust_bg-BtX31iXy.wasm", import.meta.url));
  const t = Bn();
  (typeof e == "string" ||
    (typeof Request == "function" && e instanceof Request) ||
    (typeof URL == "function" && e instanceof URL)) &&
    (e = fetch(e));
  const { instance: n, module: r } = await Un(await e, t);
  return qn(n, r);
}
var Vn = te(
  "<div><h1>Fibonacci 비교 (JS vs Rust WASM)</h1><label>숫자 입력(45 이하):<input type=number min=0 max=45></label><button>실행</button><div><h2>결과</h2><table border=1 cellpadding=8><colgroup><col><col><col></colgroup><thead><tr><th>구현 방식</th><th>결과</th><th>소요 시간 (ms)</th></tr></thead><tbody><tr><td>JavaScript</td><td></td><td></td></tr><tr><td>Rust (WASM)</td><td></td><td>"
);
function Hn() {
  const [e, t] = L(10),
    [n, r] = L(null),
    [s, o] = L(null),
    [i, c] = L(null),
    [l, a] = L(null),
    u = 45,
    d = async () => {
      await He();
      const f = e(),
        b = performance.now(),
        E = Ie(f),
        h = performance.now(),
        g = performance.now(),
        p = Wn(f),
        y = performance.now();
      r(E), o(p), c(h - b), a(y - g);
    };
  return (() => {
    var f = Vn(),
      b = f.firstChild,
      E = b.nextSibling,
      h = E.firstChild,
      g = h.nextSibling,
      p = E.nextSibling,
      y = p.nextSibling,
      I = y.firstChild,
      R = I.nextSibling,
      N = R.firstChild,
      F = N.firstChild,
      K = F.nextSibling,
      pe = K.nextSibling,
      ne = N.nextSibling,
      Se = ne.nextSibling,
      re = Se.firstChild,
      Ee = re.firstChild,
      se = Ee.nextSibling,
      m = se.nextSibling,
      _ = re.nextSibling,
      $ = _.firstChild,
      j = $.nextSibling,
      J = j.nextSibling;
    return (
      f.style.setProperty("padding", "2rem"),
      f.style.setProperty("font-family", "sans-serif"),
      (g.$$input = (O) => t(Math.min(parseInt(O.currentTarget.value), u))),
      (p.$$click = d),
      y.style.setProperty("margin-top", "1rem"),
      R.style.setProperty("border-collapse", "collapse"),
      R.style.setProperty("margin-top", "1rem"),
      F.style.setProperty("width", "150px"),
      K.style.setProperty("width", "150px"),
      pe.style.setProperty("width", "150px"),
      D(se, n),
      D(m, () => {
        var O;
        return (O = i()) == null ? void 0 : O.toFixed(1);
      }),
      D(j, s),
      D(J, () => {
        var O;
        return (O = l()) == null ? void 0 : O.toFixed(1);
      }),
      v(() => (g.value = e())),
      f
    );
  })();
}
_e(["input", "click"]);
var Gn = te(
  "<div><h2>🧪 SQL 실행기</h2><textarea rows=15 cols=100></textarea><br><button>실행</button><h3>결과</h3><pre>"
);
const xt = [
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,age INTEGER);",
    "SELECT name FROM sqlite_master WHERE type='table';",
    "INSERT INTO users (name, age) VALUES ('Alice', 30);",
    `INSERT INTO users (name, age) VALUES ('Bob', 25), ('Charlie', 35);`,
    "SELECT * FROM users;",
    "SELECT * FROM users WHERE id = 1;",
    "SELECT * FROM users WHERE age > 30;",
    "UPDATE users SET age = 31 WHERE id = 1;",
    "UPDATE users SET age = 40 WHERE name = 'Bob';",
    "DELETE FROM users WHERE id = 2;",
    "DELETE FROM users;",
    "DROP TABLE IF EXISTS users;",
    "SELECT name FROM sqlite_master WHERE type='table';",
  ],
  Kn = () => {
    xt.forEach((e) => {
      console.log(`Executing query: ${e}
result: ${At(e)}`);
    });
  };
function Jn() {
  const [e, t] = L(""),
    [n, r] = L("");
  st(async () => {
    await He(), kn(), Kn();
  });
  const s = () => {
    try {
      const o = At(e());
      r(o);
    } catch (o) {
      r(`Error: ${o}`);
    }
  };
  return (() => {
    var o = Gn(),
      i = o.firstChild,
      c = i.nextSibling,
      l = c.nextSibling,
      a = l.nextSibling,
      u = a.nextSibling,
      d = u.nextSibling;
    return (
      o.style.setProperty("padding", "1.5rem"),
      o.style.setProperty("font-family", "sans-serif"),
      o.style.setProperty("max-width", "800px"),
      o.style.setProperty("margin", "0 auto"),
      (c.$$input = (f) => t(f.currentTarget.value)),
      (a.$$click = s),
      a.style.setProperty("margin-top", "0.5rem"),
      D(d, n),
      v(() =>
        we(
          c,
          "placeholder",
          `예시: ${JSON.stringify(xt, null, 2).replace("[", "").replace("]", "")}`
        )
      ),
      v(() => (c.value = e())),
      o
    );
  })();
}
_e(["input", "click"]);
var Xn = te("<div>");
function Qn() {
  const e = "/test_wasm";
  return (
    st(() => {
      console.log("✅ JS 실행됨");
    }),
    (() => {
      var t = Xn();
      return (
        D(
          t,
          T(In, {
            base: e,
            get children() {
              return [
                T(Re, { path: "/", component: Mn }),
                T(Re, { path: "/fibonacci", component: Hn }),
                T(Re, { path: "/sql", component: Jn }),
              ];
            },
          })
        ),
        t
      );
    })()
  );
}
const Yn = document.getElementById("root");
Kt(() => T(Qn, {}), Yn);
