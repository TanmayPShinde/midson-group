import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMlwHhw5NiCY_lrSyqkxdKU125CWfNmAc",
  authDomain: "midson-group.firebaseapp.com",
  projectId: "midson-group",
  storageBucket: "midson-group.appspot.com",
  messagingSenderId: "421619005857",
  appId: "1:421619005857:web:a7bdfadecf37e47e0533e0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
