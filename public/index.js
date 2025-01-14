// storiesContainer'ı seçiyoruz
const storiesContainer = document.getElementById('storiesContainer');

// localStorage'dan hikayeleri alıyoruz
const stories = JSON.parse(localStorage.getItem('stories')) || [];

// Her hikaye için bir element oluşturup sayfaya ekliyoruz
stories.forEach(story => {
    const storyElement = document.createElement('div');
    storyElement.classList.add('story-container');

    storyElement.innerHTML = `
        <h2 class="story-title">${story.title}</h2>
        <p class="story-meta">Tarih: ${story.date}</p>
        <p class="story-content">${story.content}</p>
        <p class="story-author">Yazar: ${story.author}</p>
    `;

    storiesContainer.appendChild(storyElement); // Hikayeyi sayfaya ekliyoruz
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
