function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return auth.signInWithPopup(provider);
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
    if (ALLOWED_EMAILS.includes(user.email)) {
      onAllowed(user);
    } else {
      auth.signOut();
      onBlocked(user.email);
    }
  });
}
