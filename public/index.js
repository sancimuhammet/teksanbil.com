import { getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firestore'a bağlan
const db = getFirestore();

async function fetchStories() {
    try {
        const storiesCollection = collection(db, "stories");
        const querySnapshot = await getDocs(storiesCollection);
        const storiesContainer = document.getElementById('storiesContainer');
        storiesContainer.innerHTML = ''; // Eski hikayeleri temizle

        querySnapshot.forEach(doc => {
            const story = doc.data();
            const storyDiv = document.createElement('div');
            storyDiv.classList.add('story');
            storyDiv.innerHTML = `
                <h3>${story.title}</h3>
                <p>${story.content.substring(0, 150)}...</p> <!-- İlk kısmı göster -->
                <p><em>Yazar: ${story.author}</em></p>
                <p><small>${new Date(story.date).toLocaleDateString()}</small></p>

                <!-- Fotoğraf -->
                <img src="${story.imageUrl}" alt="Hikaye Görseli" class="story-image" />

                <!-- Devamını Oku butonu -->
                <button class="read-more-btn" id="readMoreBtn-${doc.id}">Devamını Oku</button>

                <!-- Tam hikaye, yorumlar ve beğeni butonu başlangıçta gizli olacak -->
                <div class="full-story" id="fullStory-${doc.id}" style="display: none;">
                    <p class="full-content">${story.content}</p>
                    <div class="comment-section" id="comment-section-${doc.id}">
                        <textarea id="commentContent-${doc.id}" placeholder="Yorumunuzu yazın..." required></textarea>
                        <button id="addCommentBtn-${doc.id}">Yorum Ekle</button>
                    </div>
                    <button id="likeBtn-${doc.id}"><i class="fa fa-thumbs-up"></i> Beğen</button>
                    <div id="commentsContainer-${doc.id}"></div>
                </div>
            `;
            storiesContainer.appendChild(storyDiv);

            // "Devamını Oku" butonuna event listener ekle
            document.getElementById(`readMoreBtn-${doc.id}`).addEventListener('click', function() {
                const fullStoryDiv = document.getElementById(`fullStory-${doc.id}`);
                const readMoreBtn = document.getElementById(`readMoreBtn-${doc.id}`);

                if (fullStoryDiv.style.display === 'none') {
                    fullStoryDiv.style.display = 'block';
                    readMoreBtn.innerText = 'Devamını Gizle';
                } else {
                    fullStoryDiv.style.display = 'none';
                    readMoreBtn.innerText = 'Devamını Oku';
                }
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


window.onload = fetchStories;  // Sayfa yüklendiğinde hikayeleri yükle
