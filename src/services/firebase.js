import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-q2pHH_7cahXOcbs4U0loPr3kf1ggdrU",
  authDomain: "ractangle-6e5be.firebaseapp.com",
  databaseURL: "https://ractangle-6e5be.firebaseio.com",
  projectId: "ractangle-6e5be",
  storageBucket: "ractangle-6e5be.appspot.com",
  messagingSenderId: "1090477297415",
  appId: "1:1090477297415:web:a38a87ba95cef492477fa2",
  measurementId: "G-D0C535YVQV",
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { db, storage };
