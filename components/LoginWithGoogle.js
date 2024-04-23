// src/useAuth.js or any component file
import { auth } from '../utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log('Logged in user:', user);
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log('Access Token:', token);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error('Google sign in error', errorCode, errorMessage);
  }
};