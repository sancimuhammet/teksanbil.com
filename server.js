const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// Firebase Admin SDK'yı başlatmak için servis hesabı anahtarını yükle
const serviceAccount = require('./teksanbilcom-firebase-adminsdk-fbsvc-804d479fa3.json'); // Servis hesabı dosyanızın doğru yolu

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore(); // Firestore bağlantısı

const app = express();
app.use(cors());
app.use(express.json());

// API endpoints

// Tüm hikayeleri getir
app.get('/api/stories', async (req, res) => {
  try {
    const snapshot = await db.collection('stories').get();
    const stories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni hikaye ekle
app.post('/api/stories', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newStory = { title, content, author, date: new Date().toLocaleDateString() };
    const docRef = await db.collection('stories').add(newStory);
    res.status(201).json({ id: docRef.id, ...newStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const adminPassword = process.env.ADMIN_PASSWORD || "12345";

// Admin login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "mami" && password === adminPassword) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

// Admin panel: Hikaye eklemek için yetki kontrolü
app.post("/addStory", async (req, res) => {
  const { username, password, title, content, author } = req.body;

  if (username === "mami" && password === adminPassword) {
    try {
      const newStory = { title, content, author, date: new Date().toLocaleDateString() };
      const docRef = await db.collection('stories').add(newStory);
      res.status(201).json({ id: docRef.id, ...newStory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Sunucu başlat
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
