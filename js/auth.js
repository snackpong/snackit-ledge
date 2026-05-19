function loginWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

const GOOGLE_OAUTH_CLIENT_ID = '265027158574-mjhk09b2gq7temo79kt03c3fqod945al.apps.googleusercontent.com';

function loginWithGoogleIdentity() {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services SDK가 아직 로드되지 않았습니다.'));
      return;
    }

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      scope: 'openid email profile',
      prompt: 'select_account',
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description || response.error));
          return;
        }

        const credential = firebase.auth.GoogleAuthProvider.credential(null, response.access_token);
        auth.signInWithCredential(credential).then(resolve).catch(reject);
      },
    });

    tokenClient.requestAccessToken();
  });
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
