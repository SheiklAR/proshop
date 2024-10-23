import express from 'express';
const router = express.Router()

import { admin, protect } from '../middleware/authMiddleware.js';

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    createPaymentIntent

} from '../controllers/orderController.js';


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay',protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
// router.post('/config/stripe', createPaymentIntent)

export default router;