import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Log configuration (temporary, for debugging)
console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : 'missing',
  authDomain: firebaseConfig.authDomain || 'missing',
  projectId: firebaseConfig.projectId || 'missing',
  storageBucket: firebaseConfig.storageBucket || 'missing',
  messagingSenderId: firebaseConfig.messagingSenderId || 'missing',
  appId: firebaseConfig.appId || 'missing'
});

let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app); 