import express from 'express';
import { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// GET /api/orders
router.get('/', getAllOrders);

// GET /api/orders/:id
router.get('/:id', getOrder);

// POST /api/orders
router.post('/', createOrder);

// PUT /api/orders/:id
router.put('/:id', updateOrder);

// DELETE /api/orders/:id
router.delete('/:id', deleteOrder);

export default router;