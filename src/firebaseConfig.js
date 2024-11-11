import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_eAf1cVvseQcZ-MdOeJZEALD1M2DBP88",
    authDomain: "yts-movie-clone-auth.firebaseapp.com",
    projectId: "yts-movie-clone-auth",
    storageBucket: "yts-movie-clone-auth.firebasestorage.app",
    messagingSenderId: "945367151163",
    appId: "1:945367151163:web:c1943a053192eda73c621e",
    measurementId: "G-BTYPR822YF"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
