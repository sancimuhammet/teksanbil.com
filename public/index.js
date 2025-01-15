// Veritabanındaki hikayeleri Firebase'ten al
async function fetchStories() {
  try {
    const db = getDatabase(app); // Firebase veritabanını al
    const storiesRef = ref(db, 'stories'); // 'stories' veritabanı referansını al
    const snapshot = await get(storiesRef); // Veritabanından veriyi al

    if (snapshot.exists()) {
      const stories = snapshot.val();
      const storiesContainer = document.getElementById('storiesContainer');
      storiesContainer.innerHTML = '';

      // Her bir hikayeyi listele
      for (const key in stories) {
        const story = stories[key];
        const storyDiv = document.createElement('div');
        storyDiv.classList.add('story');
        storyDiv.innerHTML = `
          <h3>${story.title}</h3>
          <p>${story.content}</p>
          <p><em>Yazar: ${story.author}</em></p>
          <p><small>${story.date}</small></p>
        `;
        storiesContainer.appendChild(storyDiv);
      }
    } else {
      console.log('Hikayeler bulunamadı.');
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}
// Yeni hikaye eklemek için Firebase'e veri gönderme
async function addStory(title, content, author) {
  try {
    const db = getDatabase(app);
    const newStoryRef = push(ref(db, 'stories')); // Yeni bir referans oluştur

    await set(newStoryRef, {
      title: title,
      content: content,
      author: author,
      date: new Date().toISOString() // Tarih bilgisini ekleyebilirsiniz
    });

    console.log('Hikaye başarıyla eklendi!');
  } catch (error) {
    console.error('Hikaye eklenirken hata oluştu:', error);
  }
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4RJiQX3qJF7ba9YrwKzVN5zjA4qvz6n8",
  authDomain: "teksanbil612.firebaseapp.com",
  projectId: "teksanbil612",
  storageBucket: "teksanbil612.firebasestorage.app",
  messagingSenderId: "99541489386",
  appId: "1:99541489386:web:c7965bdd4e0e8759d3e993",
  measurementId: "G-B4ERB1M6GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', fetchStories);
// Formu dinleyin ve hikaye ekleyin
document.getElementById('addStoryForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('storyTitle').value;
  const content = document.getElementById('storyContent').value;
  const author = document.getElementById('storyAuthor').value;

  // Hikayeyi Firebase'e ekle
  addStory(title, content, author);

  // Formu sıfırla
  event.target.reset();
});

// Menü simgesine tıklanınca menüyü aç
document.getElementById('menuIcon').addEventListener('click', function () {
    document.getElementById('sideMenu').style.right = '0'; // Menü ekranın içine gelir
    document.getElementById('menuOverlay').style.display = 'block'; // Overlay görünür
    document.getElementById('menuOverlay').style.opacity = '1'; // Overlay yavaşça belirir
});

// Menü kapatma simgesine tıklanınca menüyü kapat
document.getElementById('closeMenu').addEventListener('click', closeMenu);

// Overlay tıklamasıyla menüyü kapatma
document.getElementById('menuOverlay').addEventListener('click', closeMenu);

// Menü kapatma işlevi
function closeMenu() {
    document.getElementById('sideMenu').style.right = '-300px'; // Menü ekranın dışına gider
    document.getElementById('menuOverlay').style.opacity = '0'; // Overlay yavaşça kaybolur
    setTimeout(() => {
        document.getElementById('menuOverlay').style.display = 'none'; // Overlay tamamen gizlenir
    }, 400); // CSS geçiş süresiyle uyumlu
}
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".story-container");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.1 } // %10'u görünür olunca animasyonu başlatır
    );
  
    containers.forEach((container) => observer.observe(container));
  });
  