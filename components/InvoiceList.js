'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import InvoiceForm from './InvoiceForm';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreate = async (newInvoice) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create invoice: ${errorData.error || response.statusText}`);
      }
      fetchInvoices();
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError(err.message);
    }
  };

  const handleUpdate = async (updatedInvoice) => {
    try {
      const response = await fetch(`/api/invoices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) throw new Error('Failed to update invoice');
      fetchInvoices();
      setEditingInvoice(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/invoices?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete invoice');
      fetchInvoices();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <InvoiceForm onSubmit={handleCreate} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map(invoice => (
          <Card key={invoice._id}>
            <CardHeader>
              <CardTitle>Invoice #{invoice.invoiceNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Customer: {invoice.customer}</p>
              <p>Total: ${invoice.total ? invoice.total.toFixed(2) : '0.00'}</p>
              <p>Status: {invoice.status}</p>
              <p>Due Date: {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Not set'}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setEditingInvoice(invoice)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(invoice._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingInvoice && (
        <InvoiceForm 
          invoice={editingInvoice} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingInvoice(null)} 
        />
      )}
    </div>
  );
}
