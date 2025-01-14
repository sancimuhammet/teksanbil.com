document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Formun otomatik olarak gönderilmesini engeller
    
    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        window.location.href = 'add.html';  // Başarılı giriş
    } else {
        alert('Hatalı şifre veya kullanıcı adı');
    }
});
