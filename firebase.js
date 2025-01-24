// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzC_OOQixve_QmMQJCmUV-4EdRgTX3afw",
  authDomain: "file-upload-c2ae5.firebaseapp.com",
  projectId: "file-upload-c2ae5",
  storageBucket: "file-upload-c2ae5.firebasestorage.app",
  messagingSenderId: "303284634951",
  appId: "1:303284634951:web:4264eedd2a5f06a503f862",
  measurementId: "G-BNYBRXW8XK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };