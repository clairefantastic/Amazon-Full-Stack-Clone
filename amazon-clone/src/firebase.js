import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAO-7hiiFpGogoryzoxPByeRyw-vOuaaD8",
    authDomain: "clone-6b855.firebaseapp.com",
    projectId: "clone-6b855",
    storageBucket: "clone-6b855.appspot.com",
    messagingSenderId: "98276476399",
    appId: "1:98276476399:web:7d315ff939418642bae21a",
    measurementId: "G-BRXXGF9JF1"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };