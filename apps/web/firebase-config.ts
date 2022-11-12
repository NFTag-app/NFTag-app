// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyBUXXid6fMsYvwYbyCPwP9Nt10VUTAwzNA",
	authDomain: "nftag-app.firebaseapp.com",
	projectId: "nftag-app",
	storageBucket: "nftag-app.appspot.com",
	messagingSenderId: "661572892323",
	appId: "1:661572892323:web:e49ee690c45887bf6c7116",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
