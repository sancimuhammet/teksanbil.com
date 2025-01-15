async function fetchStories() {
  try {
      const response = await fetch('/api/stories');
      const stories = await response.json();

      const storiesContainer = document.getElementById('storiesContainer');
      storiesContainer.innerHTML = '';

      stories.forEach(story => {
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


document.addEventListener('DOMContentLoaded', fetchStories);

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
  