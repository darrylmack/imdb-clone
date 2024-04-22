import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAzezvauq2lior2k4770Stgahm-roOKYIg',
  authDomain: 'reel-favorites.firebaseapp.com',
  projectId: 'reel-favorites',
  storageBucket: 'reel-favorites.appspot.com',
  messagingSenderId: '689515056321',
  appId: '1:689515056321:web:59f9c67e68d83aadaad840',
  measurementId: 'G-0WMVZW102F'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
