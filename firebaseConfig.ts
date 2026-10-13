// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfT4sVVdZ_K0wHtuWo84n9pc-680Rwi7U",
  authDomain: "fir-shopping-list-976ec.firebaseapp.com",
  databaseURL: "https://fir-shopping-list-976ec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-shopping-list-976ec",
  storageBucket: "fir-shopping-list-976ec.firebasestorage.app",
  messagingSenderId: "319886453632",
  appId: "1:319886453632:web:9336a8c38030e87029af65",
  measurementId: "G-M0W6881J62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
