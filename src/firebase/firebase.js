import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCjClhiPMjgwqXx9B5TfSGSRRbdKoXHH38",
    authDomain: "auth-firebase-react-f6ff1.firebaseapp.com",
    projectId: "auth-firebase-react-f6ff1",
    storageBucket: "auth-firebase-react-f6ff1.appspot.com",
    messagingSenderId: "775641764316",
    appId: "1:775641764316:web:4efc056c88d3dcf7d9bf19"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);