import express from 'express';
import { createExam, getExams } from '../controllers/examController.js';

const router = express.Router();

// GET isteği gelirse sınavları listele
// Örn: /api/exams?city=Ankara&level=B1
router.get('/', getExams);

// POST isteği gelirse yeni sınav oluştur
// Örn: /api/exams
router.post('/', createExam);

import { deleteExam } from '../controllers/examController.js'; // Üstteki importlara ekle

// ... diğer rotalar (router.get, router.post vb.)

// Silme rotasını ekle
router.delete('/:id', deleteExam);

export default router;