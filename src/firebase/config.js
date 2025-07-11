import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const appFirestore = firebase.firestore();
const appAuth = firebase.auth();

// Firebase timestamp
const timestamp = firebase.firestore.Timestamp;

export { appFirestore, appAuth, timestamp };
