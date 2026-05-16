import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth, ALLOWED_EMAIL } from "./firebase-init.js";

const provider = new GoogleAuthProvider();

export function loginWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export function isAllowed(user) {
  return user && user.email === ALLOWED_EMAIL;
}

export function watchAuth(onAllowed, onBlocked, onLoggedOut) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      onLoggedOut();
      return;
    }
    if (isAllowed(user)) {
      onAllowed(user);
    } else {
      await signOut(auth);
      onBlocked(user.email);
    }
  });
}
