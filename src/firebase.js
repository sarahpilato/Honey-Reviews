// import firebase
import firebase from 'firebase/app';

// import the database info from the firebase module 
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSEiZ5Yn3BGfIbFtoyZ0J71eLyKL_0elM",
    authDomain: "honey-project-3-be0c2.firebaseapp.com",
    projectId: "honey-project-3-be0c2",
    storageBucket: "honey-project-3-be0c2.appspot.com",
    messagingSenderId: "538672383979",
    appId: "1:538672383979:web:b3d0a6531af22c5e293bae"
};
// initialize Firebase
firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;
