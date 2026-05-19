const firebaseConfig = {
  apiKey: "AIzaSyCGjuUYwz22g5HQWd7MOnKG5at2eD4Rp_Q",
  authDomain: "snackit-ledger.firebaseapp.com",
  projectId: "snackit-ledger",
  storageBucket: "snackit-ledger.firebasestorage.app",
  messagingSenderId: "265027158574",
  appId: "1:265027158574:web:83ec42fe926f26f08815bf"
};

const ALLOWED_EMAILS = ["snackpong@naver.com", "snackpong25@gmail.com"];

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

