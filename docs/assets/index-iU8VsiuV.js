(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const Be=!1,Ze=(e,t)=>e===t,te={equals:Ze};let $e=Ae;const M=1,_=2,le={owned:null,cleanups:null,context:null,owner:null};var d=null;let Y=null,_e=null,f=null,u=null,w=null,I=0;function De(e,t){const n=f,i=d,s=e.length===0,l=t===void 0?i:t,o=s?le:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=s?e:()=>e(()=>L(()=>B(o)));d=o,f=null;try{return Z(r,!0)}finally{f=n,d=i}}function b(e,t){t=t?Object.assign({},te,t):te;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),re(n,s));return[We.bind(n),i]}function D(e,t,n){const i=ze(e,t,!1,M);X(i)}function L(e){if(f===null)return e();const t=f;f=null;try{return e()}finally{f=t}}function We(){if(this.sources&&this.state)if(this.state===M)X(this);else{const e=u;u=null,Z(()=>W(this),!1),u=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function re(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&Z(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],o=Y&&Y.running;o&&Y.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?u.push(l):w.push(l),l.observers&&fe(l)),o||(l.state=M)}if(u.length>1e6)throw u=[],new Error},!1)),t}function X(e){if(!e.fn)return;B(e);const t=I;ve(e,e.value,t)}function ve(e,t,n){let i;const s=d,l=f;f=d=e;try{i=e.fn(t)}catch(o){return e.pure&&(e.state=M,e.owned&&e.owned.forEach(B),e.owned=null),e.updatedAt=n+1,ce(o)}finally{f=l,d=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?re(e,i):e.value=i,e.updatedAt=n)}function ze(e,t,n,i=M,s){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return d===null||d!==le&&(d.owned?d.owned.push(l):d.owned=[l]),l}function oe(e){if(e.state===0)return;if(e.state===_)return W(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<I);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===M)X(e);else if(e.state===_){const i=u;u=null,Z(()=>W(e,t[0]),!1),u=i}}function Z(e,t){if(u)return e();let n=!1;t||(u=[]),w?n=!0:w=[],I++;try{const i=e();return Ie(n),i}catch(i){n||(w=null),u=null,ce(i)}}function Ie(e){if(u&&(Ae(u),u=null),e)return;const t=w;w=null,t.length&&Z(()=>$e(t),!1)}function Ae(e){for(let t=0;t<e.length;t++)oe(e[t])}function W(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===M?i!==t&&(!i.updatedAt||i.updatedAt<I)&&oe(i):s===_&&W(i,t)}}}function fe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=_,n.pure?u.push(n):w.push(n),n.observers&&fe(n))}}function B(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),o=n.observerSlots.pop();i<s.length&&(l.sourceSlots[o]=i,s[i]=l,n.observerSlots[i]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)B(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)B(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Re(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ce(e,t=d){throw Re(e)}function Oe(e,t){return L(()=>e(t||{}))}function Ye(e,t,n){let i=n.length,s=t.length,l=i,o=0,r=0,A=t[s-1].nextSibling,c=null;for(;o<s||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===o){const a=l<i?r?n[r-1].nextSibling:n[l-r]:A;for(;r<l;)e.insertBefore(n[r++],a)}else if(l===r)for(;o<s;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],a),t[s]=n[l]}else{if(!c){c=new Map;let h=r;for(;h<l;)c.set(n[h],h++)}const a=c.get(t[o]);if(a!=null)if(r<a&&a<l){let h=o,T=1,$;for(;++h<s&&h<l&&!(($=c.get(t[h]))==null||$!==a+T);)T++;if(T>a-r){const R=t[o];for(;r<a;)e.insertBefore(n[r++],R)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const ne="_$DX_DELEGATE";function Je(e,t,n,i={}){let s;return De(l=>{s=l,t===document?e():y(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function Le(e,t,n,i){let s;const l=()=>{const r=document.createElement("template");return r.innerHTML=e,r.content.firstChild},o=()=>(s||(s=l())).cloneNode(!0);return o.cloneNode=o,o}function Xe(e,t=window.document){const n=t[ne]||(t[ne]=new Set);for(let i=0,s=e.length;i<s;i++){const l=e[i];n.has(l)||(n.add(l),t.addEventListener(l,Ge))}}function y(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return v(e,t,i,n);D(s=>v(e,t(),s,n),i)}function Ge(e){let t=e.target;const n=`$$${e.type}`,i=e.target,s=e.currentTarget,l=A=>Object.defineProperty(e,"target",{configurable:!0,value:A}),o=()=>{const A=t[n];if(A&&!t.disabled){const c=t[`${n}Data`];if(c!==void 0?A.call(t,c,e):A.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&l(t.host),!0},r=()=>{for(;o()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const A=e.composedPath();l(A[0]);for(let c=0;c<A.length-2&&(t=A[c],!!o());c++){if(t._$host){t=t._$host,r();break}if(t.parentNode===s)break}}else r();l(i)}function v(e,t,n,i,s){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=i!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(o){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=C(e,n,i,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=C(e,n,i);else{if(l==="function")return D(()=>{let r=t();for(;typeof r=="function";)r=r();n=v(e,r,n,i)}),()=>n;if(Array.isArray(t)){const r=[],A=n&&Array.isArray(n);if(J(r,t,n,s))return D(()=>n=v(e,r,n,i,!0)),()=>n;if(r.length===0){if(n=C(e,n,i),o)return n}else A?n.length===0?se(e,r,i):Ye(e,n,r):(n&&C(e),se(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=C(e,n,i,t);C(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function J(e,t,n,i){let s=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],A=n&&n[e.length],c;if(!(r==null||r===!0||r===!1))if((c=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))s=J(e,r,A)||s;else if(c==="function")if(i){for(;typeof r=="function";)r=r();s=J(e,Array.isArray(r)?r:[r],Array.isArray(A)?A:[A])||s}else e.push(r),s=!0;else{const a=String(r);A&&A.nodeType===3&&A.data===a?e.push(A):e.push(document.createTextNode(a))}}return s}function se(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function C(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(s!==r){const A=r.parentNode===e;!l&&!o?A?e.replaceChild(s,r):e.insertBefore(s,n):A&&r.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}function z(e){return e<=1?e:z(e-1)+z(e-2)}let m;function ie(e){return m.fibonacci(e)>>>0}async function Ue(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(i){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",i);else throw i}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}function Ve(){const e={};return e.wbg={},e.wbg.__wbindgen_init_externref_table=function(){const t=m.__wbindgen_export_0,n=t.grow(4);t.set(0,void 0),t.set(n+0,void 0),t.set(n+1,null),t.set(n+2,!0),t.set(n+3,!1)},e}function Fe(e,t){return m=e.exports,ue.__wbindgen_wasm_module=t,m.__wbindgen_start(),m}async function ue(e){if(m!==void 0)return m;typeof e<"u"&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof e>"u"&&(e=new URL("data:application/wasm;base64,AGFzbQEAAAABCQJgAX8Bf2AAAAInAQN3YmcfX193YmluZGdlbl9pbml0X2V4dGVybnJlZl90YWJsZQABAwMCAAAEBQFvAIABBQMBABEHPwQGbWVtb3J5AgAJZmlib25hY2NpAAITX193YmluZGdlbl9leHBvcnRfMAEAEF9fd2JpbmRnZW5fc3RhcnQAAAo1AiwBAX8gAEECTwRAA0AgAEEBaxABIAFqIQEgAEECayIAQQFLDQALCyAAIAFqCwYAIAAQAQsL5wcCAEGAgMAAC9QHTGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAAABAAKgAAAEM6XFVzZXJzXHBoczU1XC5jYXJnb1xyZWdpc3RyeVxzcmNcaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWZcb25jZV9jZWxsLTEuMjEuM1xzcmNcbGliLnJzADQAEABfAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAApAAQAA4AAAA0ABAAXwAAAHoCAAANAAAAL3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAMwAEABLAAAAjQUAABsAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJzKAEQAEwAAAArAgAAEQAAAAQAAAAMAAAABAAAAAUAAAAGAAAABwAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjcvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACcARAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAnAEQACkAAACuBAAADQAAAG1lbW9yeSBhbGxvY2F0aW9uIG9mICBieXRlcyBmYWlsZWQAAEQCEAAVAAAAWQIQAA0AAABzdGQvc3JjL2FsbG9jLnJzeAIQABAAAABjAQAACQAAAAQAAAAMAAAABAAAAAgAAAAAAAAACAAAAAQAAAAJAAAAAAAAAAgAAAAEAAAACgAAAAsAAAAMAAAADQAAAA4AAAAQAAAABAAAAA8AAAAQAAAAEQAAABIAAABjYXBhY2l0eSBvdmVyZmxvdwAAAPACEAARAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTkAQeyHwAALAQEAfAlwcm9kdWNlcnMCCGxhbmd1YWdlAQRSdXN0AAxwcm9jZXNzZWQtYnkDBXJ1c3RjHTEuODQuMCAoOWZjNmI0MzEyIDIwMjUtMDEtMDcpBndhbHJ1cwYwLjIzLjMMd2FzbS1iaW5kZ2VuEzAuMi4xMDAgKDI0MDVlYzJiNCkASQ90YXJnZXRfZmVhdHVyZXMEKw9tdXRhYmxlLWdsb2JhbHMrCHNpZ24tZXh0Kw9yZWZlcmVuY2UtdHlwZXMrCm11bHRpdmFsdWU=",import.meta.url));const t=Ve();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:i}=await Ue(await e,t);return Fe(n,i)}var Pe=Le("<div><h1>Fibonacci 비교 (JS vs Rust WASM)</h1><label>숫자 입력(40 이하):<input type=number min=0 max=40></label><button>실행</button><div><h2>결과</h2><table border=1 cellpadding=8><colgroup><col><col><col></colgroup><thead><tr><th>구현 방식</th><th>결과</th><th>소요 시간 (ms)</th></tr></thead><tbody><tr><td>JavaScript 워밍업 전</td><td></td><td></td></tr><tr><td>Rust (WASM) 워밍업 전</td><td></td><td></td></tr><tr><td>JavaScript 워밍업 후</td><td></td><td></td></tr><tr><td>Rust (WASM) 워밍업 후</td><td></td><td>");function He(){const[e,t]=b(10),[n,i]=b(null),[s,l]=b(null),[o,r]=b(null),[A,c]=b(null),[a,h]=b(null),[T,$]=b(null),[R,ae]=b(null),[de,pe]=b(null),he=40,ge=async()=>{await ue();const g=e();let j=performance.now(),x=z(g),Q=performance.now(),E=performance.now(),N=ie(g),S=performance.now();i(x),l(N),r(Q-j),c(S-E),j=performance.now(),x=z(g),Q=performance.now(),E=performance.now(),N=ie(g),S=performance.now(),h(x),$(N),ae(Q-j),pe(S-E)};return(()=>{var g=Pe(),j=g.firstChild,x=j.nextSibling,Q=x.firstChild,E=Q.nextSibling,N=x.nextSibling,S=N.nextSibling,be=S.firstChild,O=be.nextSibling,G=O.firstChild,U=G.firstChild,V=U.nextSibling,ye=V.nextSibling,we=G.nextSibling,me=we.nextSibling,F=me.firstChild,Me=F.firstChild,P=Me.nextSibling,xe=P.nextSibling,H=F.nextSibling,Ee=H.firstChild,k=Ee.nextSibling,Ne=k.nextSibling,q=H.nextSibling,Se=q.firstChild,K=Se.nextSibling,Ce=K.nextSibling,Te=q.nextSibling,je=Te.firstChild,ee=je.nextSibling,Qe=ee.nextSibling;return g.style.setProperty("padding","2rem"),g.style.setProperty("font-family","sans-serif"),E.$$input=p=>t(Math.min(parseInt(p.currentTarget.value),he)),N.$$click=ge,S.style.setProperty("margin-top","1rem"),O.style.setProperty("border-collapse","collapse"),O.style.setProperty("margin-top","1rem"),U.style.setProperty("width","150px"),V.style.setProperty("width","150px"),ye.style.setProperty("width","150px"),y(P,n),y(xe,()=>{var p;return(p=o())==null?void 0:p.toFixed(3)}),y(k,s),y(Ne,()=>{var p;return(p=A())==null?void 0:p.toFixed(3)}),y(K,a),y(Ce,()=>{var p;return(p=R())==null?void 0:p.toFixed(3)}),y(ee,T),y(Qe,()=>{var p;return(p=de())==null?void 0:p.toFixed(3)}),D(()=>E.value=e()),g})()}Xe(["input","click"]);const ke=document.getElementById("root");Je(()=>Oe(He,{}),ke);
