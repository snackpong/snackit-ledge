const loginScreen = document.getElementById('login-screen');
const blockedScreen = document.getElementById('blocked-screen');
const appScreen = document.getElementById('app-screen');
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

function show(screen) {
  loginScreen.hidden = screen !== loginScreen;
  blockedScreen.hidden = screen !== blockedScreen;
  appScreen.hidden = screen !== appScreen;
}

loginBtn.addEventListener('click', () => {
  const email = loginEmailEl.value.trim();
  const password = loginPasswordEl.value;
  loginError.textContent = '';

  if (!email || !password) {
    loginError.textContent = '이메일과 비밀번호를 입력해주세요.';
    return;
  }

  loginBtn.disabled = true;
  loginWithEmail(email, password).catch(e => {
    const msg = {
      'auth/invalid-credential': '이메일 또는 비밀번호가 틀렸습니다.',
      'auth/user-not-found': '이메일 또는 비밀번호가 틀렸습니다.',
      'auth/wrong-password': '이메일 또는 비밀번호가 틀렸습니다.',
      'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
      'auth/too-many-requests': '시도 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    };
    loginError.textContent = msg[e.code] || ('로그인 실패: ' + e.message);
  }).finally(() => {
    loginBtn.disabled = false;
  });
});

loginPasswordEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') loginBtn.click();
});

logoutBtn.addEventListener('click', () => logout());
blockedRetry.addEventListener('click', () => show(loginScreen));

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
    show(loginScreen);
  }
);
