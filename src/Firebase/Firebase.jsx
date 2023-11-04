// Import the functions you need from the SDKs you need
import React,{ createContext,useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const FirebaseContext=createContext(null);

export const useFireBase=()=>useContext(FirebaseContext);

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

const dbCollection=collection(db,'todo')
// COMPONENT
export const FireBaseProvider=(props)=>{
  // getDATA
  const getAllData=async()=>{
    const dataArr=[]
    const snapShot=await getDocs(dbCollection,orderBy("time","asc"))
    snapShot.forEach((doc)=>{
      const data=doc.data();
      dataArr.push({id:doc.id,data,checked:false})
    });
    return dataArr;
  }
  // ADD DATA
  const postData=async(data)=>await addDoc(dbCollection,data);
  const updateData=async(idref,data)=>{
    const docRef=doc(db,'todo',idref);
    const res= await updateDoc(docRef,data);
    return res;
  }
  return(
  <>
  <FirebaseContext.Provider value={{getAllData,postData,updateData}}>
    {props.children}
  </FirebaseContext.Provider>
  </>
)
}