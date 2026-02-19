import express from 'express';
import { createOrder, getAllOrders, deleteOrder, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);      // Kayıt Ol
router.get('/', getAllOrders);      // Listele (Admin)
router.delete('/:id', deleteOrder); // Sil (Admin)  <-- YENİ
router.put('/:id', updateOrderStatus); // Güncelle (Admin) <-- YENİ

export default router;