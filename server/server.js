const express = require('express');
const app = express();

// Bir basit oturum doğrulama simülasyonu
const users = {
  admin: '12345' // Kullanıcı adı: Şifre
};

// Middleware: Korunan sayfa
function authMiddleware(req, res, next) {
  const { username, password } = req.query;
  if (users[username] === password) {
    next(); // Doğruysa erişime izin ver
  } else {
    res.status(403).send('Erişim yasaklandı!');
  }
}

// Korunan sayfa
app.get('/pages/add.html', authMiddleware, (req, res) => {
  res.sendFile(__dirname + '/pages/add.html'); // Doğruysa dosyayı gönder
});

// Genel bir dosya sunucu
app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log('Sunucu çalışıyor: http://127.0.0.1:3000');
});
