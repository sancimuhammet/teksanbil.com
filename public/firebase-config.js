import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyB9thHStut4GHSsHkTkrK_Bd_t4N_sDWLI",
  authDomain: "teksanbilcom.firebaseapp.com",
  projectId: "teksanbilcom",
  storageBucket: "teksanbilcom.firebasestorage.app",
  messagingSenderId: "1000866577875",
  appId: "1:1000866577875:web:49b2d0defb2646ee0fc326"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
export default app;
