// Firebase'i başlatmak için gerekli olan Firebase SDK'yı içe aktarın
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase yapılandırma bilgilerini buraya yapıştırın (Firebase Console'dan alabilirsiniz)
const firebaseConfig = {
  apiKey: "AIzaSyA4RJiQX3qJF7ba9YrwKzVN5zjA4qvz6n8",
  authDomain: "teksanbil612.firebaseapp.com",
  projectId: "teksanbil612",
  storageBucket: "teksanbil612.firebasestorage.app",
  messagingSenderId: "99541489386",
  appId: "1:99541489386:web:c7965bdd4e0e8759d3e993",
  measurementId: "G-B4ERB1M6GK"
};

// Firebase'i başlatın
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Veritabanına veri eklemek için örnek fonksiyon
function addStory() {
  set(ref(db, 'stories/storyId1'), {
    title: "Hikaye Başlığı",
    content: "Hikaye içeriği",
    author: "Yazar Adı",
    date: "2025-01-16"
  });

  set(ref(db, 'stories/storyId2'), {
    title: "Başka Bir Hikaye",
    content: "Başka bir hikaye içeriği",
    author: "Başka Yazar",
    date: "2025-01-17"
  });
}

// Veriyi eklemek için fonksiyonu çağırabilirsiniz
addStory();
