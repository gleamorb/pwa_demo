'use strict';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
             .then((registration) => {
                 console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
             })
             .catch(console.error.bind(console));
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
             .then((registration) => {
                 console.log(`firebase-messaging-ServiceWorker registration successful with scope: ${registration.scope}`);
             })
             .catch(console.error.bind(console));
}