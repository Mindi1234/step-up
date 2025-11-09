import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDHPU8jtzXNmFnFaAynFqpwL9u5tBwKSg0",
  authDomain: "stepup-for-better-habits.firebaseapp.com",
  projectId: "stepup-for-better-habits",
  storageBucket: "stepup-for-better-habits.firebasestorage.app",
  messagingSenderId: "58764131591",
  appId: "1:58764131591:web:742ae45696ab502dd319a2",
  measurementId: "G-NTD7LTWKN4"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const analytics = getAnalytics(app);