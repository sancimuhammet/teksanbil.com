import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firestore'a bağlan
const db = getFirestore();

async function fetchStories() {
    try {
        const storiesCollection = collection(db, "stories");
        const q = query(storiesCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        const storiesContainer = document.getElementById('storiesContainer');
        storiesContainer.innerHTML = ''; // Eski hikayeleri temizle

        querySnapshot.forEach(doc => {
            const story = doc.data();
            const storyDiv = document.createElement('div');
            storyDiv.classList.add('story');

            const contentPreview = story.content.substring(0, 150);
            const fullContent = story.content.substring(150);

            storyDiv.innerHTML = `
    <div class="story-header">
        <h3>${story.title}</h3>
        <p><em>Yazar: ${story.author}</em> | <small>${new Date(story.date.seconds * 1000).toLocaleDateString()}</small></p>
            </div>

            <img src="${story.imageUrl}" alt="Hikaye Görseli" class="story-image" />

            <div class="story-content">
        <p>${contentPreview}...</p> <!-- İlk kısmı göster -->
            </div>

            <button class="read-more-btn" id="readMoreBtn-${doc.id}">Devamını Oku</button>
    
             <div class="full-story" id="fullStory-${doc.id}" style="display: none;">
            <p class="full-content">${fullContent}</p>
            <button id="readLessBtn-${doc.id}" style="background-color: #ff4f4f; color: white; padding: 8px 15px; border-radius: 5px; font-size: 0.8em; border: none; cursor: pointer;">Devamını Gizle</button>
            <div class="comment-section" id="comment-section-${doc.id}">
            <textarea id="commentContent-${doc.id}" placeholder="Yorumunuzu yazın..." required></textarea>
            <button id="addCommentBtn-${doc.id}">Yorum Ekle</button>
        </div>
        <div id="commentsContainer-${doc.id}"></div>
        </div>
    `;

            storiesContainer.appendChild(storyDiv);

            document.getElementById(`readMoreBtn-${doc.id}`).addEventListener('click', function() {
                const fullStoryDiv = document.getElementById(`fullStory-${doc.id}`);
                const readMoreBtn = document.getElementById(`readMoreBtn-${doc.id}`);
                const readLessBtn = document.getElementById(`readLessBtn-${doc.id}`);
            
                readMoreBtn.style.display = 'none';
                // "Devamını Gizle" butonunu gizle
                readLessBtn.style.display = 'block';
                // Hikayenin tamamını gizle
                fullStoryDiv.style.display = 'block';
            });
            
            // "Devamını Gizle" butonuna event listener ekle
            document.getElementById(`readLessBtn-${doc.id}`).addEventListener('click', function() {
                const fullStoryDiv = document.getElementById(`fullStory-${doc.id}`);
                const readMoreBtn = document.getElementById(`readMoreBtn-${doc.id}`);
                const readLessBtn = document.getElementById(`readLessBtn-${doc.id}`);
            
                // "Devamını Oku" butonunu göster
                readMoreBtn.style.display = 'inline-block';
                // "Devamını Gizle" butonunu gizle
                readLessBtn.style.display = 'none';
                // Hikayenin tamamını gizle
                fullStoryDiv.style.display = 'none';
            });
        });

    } catch (error) {
        console.error('Error fetching stories:', error);
        alert('Hikayeler yüklenemedi, lütfen tekrar deneyin.');
    }
}


// Yorumları yükleme
async function loadComments(storyId) {
    const commentsSnapshot = await getDocs(collection(db, "stories", storyId, "comments"));
    const commentsContainer = document.getElementById(`commentsContainer-${storyId}`);
    commentsContainer.innerHTML = "";  // Yorumları temizle

    commentsSnapshot.forEach(doc => {
        const commentData = doc.data();
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <strong>${commentData.author}</strong> (${new Date(commentData.date).toLocaleDateString()}):
            <p>${commentData.content}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Yorum ekleme
async function addComment(storyId) {
    const commentContent = document.getElementById(`commentContent-${storyId}`).value;
    const author = "Misafir"; // Örnek olarak kullanıcı adı
    const newComment = {
        content: commentContent,
        author: author,
        date: new Date().toISOString()
    };

    try {
        // Firestore'a ekleme
        await addDoc(collection(db, "stories", storyId, "comments"), newComment);
        
        loadComments(storyId);  // Yorumları tekrar yükle
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Yorum eklenemedi, lütfen tekrar deneyin.');
    }
}

/// Beğeni ekleme
async function toggleLike(storyId) {
    const userId = "User"; // Kullanıcı ID'si, bu değer dinamik olmalı. Şu an sabit.
    const likeRef = doc(db, "stories", storyId, "likes", userId); // Beğeni belgesini oluşturuyoruz.

    try {
        const docSnap = await getDoc(likeRef); // Beğeni durumu var mı kontrol et
        const likeButton = document.getElementById(`likeBtn-${storyId}`);

        if (docSnap.exists()) {
            // Eğer kullanıcı zaten beğendiyse, beğeniyi kaldır
            await deleteDoc(likeRef);
            likeButton.classList.remove('active'); // Beğeni kaldırıldığında aktif sınıfını çıkar
        } else {
            // Eğer kullanıcı beğenmediyse, beğeni ekle
            await setDoc(likeRef, { liked: true });
            likeButton.classList.add('active'); // Beğeni eklendiğinde aktif sınıfını ekle
        }

        // Beğeni sayısını güncelle
        loadLikes(storyId);
    } catch (error) {
        console.error('Error toggling like:', error); // Hata kontrolü
    }
}

// Beğeni sayısını yükleme
async function loadLikes(storyId) {
    const likesSnapshot = await getDocs(collection(db, "stories", storyId, "likes"));
    const likeCount = likesSnapshot.size; // Beğeni sayısını alıyoruz
    const likeButton = document.getElementById(`likeBtn-${storyId}`);
    likeButton.innerText = `(${likeCount})`; // Beğeni sayısını butona yazıyoruz

    // Beğeni durumu güncelle
    const userId = "User"; // Kullanıcı ID'si, bu değer dinamik olmalı.
    const likeRef = doc(db, "stories", storyId, "likes", userId); // Kullanıcının beğeni durumu

    try {
        const docSnap = await getDoc(likeRef);
        if (docSnap.exists()) {
            likeButton.classList.add('active'); // Kullanıcı beğendiyse buton aktif olsun
        } else {
            likeButton.classList.remove('active'); // Kullanıcı beğenmediyse buton aktif olmasın
        }
    } catch (error) {
        console.error('Error loading like status:', error);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Firebase yapılandırma bilgileri
    const firebaseConfig = {
        apiKey: "AIzaSyB9thHStut4GHSsHkTkrK_Bd_t4N_sDWLI",
        authDomain: "teksanbilcom.firebaseapp.com",
        projectId: "teksanbilcom",
        storageBucket: "teksanbilcom.appspot.com",
        messagingSenderId: "1000866577875",
        appId: "1:1000866577875:web:49b2d0defb2646ee0fc326"
    };

 
   
    // Formu dinle
    
});


window.onload = fetchStories;  // Sayfa yüklendiğinde hikayeleri yükle
