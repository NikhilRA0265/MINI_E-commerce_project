import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
import userRoutes from './routers/userRoutes.js';
import productRoutes from './routers/productRoutes.js';
import orderRoutes from './routers/orderRoutes.js';
import paymentRoutes from './routers/paymentRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Health check endpoint to verify backend is running
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Backend is running', 
    timestamp: new Date().toISOString(),
    message: 'Server is listening and ready to accept requests'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('═'.repeat(50));
  console.log(`✓ Backend server is LISTENING on port ${PORT}`);
  console.log('✓ You can verify the connection at: http://localhost:' + PORT + '/health');
  console.log('═'.repeat(50));
});
