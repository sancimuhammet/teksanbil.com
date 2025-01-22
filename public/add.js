import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const db = getFirestore(); // Firestore'a bağlan
const addStoryForm = document.getElementById('addStoryForm');

addStoryForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const imageUrl = document.getElementById('imageUrl')
    const newStory = { 
        title: title, 
        content: content, 
        author: author, 
        imageUrl: imageUrl,
        date: new Date().toISOString() 
    };

    try {
        // Firestore'a ekleme
        await addDoc(collection(db, "stories"), newStory);
        alert('Hikaye başarıyla eklendi!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error adding document:', error);
        alert('Hikaye eklenemedi, lütfen tekrar deneyin.');
    }
    
});


