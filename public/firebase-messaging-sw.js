// importScripts("https://www.gstatic.com/firebasejs/^10.8.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/^10.8.0/firebase-messaging.js");
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: "AIzaSyD4tj4EbrKhCrF-LrvmeNCFaQocPEH9TPA",
  authDomain: "testproject-40efa.firebaseapp.com",
  projectId: "testproject-40efa",
  storageBucket: "testproject-40efa.appspot.com",
  messagingSenderId: "657170046896",
  appId: "1:657170046896:web:41874facfe0be7be038075",
  measurementId: "G-ZHM2CC22C9"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload, "Hello frpom firebase-messaging-sw.js")
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

self.registration.showNotification(notificationTitle, notificationOptions);
});