import express from 'express';
const router = express.Router()

import { admin, protect } from '../middleware/authMiddleware.js';

import {
    addOrderItems,
    getMyOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from '../controllers/orderController.js';


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay',protect, updateOrderToPaid);
router.put('/:id/deliver',protect, admin, updateOrderToDelivered);

export default router;