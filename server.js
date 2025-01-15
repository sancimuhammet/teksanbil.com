const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let stories = []; // Geçici depolama (Bunu veritabanına taşıyabilirsiniz)

// Tüm hikayeleri getir
app.get('/api/stories', (req, res) => {
    res.json(stories);
});

// Yeni hikaye ekle
app.post('/api/stories', (req, res) => {
    const { title, content, author } = req.body;
    const newStory = { title, content, author, date: new Date().toLocaleDateString() };
    stories.push(newStory);
    res.status(201).json(newStory);
});

module.exports = app;
const adminPassword = process.env.ADMIN_PASSWORD || "12345";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "mami" && password === adminPassword) {
        res.status(200).json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials!" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
