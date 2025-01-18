 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc , collection, addDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


 const firebaseConfig = {
    apiKey: "AIzaSyB9thHStut4GHSsHkTkrK_Bd_t4N_sDWLI",
    authDomain: "teksanbilcom.firebaseapp.com",
    projectId: "teksanbilcom",
    storageBucket: "teksanbilcom.firebasestorage.app",
    messagingSenderId: "1000866577875",
    appId: "1:1000866577875:web:49b2d0defb2646ee0fc326"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='add.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='add.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
 
addStoryForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    const newStory = { title, content, author, date: new Date().toISOString() };

    try {
        // Firestore koleksiyonuna yeni hikayeyi ekleme
        await addDoc(collection(db, "stories"), newStory);
        alert('Hikaye başarıyla eklendi!');
        window.location.href = 'index.html';  // Sayfayı yenileyerek eklenen hikayeyi görün
    } catch (error) {
        console.error('Error:', error);  // Hata mesajını konsola yazdır
        alert('Hikaye eklenemedi, lütfen tekrar deneyin.');
    }
});
 
 
 async function fetchStories() {
     try {
         const querySnapshot = await getDocs(collection(db, "stories"));
         const storiesContainer = document.getElementById('storiesContainer');
         storiesContainer.innerHTML = '';
 
         querySnapshot.forEach(doc => {
             const story = doc.data();
             const storyDiv = document.createElement('div');
             storyDiv.classList.add('story');
             storyDiv.innerHTML = `
                 <h3>${story.title}</h3>
                 <p>${story.content}</p>
                 <p><em>Yazar: ${story.author}</em></p>
                 <p><small>${story.date}</small></p>
             `;
             storiesContainer.appendChild(storyDiv);
         });
     } catch (error) {
         console.error('Error:', error);
     }
 }