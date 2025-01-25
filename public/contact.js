import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
const db = getFirestore();

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Formun varsayılan gönderimini engelle

    // Form verilerini al
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Firebase'e veri gönderme
    try {
        const contactFormRef = collection(db, "contactMessages"); // Koleksiyon referansı al
        await addDoc(contactFormRef, { // addDoc kullanarak yeni belge oluştur
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString() // Zaman damgası ekleyelim
        });

        alert("Mesajınız başarıyla gönderildi!");
        
        // Formu temizle
        document.getElementById("contactForm").reset();
    } catch (error) {
        console.error("Mesaj gönderilirken hata oluştu:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
});