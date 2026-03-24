/**
 * Inline theme bootstrap matching next-themes 0.4.6 (see dist index.mjs, function M).
 * Keep in sync with ThemeProvider props in components/theme-provider.tsx.
 * Inlined from the root layout head (Server Component only). next/script is client-side
 * and still triggers React 19’s “script tag while rendering” warning. next-themes is patched
 * not to emit its own ThemeScript.
 */
export const THEME_INIT_SCRIPT_HTML: string = "((e,i,s,u,m,a,l,h)=>{let d=document.documentElement,w=[\"light\",\"dark\"];function p(n){(Array.isArray(e)?e:[e]).forEach(y=>{let k=y===\"class\",S=k&&a?m.map(f=>a[f]||f):m;k?(d.classList.remove(...S),d.classList.add(a&&a[n]?a[n]:n)):d.setAttribute(y,n)}),R(n)}function R(n){h&&w.includes(n)&&(d.style.colorScheme=n)}function c(){return window.matchMedia(\"(prefers-color-scheme: dark)\").matches?\"dark\":\"light\"}if(u)p(u);else try{let n=localStorage.getItem(i)||s,y=l&&n===\"system\"?c():n;p(y)}catch(n){}})(\"class\",\"theme\",\"system\",null,[\"light\",\"dark\"],null,true,true)";
