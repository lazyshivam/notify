import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
    apiKey: "AIzaSyBVKhRfV2CyKSCZa3BDaKuerK9T2D-Nb9Q",
    authDomain: "notify-88b0d.firebaseapp.com",
    projectId: "notify-88b0d",
    storageBucket: "notify-88b0d.appspot.com",
    messagingSenderId: "1038828235672",
    appId: "1:1038828235672:web:f6b261fdc75e49982059ed",
    measurementId: "G-L3BNBW47VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);