importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAM_YeeyCq0iPtUDXJv7rv9Ek5mrwMp1LQ",
    authDomain: "pwa-pushdemo-94bb7.firebaseapp.com",
    databaseURL: "https://pwa-pushdemo-94bb7.firebaseio.com",
    projectId: "pwa-pushdemo-94bb7",
    storageBucket: "pwa-pushdemo-94bb7.appspot.com",
    messagingSenderId: "10453373238",
    appId: "1:10453373238:web:68d979d2e6d990f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();