// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc,
  getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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

export async function getDocsGame() {
  const docRef = collection(db, 'xadrez')
  const querySnapshot = await getDocs(docRef);

  return querySnapshot.docs
}

export async function newDocGame(gameData) {
  try {
    const docRef = await addDoc(collection(db, "xadrez"), {
      gameData: gameData,
      players: 1,
      turn: true,
    });
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    // console.error("Error adding document: ", e);
  }
}

export async function getDocGame (id){
  const docRef = doc(db, "xadrez", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
  }
}

export async function setDocGame(idGame, data, turn){
  const docRef = collection(db, "xadrez");

  await setDoc(doc(docRef, `${idGame}`), {
    gameData: data,
    players: 2,
    turn: turn
  });
}

export async function joinnGame(idJoin, data, turn){
  const docRef = collection(db, "xadrez");

  await setDoc(doc(docRef, `${idJoin}`), {
    gameData: data,
    players: 2,
    turn: turn
  });
}
