const loginScreen = document.getElementById('login-screen');
const blockedScreen = document.getElementById('blocked-screen');
const appScreen = document.getElementById('app-screen');
const googleLoginBtn = document.getElementById('google-login-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const blockedEmail = document.getElementById('blocked-email');
const blockedRetry = document.getElementById('blocked-retry');
const userEmail = document.getElementById('user-email');
const mountEl = document.getElementById('page-mount');
const navEl = document.getElementById('nav');
const loginError = document.getElementById('login-error');
const loginEmailEl = document.getElementById('login-email');
const loginPasswordEl = document.getElementById('login-password');

let routerStarted = false;
let redirectChecked = false;

function show(screen) {
  loginScreen.hidden = screen !== loginScreen;
  blockedScreen.hidden = screen !== blockedScreen;
  appScreen.hidden = screen !== appScreen;
}

function getAuthErrorMessage(e) {
  const msg = {
    'auth/account-exists-with-different-credential': '이미 다른 로그인 방식으로 가입된 이메일입니다.',
    'auth/cancelled-popup-request': '이전 로그인 팝업 요청이 취소되었습니다. 다시 시도해주세요.',
    'auth/invalid-credential': '이메일 또는 비밀번호가 틀렸습니다.',
    'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
    'auth/operation-not-allowed': 'Firebase Console에서 Google 로그인이 꺼져 있습니다.',
    'auth/popup-blocked': '브라우저가 팝업을 차단했습니다. redirect 방식으로 다시 시도합니다.',
    'auth/popup-closed-by-user': '로그인 팝업이 완료 전에 닫혔습니다. 다시 시도해주세요.',
    'auth/too-many-requests': '시도 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    'auth/unauthorized-domain': 'Firebase Authorized domains에 현재 도메인이 없습니다.',
    'auth/user-not-found': '이메일 또는 비밀번호가 틀렸습니다.',
    'auth/wrong-password': '이메일 또는 비밀번호가 틀렸습니다.',
  };
  return msg[e.code] || ('로그인 실패: ' + e.message);
}

function reportLoginError(e) {
  console.error('Firebase login failed', {
    code: e.code,
    message: e.message,
    authDomain: firebase.app().options.authDomain,
    origin: window.location.origin,
    error: e,
  });
  loginError.textContent = getAuthErrorMessage(e);
}

function setLoginBusy(isBusy) {
  googleLoginBtn.disabled = isBusy;
  loginBtn.disabled = isBusy;
}

googleLoginBtn.addEventListener('click', () => {
  loginError.textContent = '';
  setLoginBusy(true);

  loginWithGooglePopup().catch(e => {
    if (e.code === 'auth/popup-blocked') {
      loginError.textContent = getAuthErrorMessage(e);
      return loginWithGoogleRedirect();
    }
    reportLoginError(e);
    return null;
  }).finally(() => {
    setLoginBusy(false);
  });
});

loginBtn.addEventListener('click', () => {
  const email = loginEmailEl.value.trim();
  const password = loginPasswordEl.value;
  loginError.textContent = '';

  if (!email || !password) {
    loginError.textContent = '이메일과 비밀번호를 입력해주세요.';
    return;
  }

  setLoginBusy(true);
  loginWithEmail(email, password).catch(e => {
    reportLoginError(e);
  }).finally(() => {
    setLoginBusy(false);
  });
});

loginPasswordEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') loginBtn.click();
});

logoutBtn.addEventListener('click', () => logout());
blockedRetry.addEventListener('click', () => show(loginScreen));

getGoogleRedirectResult().catch(e => {
  reportLoginError(e);
}).finally(() => {
  redirectChecked = true;
  if (!auth.currentUser && loginScreen.hidden && appScreen.hidden && blockedScreen.hidden) {
    show(loginScreen);
  }
});

watchAuth(
  (user) => {
    userEmail.textContent = user.email;
    show(appScreen);
    if (!routerStarted) {
      startRouter(mountEl, navEl);
      routerStarted = true;
    }
  },
  (email) => {
    blockedEmail.textContent = email;
    show(blockedScreen);
  },
  () => {
    if (redirectChecked) show(loginScreen);
  }
);
