import Link from 'next/link';
import { SubscribeButton } from '@/components/SubscribeButton';

const PricingTier = ({ name, price, features, recommended, plan }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${recommended ? 'border-4 border-green-500' : ''}`}>
    {recommended && (
      <div className="bg-green-500 text-white text-center py-2 font-semibold">
        Recommended
      </div>
    )}
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-4xl font-bold mb-6">${price}<span className="text-gray-500 text-base font-normal">/month</span></p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <SubscribeButton plan={plan} />
    </div>
  </div>
);

export default function Pricing() {
  const pricingTiers = [
    
    {
      name: "Pro",
      price: 79,
      features: [
        "Up to 5,000 invoices/month",
        "Unlimited team members",
        "Advanced reporting",
        "Priority email support",
        "API access"
      ],
      recommended: true,
      plan: {
        link: process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_00g9Ep90c5Sn9rO001'
          : '',
        priceId: process.env.NODE_ENV === 'development'
          ? 'price_1PCxqQClvsFHzmDAGpD1MFww'
          : '',
        price: 79,
        duration: '/month'
      }
    },
    {
      name: "Enterprise",
      price: 199,
      features: [
        "Unlimited invoices",
        "Unlimited team members",
        "Custom reporting",
        "24/7 phone support",
        "API access",
        "Dedicated account manager"
      ],
      plan: {
        link: process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_28o5u5dcs80z9rO002'
          : '',
        priceId: process.env.NODE_ENV === 'development'
          ? 'price_1PCxqQClvsFHzmDAGpD1MFww'
          : '',
        price: 199,
        duration: '/month'
      }
    }
  ];

  return (
    <main className="min-h-screen bg-[rgb(216,216,205)]">
      {/* Navigation Bar */}
      <nav className="bg-[rgb(216,216,205)] border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="text-2xl font-bold text-green-600 font-serif">Bill Breeze</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/features" className="text-gray-600 hover:text-green-600 transition duration-300">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-green-600 transition duration-300">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition duration-300">About</Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/signin" className="px-4 py-2 text-green-600 font-semibold hover:bg-green-50 rounded transition duration-300">
              Sign in
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow-md hover:bg-green-700 transition duration-300">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} plan={tier.plan} />
          ))}
        </div>
        <p className="text-center mt-12 text-gray-600">
          All plans come with a 14-day free trial. No credit card required.
        </p>
      </div>
    </main>
  );
}
