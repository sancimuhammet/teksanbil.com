import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const db = getFirestore(); // Firestore'a bağlan
const addStoryForm = document.getElementById('addStoryForm');
const storyListContainer = document.getElementById('storyListContainer'); // Listeyi burada göstereceğiz

// Hikaye ekleme işlemi
addStoryForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const imageUrl = document.getElementById('imageUrl').value;

    const formattedContent = content.replace(/\n/g, '\\n'); // Satır başlarını koru
    const newStory = { 
    title: title, 
    content: formattedContent, 
    author: author, 
    date: serverTimestamp(), 
    imageUrl: imageUrl 
    };


    try {
        // Firestore'a hikaye ekleme
        await addDoc(collection(db, "stories"), newStory);
        alert('Hikaye başarıyla eklendi!');
        loadStories(); // Hikayeleri tekrar yükle
        addStoryForm.reset(); // Formu sıfırla
    } catch (error) {
        console.error('Hikaye eklenirken hata:', error);
        alert('Hikaye eklenemedi, lütfen tekrar deneyin.');
    }
});

// Hikayeleri Firestore'dan al ve listele
async function loadStories() {
    const storiesCollection = collection(db, "stories");
    const querySnapshot = await getDocs(storiesCollection);

    storyListContainer.innerHTML = ''; // Eski hikayeleri temizle

    querySnapshot.forEach(docSnapshot => {
        const story = docSnapshot.data();
        const storyTitle = story.title;
        const storyId = docSnapshot.id;
        
        // Liste elemanı oluştur
        const storyDiv = document.createElement('div');
        storyDiv.classList.add('story-item');
        
        storyDiv.innerHTML = `
            <h3>${storyTitle}</h3>
            <button class="delete-btn" id="deleteBtn-${storyId}">Sil</button>
        `;
        storyListContainer.appendChild(storyDiv);

        // Silme butonuna event listener ekle
        document.getElementById(`deleteBtn-${storyId}`).addEventListener('click', async () => {
            try {
                const confirmDelete = confirm("Emin misiniz? Bu hikaye silinecek!");
        
                if (confirmDelete) {
                    // Silme işlemi yalnızca onaylandıysa yapılacak
                    const storyRef = doc(db, "stories", storyId); // Firestore'dan silinecek hikaye referansı
                    await deleteDoc(storyRef); // Silme işlemi
                    alert('Hikaye başarıyla silindi!');
                    loadStories(); // Hikayeleri tekrar yükle
                } else {
                    // Silme işlemi iptal edildi
                    console.log("Silme işlemi iptal edildi.");
                }
            } catch (error) {
                console.error('Hikaye silinirken hata:', error);
                alert('Hikaye silinemedi, lütfen tekrar deneyin.');
            }
        });
        
    });
}

// Sayfa yüklendiğinde hikayeleri yükle
window.onload = loadStories;