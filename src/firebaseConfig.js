// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBZWA3-QAocWqAyuEF61kXKJZnZ2kFRm3I",

    authDomain: "interactive-jacket.firebaseapp.com",

    projectId: "interactive-jacket",

    storageBucket: "interactive-jacket.appspot.com",

    messagingSenderId: "195364612219",

    appId: "1:195364612219:web:8b15530835061bc7bb9ade"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

