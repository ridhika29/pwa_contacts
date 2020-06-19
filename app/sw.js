const pwaCache= 'pwa-cache-1';
const staticCache = ['index.html','register.html','main.js'];
self.addEventListener('install',(e)=>{

	let cacheReady = caches.open(pwaCache).then((cache)=>{
		
		return cache.addAll(staticCache);
	})

	e.waitUntil(cacheReady);
})
self.addEventListener('activate',(e)=>{
	let cacheCleaned = caches.keys().then((keys)=>{
		keys.forEach((key)=>
		{
			if(key !== pwaCache)
				return caches.delete(key);
		});
	});
	e.waitUntil(cacheCleaned);
})

self.addEventListener('fetch',(e)=>{
		e.respondWith(
			fetch(e.request).then((res)=>{
				caches.open(pwaCache).then(cache=> cache.put(e.request,res));
				return res.clone();
			}).catch(err => caches.match(e.request))
			)
})