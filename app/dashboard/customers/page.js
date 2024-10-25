import CustomerList from '@/components/CustomerList';

export default function CustomersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <CustomerList />
    </div>
  );
}
