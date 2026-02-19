import Exam from '../models/Exam.js';

// 1. Yeni Sınav Oluştur (Admin Paneli İçin)
export const createExam = async (req, res) => {
  try {
    // Frontend'den gelen veriyi al
    const newExam = new Exam(req.body);
    // Veritabanına kaydet
    const savedExam = await newExam.save();
    
    res.status(201).json({ message: "Sınav başarıyla oluşturuldu", data: savedExam });
  } catch (error) {
    res.status(500).json({ message: "Sınav oluşturulamadı", error: error.message });
  }
};

// SINAV SİL (Admin İçin)
export const deleteExam = async (req, res) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        
        if (!deletedExam) {
            return res.status(404).json({ message: "Silinecek sınav bulunamadı." });
        }

        res.status(200).json({ message: "Sınav başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: "Sınav silinirken sunucu hatası oluştu", error: error.message });
    }
};

// 2. Sınavları Listele (Adaylar İçin - Filtreleme Özellikli)
export const getExams = async (req, res) => {
  try {
    const { city, level } = req.query; // URL'den şehir ve seviye bilgisini al
    
    let filter = { isActive: true }; // Sadece aktif sınavları getir

    // Eğer kullanıcı şehir seçmişse filtreye ekle
    if (city) {
      filter.city = city;
    }
    // Eğer seviye seçmişse filtreye ekle
    if (level) {
      filter.level = level;
    }

    const exams = await Exam.find(filter).sort({ date: 1 }); // Tarihe göre en yakını önce getir
    
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Sınavlar getirilemedi", error });
  }
};