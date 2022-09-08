import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyDAoJbmIfPTd_aIGvSHSSpm6Kd92Jaw0wI",
    authDomain: "canvas-557ff.firebaseapp.com",
    projectId: "canvas-557ff",
    storageBucket: "canvas-557ff.appspot.com",
    messagingSenderId: "826258097160",
    appId: "1:826258097160:web:5143cec5167733f1cafdbd",
    measurementId: "G-PW2Y879CZF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();