import firebase from 'firebase/app';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyASdTN73P46ggg0KX314Z9o4uP0Gvn9vLo",
  authDomain: "fir-chat-1e2b2.firebaseapp.com",
  projectId: "fir-chat-1e2b2",
  storageBucket: "fir-chat-1e2b2.appspot.com",
  messagingSenderId: "321763301955",
  appId: "1:321763301955:web:e0f99af6557a7610f492f6",
  measurementId: "G-4YG264SH2V"
};

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();
