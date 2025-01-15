document.addEventListener('DOMContentLoaded', function() {
    // Giriş formu üzerine tıklama dinleyicisi ekliyoruz
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Formun sayfayı yenilemesini engelle

        // Kullanıcı adı ve şifreyi alıyoruz
        const username = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        // Sabit kullanıcı adı ve şifre
        const validUsername = "admin"; // Burayı değiştirebilirsiniz
        const validPassword = "1111"; // Burayı değiştirebilirsiniz

        // Kullanıcı adı ve şifreyi kontrol et
        if (username === validUsername && password === validPassword) {
            alert("Giriş başarılı!");
            window.location.href = 'add.html'; // Başarılı girişte yönlendirme
        } else {
            alert("Geçersiz kullanıcı adı veya şifre.");
        }
    });
});

/*document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Formun varsayılan davranışını engelliyoruz

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('', { // Backend API adresine istek gönderiyoruz
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }) // Kullanıcı adı ve şifreyi JSON formatında gönderiyoruz
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Başarılı giriş
            window.location.href = 'add.html'; // Başarılı girişte yönlendirme
        } else {
            alert(data.message); // Hata mesajı
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
});
*/
