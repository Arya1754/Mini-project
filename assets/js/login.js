import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,updateProfile ,
    onAuthStateChanged
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB0pGEBA01P1KON0fE1wfKRjejnDj2OCuY",
    authDomain: "miniproject-8c47c.firebaseapp.com",
    projectId: "miniproject-8c47c",
    storageBucket: "miniproject-8c47c.appspot.com",
    messagingSenderId: "178975701060",
    appId: "1:178975701060:web:b4a5a45a02c0bdfc2c6411",
    measurementId: "G-7J80SKPLFV"
  };

initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//database
function saveUserRole(userId, role) {
    console.log(userId)
    addDoc(collection(db, 'users'), {
        uid: userId,
        role: role,
    })
    .then((docRef) => {
        console.log('User role saved with ID: ', docRef.id);
    })
    .catch((error) => {
        console.error('Error saving user role: ', error);
    });
}

// Signup Form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName= signupForm.fullName.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const confirmpassword = signupForm.confirmPassword.value;
        const userType = signupForm.userType.value;
        if (password !== confirmpassword) {
            alert("Passwords do not match");
            return; // Prevent form submission if passwords don't match
        }
        console.log(email)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                saveUserRole(user.uid, userType);
                updateProfile(user, { displayName: fullName })
                .then(() => {
                    console.log('User profile updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating user profile:', error.message);
                });
                console.log('User signed up:', user);
                signupForm.reset();
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.log(email)
                console.log(error)
                console.error('Error signing up:', error.message);
            });
    });
  }


// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        console.log(email)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                loginForm.reset();
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.log(email)
                console.log(error)
                console.error('Error logging in:', error.message);
            });
    });
    
  }



// // Auth State Change
// onAuthStateChanged(auth, (user) => {
//     console.log('User status changed:', user);
// });
