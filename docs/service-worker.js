'use strict';


const CACHE_NAME = 'cache-v1';
const urlsToCache = [
        './'
];

/**インストール イベント */
self.addEventListener('install', (event) => {
    console.info('install', event);

    event.waitUntil(
        caches.open(CACHE_NAME)
              .then((cache) => {
                // 指定されたリソースをキャッシュに追加する
                return cache.addAll(urlsToCache);
              })
    );
});

/** プッシュ通知イベント */
self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription()
            .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint
            }
            throw new Error('User not subscribed')
            })
            .then(function(res) {
                return fetch('/notifications.json')
            })
            .then(function(res) {
                if (res.status === 200) {
                return res.json()
                }
                throw new Error('notification api response error')
            })
            .then(function(res) {
                return self.registration.showNotification(res.title, {
                icon: '/pwa_demo/image/rogo.png',
                body: res.body
            })
        })
    )
})

/** アクティベートイベント */
self.addEventListener('activate', (event) =>{
    console.info('activate', event);

    var cacheWhiteList =[CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheName) => {
            return Promise.all(
                cacheName.map((cacheName) => {
                    // ホワイトリストに無いキャッシュ（古いキャッシュ）は削除する
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

/** フェッチイベント */
self.addEventListener('fetch', (event) => {
    console.info('fetch', event);

    event.respondWith(
        caches.match(event.request)
              .then((response) => {
                if(response){
                    return response;
                }

                let fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        if(!response || response.status !== 200 || response.type !== 'basic'){
                            return response;
                        }

                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                              .then((cache) => {
                                cache.put(event.request, responseToCache);
                              });

                        return response;
                    });
              })
    );
});