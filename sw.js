const CACHE='luki-messe-v12';
const CORE=['./','./index.html','./assets/berufe-match-qr.png','./assets/karriere-qr.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(async c=>{await Promise.allSettled(CORE.map(x=>c.add(x)))}))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('luki-messe-')&&k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(async cached=>{try{let response=await fetch(e.request);if(response.ok){let clone=response.clone();caches.open(CACHE).then(c=>c.put(e.request,clone)).catch(()=>{})}return response}catch{return cached||Response.error()}}))});
