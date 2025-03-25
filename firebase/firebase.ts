
// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBM60GbatJbCcmytzfW9J4gL-pDxz4MxMo",
  authDomain: "esp32-gps-firebase-2fd12.firebaseapp.com",
  databaseURL: "https://esp32-gps-firebase-2fd12-default-rtdb.firebaseio.com",
  projectId: "esp32-gps-firebase-2fd12",
  storageBucket: "esp32-gps-firebase-2fd12.firebasestorage.app",
  messagingSenderId: "468797100873",
  appId: "1:468797100873:web:e8a5565dc6e270ac8a0098",
  measurementId: "G-0TK8VKHPS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };