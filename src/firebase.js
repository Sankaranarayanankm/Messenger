

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcOFUqrqS7_9DNjlNmM_poXVGIWPClxU0",
  authDomain: "messenger-add37.firebaseapp.com",
  projectId: "messenger-add37",
  storageBucket: "messenger-add37.appspot.com",
  messagingSenderId: "875359183802",
  appId: "1:875359183802:web:254f4741d7025ac6907383"
};

const app = initializeApp(firebaseConfig);

const db=getFirestore(app);

export default db;