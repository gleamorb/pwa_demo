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

/** プッシュイベント */
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

self.addEventListener('push', (event) => {
    console.info('push', event);

    importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

    // FireBase
    var firebaseConfig = {
        apiKey: "AIzaSyAM_YeeyCq0iPtUDXJv7rv9Ek5mrwMp1LQ",
        authDomain: "pwa-pushdemo-94bb7.firebaseapp.com",
        databaseURL: "https://pwa-pushdemo-94bb7.firebaseio.com",
        projectId: "pwa-pushdemo-94bb7",
        storageBucket: "pwa-pushdemo-94bb7.appspot.com",
        messagingSenderId: "10453373238",
        appId: "1:10453373238:web:68d979d2e6d990f8"
    };
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();
});
