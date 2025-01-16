import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

const addStoryForm = document.getElementById('addStoryForm');

addStoryForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    const newStory = { title, content, author, date: new Date().toISOString() };

    try {
        await addDoc(collection(db, "stories"), newStory);
        alert('Hikaye başarıyla eklendi!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Hikaye eklenemedi, lütfen tekrar deneyin.');
    }
});
