// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMmIwUBHA9ayiu5Or6nRjrLf4g8GzWHWk",
  authDomain: "todo-app-uzziverse.firebaseapp.com",
  projectId: "todo-app-uzziverse",
  storageBucket: "todo-app-uzziverse.appspot.com",
  messagingSenderId: "410307289876",
  appId: "1:410307289876:web:2b477a1f1ad3cd9b67d801"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{db}