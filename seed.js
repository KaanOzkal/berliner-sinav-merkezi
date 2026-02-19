import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from './src/models/Exam.js'; // Dosya yolunun projene uygun olduğundan emin ol

dotenv.config();

// Seviyelere Göre Euro Bazlı Sabit Fiyat Listesi
const prices = {
  'A1': 160, 'A2': 170, 'B1': 200, 'B2': 230, 'C1': 260, 'C2': 300, 'TestDaF': 250
};

// Başlıktan seviyeyi ve fiyatı otomatik çıkaran yardımcı fonksiyon
const getLevelAndPrice = (title) => {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TestDaF'];
  for (let lvl of levels) {
    if (title.includes(lvl)) return { level: lvl, price: prices[lvl] || 200 };
  }
  return { level: 'B1', price: 200 }; // Varsayılan
};

// Sınav objesi oluşturan akıllı fonksiyon
const createExam = (dateStr, title, city, locationDetails, statusStr) => {
  const { level, price } = getLevelAndPrice(title);
  
  let quota = 30; // Varsayılan Sınıf Kotası
  let soldCount = 0; 
  
  // Eğer metinde "Son 3 Aday" gibi bir şey yazıyorsa satılan bilet sayısını hesapla
  if (statusStr && statusStr.includes("Son")) {
    const left = parseInt(statusStr.replace(/\D/g, '')) || 1;
    soldCount = quota - left; 
  }

  return {
    title,
    level,
    city,
    locationDetails,
    date: new Date(dateStr + "T09:00:00Z"), // Sınav saati sabah 09:00 kabul edildi
    price,
    quota,
    soldCount,
    addedBy: "Merkez Onaylı"
  };
};

// VERİ LİSTESİ (Birebir ilettiğin tarihler)
const exams = [
  // --- TELC LİSTESİ (Şehir belirtilmediği için İstanbul / Şişli atandı) ---
  createExam("2026-01-20", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-20", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-21", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Son 1 Aday"),
  createExam("2026-01-22", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-22", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-23", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Son 1 Aday"),
  createExam("2026-01-23", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-27", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-27", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-28", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-28", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-29", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-01-29", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-02-03", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-04", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-04", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-05", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-05", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-06", "telc Deutsch C2", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-06", "telc Deutsch C1", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-06", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-06", "telc Deutsch B1-B2 Pflege", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-02-10", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-10", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-11", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-12", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-12", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-13", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-02-17", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-18", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-18", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-19", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-19", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-02-25", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-25", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-26", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-02-27", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),

  createExam("2026-03-03", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-03", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-04", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-04", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-05", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-05", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-06", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-03-10", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-10", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-11", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-11", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-12", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-12", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-13", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-03-25", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-25", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-26", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-26", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-27", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-03-28", "telc Deutsch B2-C1 Medizin", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),

  createExam("2026-04-01", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-01", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-02", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-02", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-07", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-07", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-08", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-08", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-09", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Son 3 Aday"),
  createExam("2026-04-09", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-10", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-04-14", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-14", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-15", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-15", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-16", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-16", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-17", "telc Deutsch C1 Hochschule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-04-21", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-21", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-22", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-22", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-04-29", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-29", "telc Deutsch A2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-30", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-04-30", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-05-06", "telc Deutsch B1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-05-06", "telc Deutsch A1 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-05-07", "telc Deutsch B2 Dijital", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  
  createExam("2026-06-19", "telc Deutsch C1", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-06-22", "telc Deutsch A1 Junior", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),
  createExam("2026-06-22", "telc Deutsch A2 Schule", "İstanbul", "Şişli Sınav Merkezi", "Kayıt Açık"),

  // --- ÖSD İSTANBUL (KADIKÖY) ---
  createExam("2026-01-21", "ÖSD Zertifikat A1", "İstanbul", "Kadıköy ÖSD Sınav Kampüsü", "Kayıt Açık"),
  createExam("2026-02-04", "ÖSD Zertifikat A1", "İstanbul", "Kadıköy ÖSD Sınav Kampüsü", "Kayıt Açık"),
  createExam("2026-02-18", "ÖSD Zertifikat A1", "İstanbul", "Kadıköy ÖSD Sınav Kampüsü", "Kayıt Açık"),
  createExam("2026-03-04", "ÖSD Zertifikat A1", "İstanbul", "Kadıköy ÖSD Sınav Kampüsü", "Kayıt Açık"),

  // --- ÖSD İSTANBUL (BEŞİKTAŞ) ---
  createExam("2026-01-22", "ÖSD Zertifikat A2", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-22", "ÖSD Zertifikat B1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-23", "ÖSD Zertifikat A1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-05", "ÖSD Zertifikat A2", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-05", "ÖSD Zertifikat B1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-06", "ÖSD Zertifikat A1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-19", "ÖSD Zertifikat A2", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-19", "ÖSD Zertifikat B1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-20", "ÖSD Zertifikat A1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-03-05", "ÖSD Zertifikat A2", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-03-05", "ÖSD Zertifikat B1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-03-06", "ÖSD Zertifikat A1", "İstanbul", "Beşiktaş ÖSD Merkezi", "Kayıt Açık"),

  // --- ÖSD ANKARA ---
  createExam("2026-02-02", "ÖSD Zertifikat A1", "Ankara", "Çankaya ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-02", "ÖSD Zertifikat A2", "Ankara", "Çankaya ÖSD Merkezi", "Kayıt Açık"),

  // --- ÖSD İZMİR ---
  createExam("2026-01-15", "ÖSD Zertifikat A2", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-15", "ÖSD Zertifikat B1", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-15", "ÖSD Zertifikat B2", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-16", "ÖSD Zertifikat A1", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-12", "ÖSD Zertifikat A2", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-12", "ÖSD Zertifikat B1", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-12", "ÖSD Zertifikat B2", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-13", "ÖSD Zertifikat A1", "İzmir", "Alsancak ÖSD Merkezi", "Kayıt Açık"),

  // --- ÖSD BURSA ---
  createExam("2026-01-29", "ÖSD Zertifikat A2", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-29", "ÖSD Zertifikat B1", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-29", "ÖSD Zertifikat B2", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-01-30", "ÖSD Zertifikat A1", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-26", "ÖSD Zertifikat A2", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-26", "ÖSD Zertifikat B1", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-26", "ÖSD Zertifikat B2", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık"),
  createExam("2026-02-27", "ÖSD Zertifikat A1", "Bursa", "Nilüfer ÖSD Merkezi", "Kayıt Açık")
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Bağlandı...");

    await Exam.deleteMany(); // Eskileri sil ki liste şişmesin
    console.log("Eski veriler temizlendi.");

    await Exam.insertMany(exams); // Yenileri ekle
    console.log(`✅ Toplam ${exams.length} adet 2026 Sınav Takvimi Başarıyla Yüklendi!`);

    process.exit();
  } catch (error) {
    console.error("Hata Oluştu:", error);
    process.exit(1);
  }
};

importData();