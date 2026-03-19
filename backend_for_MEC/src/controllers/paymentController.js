import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      throw new Error("Stripe is not initialized. Missing STRIPE_SECRET_KEY.");
    }

    // Handle if products are sent as an array directly or inside an object
    let products = [];
    if (req.body && req.body.products && Array.isArray(req.body.products)) {
      products = req.body.products;
    } else if (req.body && Array.isArray(req.body)) {
      products = req.body;
    }

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products found in checkout request." });
    }

    const lineItems = products.map((product) => {
      // Ensure price is a number and handle potential data inconsistencies
      const unitAmount = Math.round(Number(product.price || product.amount || 0) * 100);
      
      if (unitAmount <= 0) {
        throw new Error(`Invalid price for product: ${product.name || 'Unknown'}`);
      }

      // Check for valid image URL (Stripe requires absolute URLs)
      const imgUrl = product.imageUrl || product.image || product.img;
      const images = (imgUrl && imgUrl.startsWith('http')) 
        ? [imgUrl] 
        : [];

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name || product.title || "Unknown Product",
            images: images,
          },
          unit_amount: unitAmount,
        },
        quantity: product.quantity ? Number(product.quantity) : 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${clientUrl}/payment/success`,
      cancel_url: `${clientUrl}/payment/cancel`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};