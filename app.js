import { 
    redirectIfLoggedIn, 
    signInUser, 
    signupUser,
} from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');
const name = document.getElementById('sign-up-name');
const want = document.getElementById('sign-up-want');
const have = document.getElementById('sign-up-have');

console.log(name);
console.log(signUpEmail);
// if user currently logged in, redirect
redirectIfLoggedIn();

signUpForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value, name.value, want.value, have.value);

    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
  
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});