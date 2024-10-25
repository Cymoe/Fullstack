"use client";

import { useState } from 'react';

export function SubscribeButton({ plan }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Placeholder values for email and userId
      const email = 'user@example.com';
      const userId = '123';
      const subscribeUrl = `${plan.link}${email ? `?prefilled_email=${encodeURIComponent(email)}` : ''}&client_reference_id=${userId}`;
      window.location.href = subscribeUrl;
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={isLoading}
      className="btn btn-primary btn-block text-lg"
    >
      {isLoading ? 'Redirecting...' : 'Subscribe'}
    </button>
  );
}
