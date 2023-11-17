// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// FIRESTORE IMPRT KITA BEFORE CRUD
import{getFirestore} from "firebase/firestore";
import{getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiCchBrm-yCYDRZqMQhwDOybaAVGkDpMU",
  authDomain: "react-crudhome.firebaseapp.com",
  projectId: "react-crudhome",
  storageBucket: "react-crudhome.appspot.com",
  messagingSenderId: "274863898984",
  appId: "1:274863898984:web:a32ab0bb0852ea852316dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//COPY KITA CONSOLE.FIREBASETU react-crudHome BANAYA C
export const db = getFirestore(app);

export const storage = getStorage(app);