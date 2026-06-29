import{j as e,m as p}from"./motion-C-_UmLQs.js";import{r as a,u as f,L as c}from"./vendor-DaMZjeFU.js";import{c as o}from"./download-CusrOwun.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=o("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=o("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=o("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=o("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),M=a.memo(function(){const[s,i]=a.useState(!1),[l,n]=a.useState(!1),[y,k]=a.useState(!1),d=f(),r=d.pathname==="/";a.useEffect(()=>{const t=()=>k(window.scrollY>50);return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),a.useEffect(()=>{n(!1)},[d]),a.useEffect(()=>{document.documentElement.classList.toggle("dark",s)},[s]);const m=t=>{document.querySelector(t)?.scrollIntoView({behavior:"smooth"}),n(!1)},x=[{name:"Home",href:"#home"},{name:"About",href:"#about"},{name:"Skills",href:"#skills"},{name:"Contact",href:"#contact"}];return e.jsx(p.header,{className:`fixed top-0 left-0 right-0 z-40 transition-colors ${y?"bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg":""}`,initial:{y:-100},animate:{y:0},children:e.jsxs("nav",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"flex items-center justify-between h-16",children:[e.jsxs(c,{to:"/",className:"flex items-center",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold",children:"MF"}),e.jsx("span",{className:"ml-3 text-xl font-bold text-gray-900 dark:text-white hidden sm:block",children:"Mohammad Fuzail"})]}),e.jsxs("div",{className:"hidden md:flex items-center gap-8",children:[r&&x.map(t=>e.jsx("button",{onClick:()=>m(t.href),className:"text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:t.name},t.name)),!r&&e.jsx(c,{to:"/",className:"text-gray-700 dark:text-gray-300 hover:text-blue-600",children:"Home"}),e.jsx("button",{onClick:()=>i(!s),className:"p-2 rounded-full bg-gray-200 dark:bg-gray-700","data-cursor":"pointer",children:s?e.jsx(u,{size:20}):e.jsx(h,{size:20})})]}),e.jsxs("div",{className:"md:hidden flex items-center gap-4",children:[e.jsx("button",{onClick:()=>i(!s),className:"p-2 rounded-full bg-gray-200 dark:bg-gray-700",children:s?e.jsx(u,{size:20}):e.jsx(h,{size:20})}),e.jsx("button",{onClick:()=>n(!l),className:"p-2 rounded-full bg-gray-200 dark:bg-gray-700",children:l?e.jsx(b,{size:20}):e.jsx(g,{size:20})})]})]}),l&&e.jsxs("div",{className:"md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",children:[r&&x.map(t=>e.jsx("button",{onClick:()=>m(t.href),className:"block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300",children:t.name},t.name)),!r&&e.jsx(c,{to:"/",className:"block px-4 py-3 text-gray-700 dark:text-gray-300",children:"Home"})]})]})})});export{M as default};
