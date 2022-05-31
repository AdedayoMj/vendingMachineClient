import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from './config';
// import config from './config';
const firebaseConfig =  {
    apiKey: "AIzaSyD-0CAo-VAoUg6d74hoaQ9nhyagdbA7Zv0",
    authDomain: "vendingmachine-d4614.firebaseapp.com",
    projectId: "vendingmachine-d4614",
    storageBucket: "vendingmachine-d4614.appspot.com",
    messagingSenderId: "536623691632",
    appId: "1:536623691632:web:5148e8de9b397f70b1c1b5"
}
// Initialize Firebase
const Firebase = firebase.initializeApp(config.firebase);

export const auth = getAuth();
export default Firebase;