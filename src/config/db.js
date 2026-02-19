// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // .env dosyasındaki adresi kullanarak bağlan
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Hata: ${error.message}`);
    process.exit(1); // Hata varsa uygulamayı durdur
  }
};

export default connectDB;