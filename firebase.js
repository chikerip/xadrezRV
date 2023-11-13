// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
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

export async function newDoc (data){
  try {
    const docRef = await addDoc(collection(db, "xadrez"), {
      gameData: data
    });
    localStorage.setItem("id", docRef.id)
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDocument (){
  const docRef = doc(db, "xadrez", localStorage.getItem("id"));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function setDocument(data){
  const citiesRef = collection(db, "cities");

  await setDoc(doc(citiesRef, "SF"), {
    gameData: data });
}

export async function snapshot(){
  onSnapshot(doc(db, "xadrez", localStorage.getItem("id")), (doc) => {
    console.log("Current data: ", doc.data());

    let camera = document.getElementById('camera'), cursor = document.createElement('a-cursor');
    cursor.setAttribute("id", 'cursor')
    cursor.setAttribute("color", "red")
    camera.appendChild(cursor)
 });
}