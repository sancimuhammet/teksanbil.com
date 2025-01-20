// Hikaye silme fonksiyonu
async function deleteStory(storyId) {
    const userId = "User"; // Giriş yapan kullanıcı ID'si. Dinamik olarak alınmalı.

    // Silinecek hikayeyi Firestore'dan buluyoruz
    const storyRef = doc(db, "stories", storyId); // Story collection'ından doğru hikaye seçiliyor.

    try {
        // Silme işlemi
        await deleteDoc(storyRef);
        alert("Hikaye başarıyla silindi!");

        // Silinen hikayeyi sayfadan kaldırma (isteğe bağlı)
        const storyElement = document.getElementById(`story-${storyId}`);
        if (storyElement) {
            storyElement.remove(); // Silinen hikayeyi DOM'dan kaldır
        }

    } catch (error) {
        console.error("Hikaye silinirken bir hata oluştu: ", error);
        alert("Hikaye silinirken bir hata oluştu.");
    }
}
// Giriş yaptıysa silme butonlarını göster
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Giriş yapmış kullanıcı için silme butonlarını göster
        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.style.display = 'block'; // Butonları görünür yap
        });
    } else {
        // Giriş yapmamış kullanıcılar için silme butonlarını gizle
        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.style.display = 'none'; // Butonları gizle
        });
    }
});
