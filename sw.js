if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),f={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/185-7500aa78fa704f15.js",revision:"7500aa78fa704f15"},{url:"/_next/static/chunks/2cca2479-fa84b3fb61d9028a.js",revision:"fa84b3fb61d9028a"},{url:"/_next/static/chunks/33-af6c0868c39672dc.js",revision:"af6c0868c39672dc"},{url:"/_next/static/chunks/4b358913-734cdc3815a268f1.js",revision:"734cdc3815a268f1"},{url:"/_next/static/chunks/512-1930ad385d65fedc.js",revision:"1930ad385d65fedc"},{url:"/_next/static/chunks/524-6ef22f72f4f5eec5.js",revision:"6ef22f72f4f5eec5"},{url:"/_next/static/chunks/748-a8717210e747e30b.js",revision:"a8717210e747e30b"},{url:"/_next/static/chunks/805-b0c0ed47a14ff563.js",revision:"b0c0ed47a14ff563"},{url:"/_next/static/chunks/895-f54e3a8db2c12d1c.js",revision:"f54e3a8db2c12d1c"},{url:"/_next/static/chunks/ea88be26-2052e29ca5f3f12f.js",revision:"2052e29ca5f3f12f"},{url:"/_next/static/chunks/framework-73b8966a3c579ab0.js",revision:"73b8966a3c579ab0"},{url:"/_next/static/chunks/main-112c28dd079fb5e4.js",revision:"112c28dd079fb5e4"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/auth/login-767d5eb4dc9aac2f.js",revision:"767d5eb4dc9aac2f"},{url:"/_next/static/chunks/pages/dashboard-d75629a63a7ab90f.js",revision:"d75629a63a7ab90f"},{url:"/_next/static/chunks/pages/farm/%5BfarmId%5D-1136be99b8e7ac36.js",revision:"1136be99b8e7ac36"},{url:"/_next/static/chunks/pages/farm/%5BfarmId%5D/crop/%5BcropId%5D-4efeac6c43f4e4a9.js",revision:"4efeac6c43f4e4a9"},{url:"/_next/static/chunks/pages/farm/%5BfarmId%5D/crop/%5BcropId%5D/challenge-a5716d267e387532.js",revision:"a5716d267e387532"},{url:"/_next/static/chunks/pages/farm/%5BfarmId%5D/crop/%5BcropId%5D/sensor/add-b6f9d3f01dbf88c2.js",revision:"b6f9d3f01dbf88c2"},{url:"/_next/static/chunks/pages/farm/%5BfarmId%5D/crop/add-071b99950bf659d0.js",revision:"071b99950bf659d0"},{url:"/_next/static/chunks/pages/farm/add-36cb56b940a59d53.js",revision:"36cb56b940a59d53"},{url:"/_next/static/chunks/pages/farms-873fa8ae1128e508.js",revision:"873fa8ae1128e508"},{url:"/_next/static/chunks/pages/index-2f1da67f60e2a460.js",revision:"2f1da67f60e2a460"},{url:"/_next/static/chunks/pages/profile/register-1bba6e895c018195.js",revision:"1bba6e895c018195"},{url:"/_next/static/chunks/pages/profile/role-choice-befb9a34b7ce6e0d.js",revision:"befb9a34b7ce6e0d"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-235955b20eb3ee85.js",revision:"235955b20eb3ee85"},{url:"/_next/static/css/f1ffe39daa5118f4.css",revision:"f1ffe39daa5118f4"},{url:"/_next/static/gSjqfx4jtXBXOYbJRSQ_c/_buildManifest.js",revision:"1b7d8db6504ab64323a2c17a99c45130"},{url:"/_next/static/gSjqfx4jtXBXOYbJRSQ_c/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/em.gif",revision:"04a4d7754df17b4f33a016e8c8bee878"},{url:"/empty.gif",revision:"eb2a77d18ee773ebce89bb8cbfc17f32"},{url:"/farmer-woman.png",revision:"f3032c1a7ab4c6a88274200395686482"},{url:"/favicon.ico",revision:"ecb696c3b3100750240339bee7c6024d"},{url:"/images/close.svg",revision:"9ec8baf2ccf51e3da034a0f0eb6f18a4"},{url:"/images/farm.png",revision:"c76713e8f33a40ead027506ee671a76b"},{url:"/images/farm2.png",revision:"74a2e7511efcc63e69c1ccf91291c181"},{url:"/images/farm3.png",revision:"6762fccac6da464e1e00aa0865300bba"},{url:"/images/farmer.png",revision:"d561b0227b5cc93b51d02ed3f927cb0c"},{url:"/images/jonathan.png",revision:"08563f0ab6fffddebce62d109bc3ae5e"},{url:"/images/landing.svg",revision:"75b737ac5a1ce9a38f22e3810ce8c0cc"},{url:"/images/logo.svg",revision:"4d40ab958eaaad4993b398320fc83e58"},{url:"/images/mdi_plant-outline.png",revision:"d05983b5af8e9e76a808876c8ba4395f"},{url:"/images/menu.svg",revision:"6d85dc971e81ac56856d96c46bd66c59"},{url:"/images/plant.png",revision:"73c2227e4782f78ac7eb060bdf94d407"},{url:"/images/profile-builder.png",revision:"cb2d1ad9673b5ae0bbe4640ae67dbace"},{url:"/loading.gif",revision:"6ec2984188ac5c92952536b61634aa45"},{url:"/logo.png",revision:"ecb696c3b3100750240339bee7c6024d"},{url:"/lotties/farm.json",revision:"b17181fda712259c2e1c4443cd11cae1"},{url:"/lotties/plant.json",revision:"c8def0f357dd0e34fa42f3f6a1bdcbf8"},{url:"/lotties/profile-builder.json",revision:"b7cba143df20941125d3638e4f85cc38"},{url:"/sheriff.png",revision:"419596007e03f42e293e85fceef68c28"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
