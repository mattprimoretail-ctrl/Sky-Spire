/* Sky Spire service worker: caches the game so it opens instantly and works offline after the first visit. */
const CACHE='sky-spire-v4';
const THREE_URL='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-64.png','./icons/icon.svg'];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    await c.addAll(SHELL);
    try{const r=await fetch(new Request(THREE_URL,{mode:'no-cors'}));await c.put(THREE_URL,r);}catch(err){}
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  const same=url.origin===self.location.origin;
  if(!same&&req.url!==THREE_URL)return;
  if(req.mode==='navigate'){
    /* network first so updates arrive, cache as the offline fallback */
    e.respondWith((async()=>{
      try{const r=await fetch(req);const c=await caches.open(CACHE);c.put('./index.html',r.clone());return r;}
      catch(err){return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error();}
    })());
    return;
  }
  e.respondWith((async()=>{
    const hit=await caches.match(req,{ignoreSearch:true});
    if(hit)return hit;
    try{const r=await fetch(req);if(r&&(r.ok||r.type==='opaque')){const c=await caches.open(CACHE);c.put(req,r.clone());}return r;}
    catch(err){return Response.error();}
  })());
});
