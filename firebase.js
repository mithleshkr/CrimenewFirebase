import firebase from 'firebase';





const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyCcTKnn32FRhxbYlZ30qIBDKeDVsg0bWtA",
    authDomain: "newtest-f2b1a.firebaseapp.com",
    projectId: "newtest-f2b1a",
    storageBucket: "newtest-f2b1a.appspot.com",
    messagingSenderId: "956928454159",
    appId: "1:956928454159:web:e59c9cb1f3ac980719bd7a",
    measurementId: "G-JGC53553ZD"
  });

  export const db = firebaseConfig.firestore();
  export const auth = firebaseConfig.auth();
   