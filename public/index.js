import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firestore'a bağlan
const db = getFirestore();

async function fetchStories() {
    try {
        // Firestore'daki 'stories' koleksiyonuna erişim sağla
        const storiesCollection = collection(db, "stories");
        
        // Koleksiyondaki belgeleri al
        const querySnapshot = await getDocs(storiesCollection);

        // Hikayeleri gösterecek container'ı al
        const storiesContainer = document.getElementById('storiesContainer');
        storiesContainer.innerHTML = ''; // Hikayeleri gösteren container'ı temizle

        // Her belgeyi işleyip ekle
        querySnapshot.forEach(doc => {
            const story = doc.data();
            const storyDiv = document.createElement('div');
            storyDiv.classList.add('story'); // CSS ile stil verebilirsiniz
            storyDiv.innerHTML = `
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <p><em>Yazar: ${story.author}</em></p>
                <p><small>${new Date(story.date).toLocaleDateString()}</small></p>
            `;
            storiesContainer.appendChild(storyDiv); // Story'i container'a ekle
        });
    } catch (error) {
        console.error('Error fetching stories:', error);
        alert('Hikayeler yüklenemedi, lütfen tekrar deneyin.');
    }
}

// Sayfa yüklendiğinde hikayeleri getir
window.onload = fetchStories;