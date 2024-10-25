import InvoiceList from '@/components/InvoiceList';

export default function InvoicesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>
      <InvoiceList />
    </div>
  );
}
