// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// console.log(import.meta.env.VITE_KEY)
const firebaseConfig = {
  "apiKey": import.meta.env.VITE_APIKEY,
  "authDomain": import.meta.env.VITE_AUTH,
  "projectId": import.meta.env.VITE_PROID,
  "storageBucket": import.meta.env.VITE_BUCKET,
  "messagingSenderId": import.meta.env.VITE_SENDERID,
  "appId": import.meta.env.VITE_APPID,
  "measurementId": import.meta.env.VITE_MEASUREMENTID
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth ,provider} ;
