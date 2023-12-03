// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'raffle-f7f4d.firebaseapp.com',
  databaseURL: 'https://raffle-f7f4d-default-rtdb.firebaseio.com/survey',
  projectId: 'raffle-f7f4d',
  storageBucket: 'raffle-f7f4d.appspot.com',
  messagingSenderId: '890667444599',
  appId: '1:890667444599:web:d9e7a64fadba889133d972',
  measurementId: 'G-T546J4H778',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, app, db };
