import Order from '../models/Order.js';
import Exam from '../models/Exam.js';

export const createOrder = async (req, res) => {
    try {
        const { examId, candidate } = req.body;

        // 1. Sınavı bul
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: "Sınav bulunamadı!" });
        }

        // 2. Kontenjan kontrolü
        if (exam.soldCount >= exam.quota) {
            return res.status(400).json({ message: "Üzgünüz, bu sınavın kontenjanı doldu." });
        }

        // ...
        // 3. Siparişi oluştur
        const newOrder = new Order({
            examId,

            // Sınav detaylarını kopyalıyoruz (Snapshot)
            examTitle: exam.title,
            examLevel: exam.level,
            examDate: exam.date,

            // --- BURAYI EKLE ---
            examCity: exam.city,                  // Şehri kaydet
            examLocation: exam.locationDetails,   // Detaylı yeri kaydet
            // ------------------

            candidate,
            price: exam.price
        });

        // ...


        await newOrder.save();

        res.status(201).json({
            message: "Ön kayıt oluşturuldu.",
            orderId: newOrder._id
        });

    } catch (error) {
        res.status(500).json({ message: "Kayıt oluşturulamadı", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find().populate('examId', 'title level date city');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Siparişler çekilemedi", error: error.message });
    }
};
// ... üstteki kodlar kalsın ...

// SİPARİŞİ SİL (Admin İçin)
export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Sipariş silindi." });
    } catch (error) {
        res.status(500).json({ message: "Silinemedi", error: error.message });
    }
};

// DURUM GÜNCELLE (Örn: PENDING -> PAID)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body; // { status: "PAID" } gelecek
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true } // Güncellenmiş halini döndür
        );
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Güncellenemedi", error: error.message });
    }
};