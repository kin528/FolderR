// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBMFUOq6QssSxefbojyhVF_lEHfI6UMlQ",
  authDomain: "folderredirectionmacabenta.firebaseapp.com",
  projectId: "folderredirectionmacabenta",
  storageBucket: "folderredirectionmacabenta.firebasestorage.app",
  messagingSenderId: "580280550730",
  appId: "1:580280550730:web:4ca111596bfb05676aadb3",
  measurementId: "G-T1QBPYCCP5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };