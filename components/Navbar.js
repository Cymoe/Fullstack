import Link from 'next/link';

export default function Navbar() {
  return (
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
          <Link href="/signup" className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow-md hover:bg-green-700 transition duration-300 flex items-center">
            Get Paid
            <span className="ml-2">➔</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
