import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Product Management</h1>
        <p className="mb-8">Manage your products with ease</p>
        <Link 
          href="/products" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Products
        </Link>
      </main>
    </div>
  );
}
