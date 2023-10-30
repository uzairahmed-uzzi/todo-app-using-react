// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBkhuwYlQWSbrUXd6smGoQwHDvmKd75ntE",
  authDomain: "todo-uzziverse.firebaseapp.com",
  projectId: "todo-uzziverse",
  storageBucket: "todo-uzziverse.appspot.com",
  messagingSenderId: "792870151219",
  appId: "1:792870151219:web:f6890e6e830e348ae92f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{db}