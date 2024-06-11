import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ courseId }) => {
  const router = useRouter();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/payments/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    const { sessionId } = await res.json();

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-green-500 text-white py-2 px-4 rounded">
      Checkout
    </button>
  );
};

export default CheckoutButton;
