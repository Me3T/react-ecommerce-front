import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBttMHhrsOMS9IcFekCsmexnSouDMRjswg",
  authDomain: "my---ecommerce.firebaseapp.com",
  projectId: "my---ecommerce",
  storageBucket: "my---ecommerce.appspot.com",
  messagingSenderId: "123134119333",
  appId: "1:123134119333:web:8c46ff5704d0e05833ec4c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
