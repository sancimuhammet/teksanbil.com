const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

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
