function loginWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}

function logout() {
  return auth.signOut();
}

function watchAuth(onAllowed, onBlocked, onLoggedOut) {
  auth.onAuthStateChanged(user => {
    alert('onAuthStateChanged: ' + (user ? user.email : 'null'));
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
