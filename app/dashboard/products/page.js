import ProductList from '@/components/ProductList';

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductList />
    </div>
  );
}
