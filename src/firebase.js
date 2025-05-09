
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAaRdO6VktTgN6mTDt4smNgkvXatEkfsbg",
  authDomain: "chatnest-bf0e8.firebaseapp.com",
  projectId: "chatnest-bf0e8",
  storageBucket: "chatnest-bf0e8.firebasestorage.app",
  messagingSenderId: "490404101814",
  appId: "1:490404101814:web:01b926784550ea443c3017",
  measurementId: "G-9L27FLW2GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;