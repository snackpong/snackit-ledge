const firebaseConfig = {
  apiKey: "AIzaSyALLN63KMonZT89bImJWKbzuF0sV48aQVA",
  authDomain: "snackit-ledge.firebaseapp.com",
  projectId: "snackit-ledge",
  storageBucket: "snackit-ledge.firebasestorage.app",
  messagingSenderId: "36304628619",
  appId: "1:36304628619:web:1cb2601e1709801ef51d8e"
};

const ALLOWED_EMAILS = ["snackpong@naver.com", "snackpong25@gmail.com"];

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
