const staticCache = 'sCache-v2'
const dynimicCache = 'dCache-v2'

const assetUrls = [
    '/app.js',
    '/index.html',


]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCache)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
    const cacheName = await caches.keys()
    await Promise.all(
        cacheName
        .filter(name => name !== staticCache)
        .filter(name => name !== dynimicCache)
        .map(name => caches.delete(name))
    )
})

self.addEventListener('fetch', event => {
    const { request } = event

    const url = new URL(request.url)
    if(url.origin === location.origin) {
        event.respondWith(cachesFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})


async function cachesFirst (request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}

async function networkFirst (request) {
    const cache = await caches.open(dynimicCache)
    try{
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached
    }
}