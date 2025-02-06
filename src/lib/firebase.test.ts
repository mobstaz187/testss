import { auth, db } from './firebase';
import { signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Test authentication
async function testAuth() {
  try {
    // Sign in with GitHub
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('Successfully signed in:', result.user.uid);

    // Create user document
    const userRef = doc(db, 'users', result.user.uid);
    await setDoc(userRef, {
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      unlockedCharacters: []
    });

    // Verify user document
    const userDoc = await getDoc(userRef);
    console.log('User document created:', userDoc.exists());

    // Sign out
    await signOut(auth);
    console.log('Successfully signed out');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testAuth();