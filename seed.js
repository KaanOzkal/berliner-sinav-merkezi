import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from './src/models/Exam.js';

dotenv.config();

// Fiyat Listesi (Tahmini)
const prices = {
  'A1': 160, 'A2': 170, 'B1': 200, 'B2': 230, 'C1': 260, 'C2': 300
};

const exams = [
  // ============================================================
  // 1. TELC DİJİTAL SINAVLARI (Genel Liste - Online Merkez)
  // ============================================================
  
  // OCAK 2026
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-20", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-20", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-21", price: prices.A2, quota: 1 }, // Son 1 Aday
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-22", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-22", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-23", price: prices.C1, quota: 1 }, // Son 1 Aday
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-23", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-27", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-27", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-28", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-28", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-29", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-01-29", price: prices.A1, quota: 30 },

  // ŞUBAT 2026
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-03", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-04", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-04", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-05", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-05", price: prices.A1, quota: 30 },
  { title: "telc Deutsch C2", level: "C2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-06", price: prices.C2, quota: 30 },
  { title: "telc Deutsch C1", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-06", price: prices.C1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-06", price: prices.C1, quota: 30 },
  { title: "telc B1∙B2 Pflege Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-06", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-10", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-10", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-11", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-12", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-12", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-13", price: prices.C1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-17", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-18", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-18", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-19", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-19", price: prices.A1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-25", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-25", price: prices.A2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-26", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-02-27", price: prices.C1, quota: 30 },

  // MART 2026
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-03", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-03", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-04", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-04", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-05", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-05", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-06", price: prices.C1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-10", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-10", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-11", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-11", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-12", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-12", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-13", price: prices.C1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-25", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-25", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-26", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-26", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-27", price: prices.C1, quota: 30 },
  { title: "telc B2·C1 Medizin Fach.", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-03-28", price: prices.C1, quota: 30 },

  // NİSAN 2026
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-01", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-01", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-02", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-02", price: prices.A1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-07", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-07", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-08", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-08", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-09", price: prices.B2, quota: 3 }, // Son 3 Aday
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-09", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-10", price: prices.C1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-14", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-14", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-15", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-15", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-16", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-16", price: prices.A1, quota: 30 },
  { title: "telc C1 Hochschule Dijital", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-17", price: prices.C1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-21", price: prices.B2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-21", price: prices.B1, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-22", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-22", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-29", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A2 Dijital", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-29", price: prices.A2, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-30", price: prices.B2, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-04-30", price: prices.A1, quota: 30 },

  // MAYIS & HAZİRAN 2026
  { title: "telc Deutsch B1 Dijital", level: "B1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-05-06", price: prices.B1, quota: 30 },
  { title: "telc Deutsch A1 Dijital", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-05-06", price: prices.A1, quota: 30 },
  { title: "telc Deutsch B2 Dijital", level: "B2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-05-07", price: prices.B2, quota: 30 },
  { title: "telc Deutsch C1", level: "C1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-06-19", price: prices.C1, quota: 30 },
  { title: "telc A1 Junior", level: "A1", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-06-22", price: prices.A1, quota: 30 },
  { title: "telc A2 Schule", level: "A2", city: "İstanbul", locationDetails: "Online / Dijital Sınav Merkezi", date: "2026-06-22", price: prices.A2, quota: 30 },

  // ============================================================
  // 2. ÖSD SINAVLARI (Kağıt Bazlı - Şehirlere Göre)
  // ============================================================

  // --- İSTANBUL KADIKÖY ---
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Kadıköy - Kağıt Bazlı", date: "2026-01-21", price: prices.A1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Kadıköy - Kağıt Bazlı", date: "2026-02-04", price: prices.A1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Kadıköy - Kağıt Bazlı", date: "2026-02-18", price: prices.A1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Kadıköy - Kağıt Bazlı", date: "2026-03-04", price: prices.A1, quota: 30 },

  // --- İSTANBUL BEŞİKTAŞ ---
  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-01-22", price: prices.A2, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-01-22", price: prices.B1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-01-23", price: prices.A1, quota: 30 },
  
  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-05", price: prices.A2, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-05", price: prices.B1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-06", price: prices.A1, quota: 30 },

  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-19", price: prices.A2, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-19", price: prices.B1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-02-20", price: prices.A1, quota: 30 },

  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-03-05", price: prices.A2, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-03-05", price: prices.B1, quota: 30 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İstanbul", locationDetails: "Beşiktaş - Kağıt Bazlı", date: "2026-03-06", price: prices.A1, quota: 30 },

  // --- ANKARA ---
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "Ankara", locationDetails: "Merkez - Kağıt Bazlı", date: "2026-02-02", price: prices.A1, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "Ankara", locationDetails: "Merkez - Kağıt Bazlı", date: "2026-02-02", price: prices.A2, quota: 25 },

  // --- İZMİR ---
  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-01-15", price: prices.A2, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-01-15", price: prices.B1, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "B2", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-01-15", price: prices.B2, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-01-16", price: prices.A1, quota: 25 },

  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-02-12", price: prices.A2, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-02-12", price: prices.B1, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "B2", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-02-12", price: prices.B2, quota: 25 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "İzmir", locationDetails: "Kağıt Bazlı", date: "2026-02-13", price: prices.A1, quota: 25 },

  // --- BURSA ---
  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-01-29", price: prices.A2, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-01-29", price: prices.B1, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "B2", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-01-29", price: prices.B2, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-01-30", price: prices.A1, quota: 20 },

  { title: "ÖSD Sertifika Sınavı", level: "A2", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-02-26", price: prices.A2, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "B1", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-02-26", price: prices.B1, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "B2", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-02-26", price: prices.B2, quota: 20 },
  { title: "ÖSD Sertifika Sınavı", level: "A1", city: "Bursa", locationDetails: "Nilüfer - Kağıt Bazlı", date: "2026-02-27", price: prices.A1, quota: 20 }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Bağlandı...");

    await Exam.deleteMany(); // Eskileri sil
    console.log("Eski veriler temizlendi.");

    await Exam.insertMany(exams); // Yenileri ekle
    console.log("✅ 2026 TELC ve ÖSD Takvimi Başarıyla Yüklendi!");

    process.exit();
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
};

importData();