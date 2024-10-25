import Stripe from 'stripe';
import { buffer } from 'micro';
import { prisma } from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await updateUserAccess(session.client_reference_id, true);
        break;
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await updateUserAccess(subscription.client_reference_id, false);
        break;
      // Add other event types as needed
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

async function updateUserAccess(userId, hasAccess) {
  await prisma.user.update({
    where: { id: userId },
    data: { hasAccess },
  });
}
