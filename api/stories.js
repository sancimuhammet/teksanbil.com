const express = require('express');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

const app = express();
app.use(express.json()); // JSON verileri parse etmek için

// Firestore bağlantısı
const db = getFirestore();
const storiesRouter = require('./api/stories');
app.use(storiesRouter);


// Yeni hikaye ekle
app.post('/api/stories', async (req, res) => {
    const { title, content, author } = req.body;

    // Yeni hikaye verisi
    const newStory = {
        title,
        content,
        author,
        date: new Date().toLocaleDateString(),
    };

    try {
        // Firestore'a ekle
        const docRef = await db.collection('stories').add(newStory);
        res.status(201).json({ id: docRef.id, ...newStory }); // Başarıyla eklenen hikayeyi ve ID'yi döndürüyoruz
    } catch (error) {
        console.error('Hikaye eklenirken hata:', error);
        res.status(500).json({ message: 'Hikaye eklenirken bir hata oluştu.' });
    }
});

// Tüm hikayeleri getir
app.get('/api/stories', async (req, res) => {
    try {
        // Firestore'dan hikayeleri al
        const storiesSnapshot = await db.collection('stories').get();
        const stories = storiesSnapshot.docs.map(doc => ({
            id: doc.id, // Firestore belgesi ID'si
            ...doc.data(),
        }));

        res.json(stories); // Tüm hikayeleri döndürüyoruz
    } catch (error) {
        console.error('Hikayeler alınırken hata:', error);
        res.status(500).json({ message: 'Hikayeler alınırken bir hata oluştu.' });
    }
});

module.exports = app;
