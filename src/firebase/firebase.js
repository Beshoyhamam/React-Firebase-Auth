import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4c3gZRXeDPOJyCzr-D1NirdxjZ17sYD4",
    authDomain: "crud-389ab.firebaseapp.com",
    projectId: "crud-389ab",
    storageBucket: "crud-389ab.appspot.com",
    messagingSenderId: "18740575998",
    appId: "1:18740575998:web:875748fc0921b361726faf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);