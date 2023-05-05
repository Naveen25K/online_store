import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsl1g3i6gWnqU5yAFuofhwtLmtKexa0Qc",
  authDomain: "arched-wharf-202008.firebaseapp.com",
  projectId: "arched-wharf-202008",
  storageBucket: "arched-wharf-202008.appspot.com",
  messagingSenderId: "361198983332",
  appId: "1:361198983332:web:d3b148a603fbbc7759ee31",
  measurementId: "G-5JZSBZSMMV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
