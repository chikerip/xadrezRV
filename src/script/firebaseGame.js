import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  onSnapshot} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { camera } from "./game.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmioGaNyRVog5aiibzKe4v3PjOjGG_yV4",
  authDomain: "xadrez-c2473.firebaseapp.com",
  projectId: "xadrez-c2473",
  storageBucket: "xadrez-c2473.appspot.com",
  messagingSenderId: "811552284879",
  appId: "1:811552284879:web:13d25506dac7f31b24d7ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get('id');

onSnapshot(doc(db, "xadrez", id), (doc) => {
    camera(doc.data());
});