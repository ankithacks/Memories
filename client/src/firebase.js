import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ea6de.firebaseapp.com",
  projectId: "mern-estate-ea6de",
  storageBucket: "mern-estate-ea6de.appspot.com",
  messagingSenderId: "186903619136",
  appId: "1:186903619136:web:0907f71c99e488cd9561a5"
};

export const app = initializeApp(firebaseConfig);


// firebase Storage:-
// rules_version = '2';
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 && 
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }