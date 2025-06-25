import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDFukhoddIgOWTrcvr3J1XKeek8kxCYiE",
  authDomain: "coach-72c99.firebaseapp.com",
  projectId: "coach-72c99",
  storageBucket: "coach-72c99.firebasestorage.app",
  messagingSenderId: "297681596120",
  appId: "1:297681596120:web:f917ca854c39044de0b1ad"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);