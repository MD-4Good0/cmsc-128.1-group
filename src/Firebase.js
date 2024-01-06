// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
//import { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeApp as initializeAppInternal, onLog, registerVersion, setLogLevel } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChvLOkaBWbvieTOdkWYcNSuZz5kwRSJFI",
  authDomain: "fir-updated-15e7f.firebaseapp.com",
  projectId: "fir-updated-15e7f",
  storageBucket: "fir-updated-15e7f.appspot.com",
  messagingSenderId: "568287701884",
  appId: "1:568287701884:web:ad0c223f16a3d08fe7d2f9",
  measurementId: "G-Y9JCB5RE1T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const firestore = getFirestore(app);

const firestore = getFirestore(app);

export const db = getFirestore();

//export { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeAppInternal as initializeApp, onLog, registerVersion, setLogLevel, firestore };