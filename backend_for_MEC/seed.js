import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "The most advanced iPhone with titanium design and A17 Pro chip.",
    price: 134999,
    category: "Smartphone",
    stock: 10,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010531822"
  },
  {
    name: "iPhone 15",
    description: "A total powerhouse with Dynamic Island and advanced camera system.",
    price: 79999,
    category: "Smartphone",
    stock: 15,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972"
  },
  {
    name: "iPhone 14 Pro",
    description: "Pro camera system, Always-On display, and Dynamic Island.",
    price: 119999,
    category: "Smartphone",
    stock: 8,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617559"
  },
  {
    name: "iPhone 13",
    description: "Super Retina XDR display, A15 Bionic chip, and advanced camera.",
    price: 69999,
    category: "Smartphone",
    stock: 12,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-model-unselect-gallery-2-202207_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893618063"
  },
  {
    name: "iPhone SE",
    description: "Compact design with A15 Bionic chip and advanced camera.",
    price: 49999,
    category: "Smartphone",
    stock: 20,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654738987641"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();