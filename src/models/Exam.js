import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Örn: "Telc B1 Almanca Sınavı"
  
  level: { 
    type: String, 
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TestDaF', 'TestAs'], 
    required: true 
  },
  
  city: { 
    type: String, 
    required: true 
  }, // Örn: "İstanbul", "Ankara"
  
  locationDetails: { 
    type: String, 
    required: true 
  }, // Örn: "Berliner Akademi, Kadıköy Şubesi, Kat 3"
  
  date: { 
    type: Date, 
    required: true 
  }, // Sınav tarihi ve saati
  
  price: { 
    type: Number, 
    required: true 
  }, // Sınav ücreti (Örn: 150)
  
  quota: { 
    type: Number, 
    required: true 
  }, // Toplam kontenjan (Örn: 20 kişi)
  
  soldCount: { 
    type: Number, 
    default: 0 
  }, // Kaç bilet satıldı?
  
  isActive: { 
    type: Boolean, 
    default: true 
  }, // Sınav aktif mi iptal mi?

  // --- YENİ EKLENEN ALAN ---
  addedBy: { 
    type: String, 
    default: 'Merkez' 
  } // Sınavı hangi şube/partner ekledi? (Örn: "İzmir Şubesi")
  // -------------------------
  
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);