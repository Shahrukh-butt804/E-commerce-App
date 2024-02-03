// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw2LkauZ4_nss1tvXwDURWywyDi4ofhq0",
  authDomain: "store-app-22c74.firebaseapp.com",
  projectId: "store-app-22c74",
  storageBucket: "store-app-22c74.appspot.com",
  messagingSenderId: "191640336184",
  appId: "1:191640336184:web:f2231b8eb7a6bc4bb273cd"
};

// Initialize Firebase
const fbconfig = initializeApp(firebaseConfig);

export {fbconfig};