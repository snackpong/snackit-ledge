import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGjuUYwz22g5HQWd7MOnKG5at2eD4Rp_Q",
  authDomain: "snackit-ledger.firebaseapp.com",
  projectId: "snackit-ledger",
  storageBucket: "snackit-ledger.firebasestorage.app",
  messagingSenderId: "265027158574",
  appId: "1:265027158574:web:83ec42fe926f26f08815bf"
};

export const ALLOWED_EMAIL = "snackpong25@gmail.com";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
