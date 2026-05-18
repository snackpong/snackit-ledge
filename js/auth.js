function loginWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function loginWithGooglePopup() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return auth.signInWithPopup(provider);
}

function loginWithGoogleRedirect() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return auth.signInWithRedirect(provider);
}

function getGoogleRedirectResult() {
  return auth.getRedirectResult();
}

function logout() {
  return auth.signOut();
}

function watchAuth(onAllowed, onBlocked, onLoggedOut) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      onLoggedOut();
      return;
    }
    if (user.email === ALLOWED_EMAIL) {
      onAllowed(user);
    } else {
      auth.signOut();
      onBlocked(user.email);
    }
  });
}
