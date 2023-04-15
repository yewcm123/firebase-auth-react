import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVckABSrO_DzsSVaNStQnXxMVK4Uw5BQc",
  authDomain: "fir-auth-de1d7.firebaseapp.com",
  projectId: "fir-auth-de1d7",
};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);

export const auth = getAuth()
export default firebaseApp 