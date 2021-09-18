import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC6Pdhf13gvzdUxcktUxFea2fCe8m5riaQ",
  authDomain: "youngenginer-1c1ab.firebaseapp.com",
  databaseURL: "https://youngenginer-1c1ab.firebaseio.com",
  projectId: "youngenginer-1c1ab",
  storageBucket: "youngenginer-1c1ab.appspot.com",
  messagingSenderId: "779340391334",
  appId: "1:779340391334:web:fffadbc3c2a457d557e567"
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { db, storage };
