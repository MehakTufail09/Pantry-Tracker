// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCzLVGXdWrJ5G8M7C89yQ-mRiggyPll1FM",
	authDomain: "pantry-tracker-2b3ab.firebaseapp.com",
	projectId: "pantry-tracker-2b3ab",
	storageBucket: "pantry-tracker-2b3ab.appspot.com",
	messagingSenderId: "132982403037",
	appId: "1:132982403037:web:87b3d067083d35adfe5034",
	measurementId: "G-T2WFKZH9X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);
export { firestore, auth };
