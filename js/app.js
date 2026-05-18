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

let routerStarted = false;

function show(screen) {
  loginScreen.hidden = screen !== loginScreen;
  blockedScreen.hidden = screen !== blockedScreen;
  appScreen.hidden = screen !== appScreen;
}

loginBtn.addEventListener('click', () => {
  loginError.textContent = '';
  loginWithGoogle().catch(e => {
    loginError.textContent = '로그인 실패: ' + (e.message || '알 수 없는 오류');
  });
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
