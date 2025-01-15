// api/stories.js
const express = require('express');
const app = express();
app.use(express.json());  // JSON verileri parse etmek için

let stories = [];  // Hikayelerin saklanacağı bir array (veritabanı yerine)

app.post('/api/stories', (req, res) => {
    const { title, content, author } = req.body;
    const newStory = { title, content, author, date: new Date() };
    stories.push(newStory);
    res.status(201).json(newStory);  // Başarıyla eklenen hikayeyi döndürüyoruz
});

app.get('/api/stories', (req, res) => {
    res.json(stories);  // Tüm hikayeleri döndürüyoruz
});

module.exports = app;
