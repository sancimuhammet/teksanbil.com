const addStoryForm = document.getElementById('addStoryForm');

addStoryForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    const newStory = { title, content, author };

    try {
        const response = await fetch('/api/stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStory)
        });

        if (response.ok) {
            alert('Hikaye başarıyla eklendi!');
            window.location.href = 'index.html';
        } else {
            alert('Hikaye eklenirken bir sorun oluştu!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hikaye eklenemedi, lütfen tekrar deneyin.');
    }
});


/*  add.html sayfasındaki formu seçiyoruz
const addStoryForm = document.getElementById('addStoryForm');

addStoryForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Formun sayfayı yenilemesini engelliyoruz

    // Formdaki verileri alıyoruz
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    // Hikayeyi oluşturuyoruz
    const newStory = {
        title: title,
        content: content,
        author: author,
        date: new Date().toLocaleDateString() // Bugünün tarihi
    };

    // Hikayeyi localStorage'a kaydediyoruz
    let stories = JSON.parse(localStorage.getItem('stories')) || []; // Önceki hikayeleri alıyoruz
    stories.push(newStory); // Yeni hikayeyi ekliyoruz
    localStorage.setItem('stories', JSON.stringify(stories)); // Güncel listeyi kaydediyoruz

    // Başarıyla kaydedildikten sonra index.html sayfasına yönlendiriyoruz
    
*/
