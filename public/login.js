document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            window.location.href = 'add.html';
        } else {
            alert("Hatalı şifre veya kullanıcı adı");
        }
    } catch (error) {
        console.error("Login error:", error);
    }
    console.log(username, password);

});
