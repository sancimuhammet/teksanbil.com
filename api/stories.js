const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Geçici veri
let stories = []; 

// Tüm hikayeleri getir
app.get('/', (req, res) => {
    res.json(stories);
});

// Yeni hikaye ekle
app.post('/', (req, res) => {
    const { title, content, author } = req.body;
    const newStory = { title, content, author, date: new Date().toLocaleDateString() };
    stories.push(newStory);
    res.status(201).json(newStory);
});

module.exports = app;
