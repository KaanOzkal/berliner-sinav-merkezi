import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // <--- 1. YENİ
import { fileURLToPath } from 'url'; // <--- 2. YENİ (ES Module için gerekli)

import connectDB from './src/config/db.js';
import examRoutes from './src/routes/examRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

// Dosya yolu ayarları (ES Module kullandığımız için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// --- BURASI ÖNEMLİ: Frontend klasörünü sun ---
app.use(express.static(path.join(__dirname, 'public'))); 
// ----------------------------------------------

// Rotalar
app.use('/api/exams', examRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda yayında.`));