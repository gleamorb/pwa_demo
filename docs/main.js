'use strict';

if ('serviceWorker' in navigator) {
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

    navigator.serviceWorker.register('./service-worker.js')
             .then((registration) => {
                 console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);

                 if (firebase.messaging.isSupported()) {
                    const messaging = firebase.messaging();

                    messaging.useServiceWorker(registration);
                    messaging.requestPermission()
                    .then(() => {
                        console.log('Have permission')
                        return messaging.getToken() //ユーザにプッシュ通知を表示する権限の許可を表示
                    }).then((currentToken) => {
                        if (currentToken) {
                            // プッシュ通知を受信し，表示できる状態
                            console.log(currentToken);
                            document.write(currentToken);
                        } else {
                            console.log('permission NG');
                        }
                    }).catch((err) => {
                        console.log('Error Occurred.');
                    })
                } else {
                    console.log("This browser does not support 'FireBase Messaging'.");
                }
             })
             .catch(console.error.bind(console));
}