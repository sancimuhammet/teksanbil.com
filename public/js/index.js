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
