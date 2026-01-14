import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users
router.get('/', getAllUsers);

// GET /api/users/:id
router.get('/:id', getUser);

// POST /api/users
router.post('/', createUser);

// POST /api/users/login
router.post('/login', loginUser);

// PUT /api/users/:id
router.put('/:id', updateUser);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

export default router;