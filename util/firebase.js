// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import firebase from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDG8AK1W8hZVDr4b0ldQ5vVgMfmcDLsmjM",
    authDomain: "library-1092e.firebaseapp.com",
    databaseURL: "https://library-1092e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "library-1092e",
    storageBucket: "library-1092e.appspot.com",
    messagingSenderId: "237326722140",
    appId: "1:237326722140:web:239b7e8d835ea9a297f299",
    measurementId: "G-0BPNGKQ2DH"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// if (getApp() == undefined) {
//     firebase.initializeApp(firebaseConfig);
// }

export const fb = initializeApp(firebaseConfig);
// export default firebase
// const analytics = getAnalytics(app);