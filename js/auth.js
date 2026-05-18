function loginWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
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
