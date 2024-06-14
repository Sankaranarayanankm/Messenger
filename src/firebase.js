import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHrzKZ-q6Nb2FUM05Ly1V96jIpYK3XNiI",
  authDomain: "messenger-f0be3.firebaseapp.com",
  projectId: "messenger-f0be3",
  storageBucket: "messenger-f0be3.appspot.com",
  messagingSenderId: "1056535662332",
  appId: "1:1056535662332:web:df164a5f0b953febe99179",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
