import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

router.post('/checkout', async (req, res) => {
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-04-30.basil',
  });
  try {
    const { products, email } = await req.body;

    const extractingproducts = await products.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: extractingproducts,
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        email,
      },
    });

    res.json({
      message: 'Server is connected',
      success: true,
      id: session.id,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
