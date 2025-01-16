// index.js
import { getFirestore, collection, getDocs } from "firebase/firestore";
// firebase-config.js'i import et
import app from "./firebase-config.js";

const db = getFirestore(app); // app değişkenini kullanarak Firestore'u başlat

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
