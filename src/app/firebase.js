import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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

export const getAllCustomers = async () => {
  const snapshot = await getDocs(collection(db, "customers"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
